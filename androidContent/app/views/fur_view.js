var View = require('./view');
var template = require('./templates/fur');
var templateAction2 = require('./templates/shelterForm');
var petDetailView = require("views/guide_view");


module.exports = View.extend({
	id: 'fur-view',
	template: template,
	events: {
		"tap #fur_action" : "actionGuide",
		"tap #fur_pic" : "showPhotoSheet",
		"tap #fur_shelter" : "shelterForm",
		"tap #take_photo" : "takePhoto",
		"tap #choose_existing" : "chooseExisting",
		"tap #photo_cancel" : "cancel",
	},

	initialize: function() {  

	},
	
	takePhoto:function(){
		$('.photo_dialog').hide();
		Application.furView.capturePic(0);
	},
	
	chooseExisting:function(){
		$('.photo_dialog').hide();
		Application.furView.capturePic(1);
	},
	
	cancel:function(){
		$('.photo_dialog').css('bottom','-71px');
		setTimeout(function(){ $('.photo_dialog').hide() },300);
		Application.furView.capturePic(2);
	},

	capturePic:function(buttonIndex){
		if (buttonIndex == 2){
			return false;
		}
		
		if (window.localStorage.getItem("user_dos_auth")){
			if (buttonIndex == 0){
				Application.furView.launchCamera();
			}else if (buttonIndex == 1){	
				Application.furView.galleryPic();
			}
		}else{
			window.localStorage.setItem("session_redirect", "#camera");
			Application.router.navigate("#session" , {trigger: true});
		}

	},
	
	showPhotoSheet:function(){
		$('.photo_dialog').show();
		setTimeout(function(){ $('.photo_dialog').css('bottom','0px'); },100);
		//$('.photo_dialog').css('bottom','0px');
	},

	galleryPic:function(){
		{
			var destinationType; 
			navigator.camera.getPicture(onSuccess, onFail, { sourceType: 0, quality: 50, allowEdit : true, correctOrientation:true });
			function onSuccess(imageURI) {
				Application.router.navigate("#submitpet", {trigger: true});

				//$("#pet-preview").append('<img src="'  + imageURI + '" width=300>' );
				$('#pet-preview').css('background-image', 'url("' + imageURI + '")');

				Application.furView.uploadImage(imageURI);
			}
			function onFail(message) {
				if (message == "no image selected" && window.localStorage.getItem("session_redirect") == "#camera"){
					//Application.router.navigate("#gallery", {trigger: true});
				}
			}
		}
	},

	takePic:function(){
		if (window.localStorage.getItem("user_dos_auth")){
			Application.furView.launchCamera();
		}else{
			window.localStorage.setItem("session_redirect", "#camera");
			Application.router.navigate("#session" , {trigger: true});
		}
	},
	launchCamera:function(){
		var destinationType; 
		navigator.camera.getPicture(onSuccess, onFail, { quality: 50, allowEdit : true, correctOrientation:true });
		function onSuccess(imageURI) {
			Application.router.navigate("#submitpet", {trigger: true});

			//$("#pet-preview").append('<img src="'  + imageURI + '" width=300>' );
			$('#pet-preview').css('background-image', 'url("' + imageURI + '")');

			Application.furView.uploadImage(imageURI);
		}
		function onFail(message) {
			if (message == "no image selected" && window.localStorage.getItem("session_redirect") == "#camera"){
				//Application.router.navigate("#gallery", {trigger: true});
			}
		}
	},

	render: function() {
		this.$el.html(this.template(this.getRenderData()));
		this.afterRender();
		return this;

	},
	actionGuide: function(){
		//this.$el.html(templateAction(this.getRenderData()));
		//Application.router.navigate("#actionguide");
		Application.router.navigate("#actionguide", {trigger: true});
	},
	shelterForm: function(){
		//this.$el.html(templateAction2(this.getRenderData()));
		//Application.router.navigate("#shelterform");
		Application.router.navigate("#shelterform", {trigger: true});
	},
	uploadImage:function(imageURI){

		//Application.submitView.$el.trigger("photoUploadComplete");

		try {

			var options = new window.FileUploadOptions();
			options.fileKey="files[pet_0]";
			options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);

			var params = new Object();
			var sessname = window.localStorage.getItem("user_dos_sessname");
			params.headers = {"Cookie" : sessname };

			options.params = params;


			var ft = new window.FileTransfer();
			ft.upload(imageURI, "http://www.dosomething.org/?q=rest/file/create_raw.json", this.uploadImageSuccess, this.uploadImageFailure, options);

		} catch (e) {

			alert("Error using mycommand: " + e.message);

		} finally {
			// do something smart here :^)
		}

	},
	uploadImageSuccess:function(r){
		//alert("Code = " + r.responseCode + " | Response = " + r.response +" | Sent = " + r.bytesSent);
		//r.response.message
		window.localStorage.setItem("pet_photo_upload_complete","true");
		if (window.localStorage.getItem("submit_pet_btn_pressed") =="true"){
			Application.submitView.submit();
		}

		window.robj = r;
		var res =  JSON.parse(decodeURI(r.response));
		window.localStorage.setItem("pet_fid",res[0].fid);
	},
	uploadImageFailure:function(){
		alert("An error has occurred: Code = " = error.code);
	},

	afterRender: function() {

	}

});
