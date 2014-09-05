/*Jin Haixing Working*/
var acceptFileType = ['docx', 'doc', 'xlsx', 'xls', 'pptx', 'ppt', 'pdf', 'psd', 'pub', 'ai', 'tar', 'zip'];

function sendFileToServer(formData,status){
	var uploadURL = "/upload"; //Upload URL

	var extraData = {}; //Extra Data.
	var jqXHR= $.ajax({
		xhr: function() {
			var xhrobj = $.ajaxSettings.xhr();
			if (xhrobj.upload) {
				xhrobj.upload.addEventListener('progress', function(event) {
					var percent = 0;
					var position = event.loaded || event.position;
					var total = event.total;
					if (event.lengthComputable) {
						percent = Math.ceil(position / total * 100);
					}
					//Set progress
					status.setProgress(percent);
				}, false);
			}
			return xhrobj;
		},
		url: uploadURL,
		type: "POST",
		contentType:false,
		processData: false,
		cache: false,
		data: formData,
		success: function(data){
			var originalfilename = data.originalname;
			var filename = data.name;

			status.setProgress(100, originalfilename, filename);
		}
	}); 

	status.setAbort(jqXHR);
}

var rowCount=0;
function createStatusbar(obj){
	rowCount++;
	var row="odd";
	if(rowCount %2 ==0) row ="even";
	this.statusbar = $("<div class='statusbar "+row+"'></div>");
	this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
	this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
	this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
	this.abort = $("<div class='abort'>Abort</div>").appendTo(this.statusbar);
	this.deletebar = $("<div class='deletebtn hide'><a href='#'>Delete</a></div>").appendTo(this.statusbar);
	obj.after(this.statusbar);

	this.setFileNameSize = function(name,size){
		var sizeStr="";
		var sizeKB = size/1024;
		if(parseInt(sizeKB) > 1024){
			var sizeMB = sizeKB/1024;
			sizeStr = sizeMB.toFixed(2)+" MB";
		} else {
			sizeStr = sizeKB.toFixed(2)+" KB";
		}

		this.filename.html(name);
		this.size.html(sizeStr);
	}
	
	this.setProgress = function(progress, originalfilename, filename){       
		var progressBarWidth =progress*this.progressBar.width()/ 100;  
		this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
		if(parseInt(progress) >= 100 && ( typeof filename !== 'undefined' ) ){
			this.abort.hide();

			var obj_deletebar = this.deletebar;

			jQuery(this.deletebar).removeClass('hide');
			jQuery('a', this.deletebar)
				.attr('data-filename', filename)
				.click(function(){
					$.ajax({
			            type: 'POST',
			            dataType: 'html',
			            url: '/delete-file',
			            data: {
			            	delfile: filename
			            },
			            success: function( res ){
			            	if( res == 'deleted-success' ){
			            		jQuery(obj_deletebar).parent().remove();
			            	}
			            }
			        });
			    });
		}
	}

	this.setAbort = function(jqxhr){
		var sb = this.statusbar;
		this.abort.click(function(){
			jqxhr.abort();
			sb.hide();
		});
	}
}

function handleFileUpload(files,obj){
	for (var i = 0; i < files.length; i++) {
		var fd = new FormData();
		fd.append('file', files[i]);
		fd.append('notedata', jQuery("#note-date").val());

		var sFileName = files[i]['name'],
			sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase(),
			filesize = files[i]['size'] / 1024 / 1024;
			
		// console.log( filesize );

		if( filesize > 5 ){
			alert("Available Maxium File Size : 5M");
		} else {
			if( acceptFileType.indexOf(sFileExtension) > -1 ){
				var status = new createStatusbar(obj); //Using this we can set progress.
				status.setFileNameSize(files[i].name,files[i].size);
				sendFileToServer(fd,status);
			} else {
				alert("we can't accpet " + sFileName + ", we will accept following file types : *.docx, *.doc, *.xlsw, *.xls, *.pptx, *.ppt, *.pub, *.pdf, *.psd, *.ai, *.tar, *.zip");
			}
		}
	}
}

$(document).ready(function(){
	var obj = $("#dragandrophandler");

	obj.on('dragenter', function(e){
		e.stopPropagation();
		e.preventDefault();
		$(this).css('border', '2px solid #0B85A1');
	});

	obj.on('dragover', function(e){
		e.stopPropagation();
		e.preventDefault();
	});

	obj.on('drop', function(e){
		$(this).css('border', '2px dotted #0B85A1');
		e.preventDefault();
		var files = e.originalEvent.dataTransfer.files;

		//We need to send dropped files to Server
		handleFileUpload(files,obj);
	});

	$(document).on('dragenter', function(e){
		e.stopPropagation();
		e.preventDefault();
	});

	$(document).on('dragover', function(e){
		e.stopPropagation();
		e.preventDefault();
		obj.css('border', '2px dotted #0B85A1');
	});

	$(document).on('drop', function (e){
		e.stopPropagation();
		e.preventDefault();
	});

	$('#add-file-input').change(function(){
		handleFileUpload(this.files, $("#dragandrophandler"));
	});

	$('#browse-link-btn').click(function(){
		$('#add-file-input').trigger('click');
	})
});
