var app;

app = {
  name: 'TEST',
  domain: 'localhost',
  env: 'local',
  port: 4000,
  defaultPort: [80, 8080],
  scripts: [],
  baseUrl: function() {
    var x;
    x = this.domain;
    if (!_.contains(this.defaultPort, this.port)) {
      return x = this.domain + ':' + this.port;
    }
  },
  jsPrefix: function() {
    var x;
    x = this.env !== 'local' ? '.min' : '';
    return x;
  }
};

$(document).ready((function() {
  return console.log("starting the application");
}));
