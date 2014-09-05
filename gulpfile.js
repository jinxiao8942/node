var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-minify-css'),
  coffee = require('gulp-coffee'),
  less = require('gulp-less'),
  rename = require('gulp-rename'),
  gutil = require('gulp-util'),
  concat = require('gulp-concat'),
  del = require('del'),
  react = require('gulp-react'),
  gulpsync = require('gulp-sync')(gulp),
  oneDay = 86400000,
  path = require("path"),
  appFiles = {
    mainLessFile: 'local/less/app.less',
    less: 'local/less/**/*.less',
    coffee: 'local/coffee/**/*.coffee',
    pages: 'local/pages/**/*.coffee',
    jsx: 'local/jsx/**/*.jsx',
    timestamp: 'production/.timestamp',
    html: '**/*.html'
  };

  vendorFiles = {
    css: [
      'assets-vendor/bootstrap/dist/css/bootstrap.min.css',
      'assets-vendor/fontawesome/css/font-awesome.min.css',
      'jin/css/style.css'
    ],
    js: [
      'assets-vendor/jquery/dist/jquery.min.js',
      'assets-vendor/bootstrap/dist/js/bootstrap.min.js',
      'assets-vendor/underscore/underscore-min.js',
      'assets-vendor/react/react-with-addons.js',
      'assets-vendor/react-bootstrap/react-bootstrap.js',
      'assets-vendor/requirejs/require.js',
      'jin/js/main.js'
    ],
    fonts: [
      'assets-vendor/fontawesome/fonts/fontawesome-webfont.*',
      'assets-vendor/bootstrap/dist/fonts/*.*',
    ]
  };


var server = {
  port: 4000,
  livereloadPort: 35729,
  basePath: __dirname,
  _lr: null,
  start: function() {
    var express = require('express');
    var multer  = require('multer');
    var bodyParser = require('body-parser');

    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(__dirname + '/production', { maxAge: oneDay }));
    app.use(express.static(__dirname + '/assets-vendor/underscore', { maxAge: oneDay }));
    app.use(express.static(server.basePath));

    app.listen(server.port);
    console.log("Application started at " + server.port);
    console.log("Visit at http://localhost:" + server.port);

    // var router = app, fileUpload = require('./fileUpload')(router);
    var fileUploadPath = './data/';
    app.use(multer({ dest: fileUploadPath}));
    app.use(bodyParser());
    var fs = require('fs');

    app.post('/upload', function (req, res) {
      fs.writeFile(fileUploadPath + 'note.txt', req.body['notedata'], function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("Your Data is saved!!!");
        }
      });

      res.send(req.files.file);
    });

    app.post('/delete-file', function (req, res) {
      if( req.body['delfile'] != 'undefined' ){
        var delFilePath = fileUploadPath + req.body['delfile'];
        if (fs.existsSync(delFilePath)) {
          fs.unlinkSync(delFilePath);
        }
        res.send('deleted-success');
      } else {
        res.send('deleted-failure');
      }
    });
  },
  livereload: function() {
    server._lr = require('tiny-lr')();
    server._lr.listen(server.livereloadPort);
  },
  livestart: function() {
    server.start();
    server.livereload();
  },
  notify: function(event) {
    var fileName = path.relative(server.basePath, event.path);
    server._lr.changed({
      body: {
        files: fileName
      }
    });
  }
};

gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['production/js','production/jsx','production/pages','production/css'], cb);
});

gulp.task('compile', ['js-libs', 'css-libs', 'fonts', 'less', 'coffee', 'jsx', 'pages']);

gulp.task('js-libs', function() {
  gulp.src(vendorFiles.js)
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest('production/js/'));
});

gulp.task('css-libs', function() {
  gulp.src(vendorFiles.css)
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest('production/css/'));
});
 
gulp.task('watch', function () {
  gulp.watch([appFiles.mainLessFile, appFiles.less, appFiles.coffee, appFiles.pages, appFiles.jsx, appFiles.timestamp, appFiles.html], server.notify);
  gulp.watch(appFiles.less, ['less', 'timestamp']);
  gulp.watch(appFiles.coffee, ['coffee', 'timestamp']);
  gulp.watch(appFiles.jsx, ['jsx', 'timestamp']);
  gulp.watch(appFiles.pages, ['pages', 'timestamp']);
});

gulp.task('timestamp', function(){
  require('fs').writeFile(appFiles.timestamp, new Date().getTime());
});

gulp.task('startserver', ['compile'], function(){
  server.livestart();
});
 
gulp.task('less', function(){
  del(['production/css/*.css', '!production/css/vendor.*css'], function() {
    gulp.src(appFiles.mainLessFile)
      .pipe(less().on('error', gutil.log))
      .pipe(concat('pa.css'))
      .pipe(gulp.dest('production/css/'))
      .pipe(minifyCss().on('error', gutil.log))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('production/css/'));
  });
});
 
gulp.task('coffee', function(){
  del(['production/js/*.js', '!production/js/vendor.*js'], function() {
    gulp.src(appFiles.coffee)
      .pipe(coffee({bare: true}).on('error', gutil.log))
      .pipe(concat('pa.js'))
      .pipe(gulp.dest('production/js/'))
      .pipe(uglify().on('error', gutil.log))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('production/js/'));
  });
});

gulp.task('pages', function(){
  del(['production/pages/*.js'], function() {
    gulp.src(appFiles.pages)
      .pipe(coffee({bare: true}).on('error', gutil.log))
      .pipe(gulp.dest('production/pages/'))
      .pipe(uglify().on('error', gutil.log))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('production/pages/'));
  });
});

gulp.task('jsx', function(){
  del(['production/jsx/*.js'], function() {
    gulp.src(appFiles.jsx)
      .pipe(react().on('error', gutil.log))
      .pipe(gulp.dest('production/jsx/'))
      .pipe(uglify().on('error', gutil.log))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('production/jsx/'));
  });
});

gulp.task('fonts', function() {
  return gulp.src(vendorFiles.fonts)
    .pipe(gulp.dest('production/fonts/'));
});

gulp.task('build', gulpsync.sync(['clean', 'compile']));
gulp.task('default', ['startserver', 'watch']);