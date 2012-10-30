// Application bootstrapper.
Application = {

	initialize: function() {
		
		if ( window.localStorage.getItem("launchCount") == null){

			window.localStorage.setItem("launchCount","1");

		}
		if ( window.localStorage.getItem("user_logged_in") == null){

			window.localStorage.setItem("user_logged_in","false");

		}

		var GalleryView = require('views/gallery_view');
		var LoginView = require('views/login_view');
		var MyAnimalsView = require('views/myanimals_view');
		var AboutView = require('views/about_view');
		var FurView = require("views/fur_view");
		var FaqView = require("views/faq_view");
		var PetDetail = require("views/pet_view");
		var SubmitPet = require("views/submit_view");
		var GuideView = require("views/guide_view");
		var ShelterForm = require("views/shelterForm_view");
		var ShelterDetail = require("views/shelter_view");
		var ShelterList = require("views/shelterList_view");

		var SessionView = require("views/session_view");

		var Router = require('lib/router');  

    // Ideally, initialized classes should be kept in controllers & mediator.
    // If you're making big webapp, here's more sophisticated skeleton
    // https://github.com/paulmillr/brunch-with-chaplin
    this.loginView = new LoginView();
    this.galleryView = new GalleryView();
    this.myanimalsView = new MyAnimalsView();
    this.aboutView = new AboutView();
    this.furView = new FurView();
    this.faqView = new FaqView();
    this.petDetail = new PetDetail();
    this.submitPet = new SubmitPet();
    this.shelterDetail = new ShelterDetail();
    this.shelterList=new ShelterList();
    this.guideView = new GuideView();
    this.shelterFormView = new ShelterForm();
    this.sessionView = new SessionView();

    this.router = new Router();
    if (typeof Object.freeze === 'function') Object.freeze(this);  
		// Initializing BackStack.StackNavigator for the #container div
		
  var galleryTab = function() {
           if(window.tapReady){
				$('.photo_dialog').hide();
			$('.tab_android').removeClass('tab_android_active');
			$('#gallery_tab_android').addClass('tab_android_active');
      
      Application.router.navigate("#gallery" , {trigger: true});
  }
      //activateTabs();
    }

    var cameraTab = function() {
			if(window.tapReady){
				$('#take_photo').live('tap',Application.furView.takePhoto);
				$('#choose_existing').live('tap',Application.furView.chooseExisting);
				$('#photo_cancel').live('tap',Application.furView.cancel);
      	Application.furView.showPhotoSheet();
      	$('.tab_android').removeClass('tab_android_active');
      	$('#camera_tab_android').addClass('tab_android_active');
    	}
    }
    var furTab = function() {
      if(window.tapReady){
				$('.photo_dialog').hide();
				$('.tab_android').removeClass('tab_android_active');
				$('#furtograph_tab_android').addClass('tab_android_active');
	      Application.router.navigate("#fur" , {trigger: true});
	    }
      
      //activateTabs();

    }
    var aboutTab =  function() {
            //haltTabs();
      if(window.tapReady){
				$('.photo_dialog').hide();
			$('.tab_android').removeClass('tab_android_active');
			$('#about_tab_android').addClass('tab_android_active');
      Application.router.navigate("#about" , {trigger: true});
      
    }
    }
    var myAnimalsTab = function(){
      //haltTabs();
      //cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/faq.html" );
      //activateTabs();
				$('.photo_dialog').hide();
      Application.router.navigate("#myanimals" , {trigger: true});
			$('.tab_android').removeClass('tab_android_active');
			$('#myanimals_tab_android').addClass('tab_android_active');

    }
    

$('#gallery_tab_android').bind('tap', galleryTab);
$('#myanimals_tab_android').bind('tap', myAnimalsTab); 
$('#camera_tab_android').bind('tap', cameraTab); 
$('#furtograph_tab_android').bind('tap', furTab);
$('#about_tab_android').bind('tap', aboutTab);

}
}

module.exports = Application;




