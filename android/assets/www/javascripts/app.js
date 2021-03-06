(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"application": function(exports, require, module) {
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
             // window.tapReady = false;
  			$('.tab_android').removeClass('tab_android_active');
  			$('#gallery_tab_android').addClass('tab_android_active');
        
        Application.router.navigate("#gallery" , {trigger: true});
    }
        //activateTabs();
      }

      // var cameraTab = function() {
      //         if(window.tapReady){
      //          // window.tapReady = false;
      //   
      //   Application.furView.takePic();
      //   $('.tab').removeClass('tab_active');
      //   $('#camera_tab').addClass('tab_active');
      // 
      // }
        //activateTabs();   
      //}
      var furTab = function() {
        if(window.tapReady){
                //window.tapReady = false;
  			$('.tab_android').removeClass('tab_android_active');
  			$('#furtograph_tab_android').addClass('tab_android_active');
        Application.router.navigate("#fur" , {trigger: true});

      }
        
        //activateTabs();

      }
      var aboutTab =  function() {
              //haltTabs();
        if(window.tapReady){
          //window.tapReady = false;
  			$('.tab_android').removeClass('tab_android_active');
  			$('#about_tab_android').addClass('tab_android_active');
        Application.router.navigate("#about" , {trigger: true});
        
      }
      }
      var myAnimalsTab = function(){
        //haltTabs();
        //cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/faq.html" );
        //activateTabs();
        Application.router.navigate("#faq" , {trigger: true});
  			$('.tab_android').removeClass('tab_android_active');
  			$('#myanimals_tab_android').addClass('tab_android_active');

      }
      

  $('#gallery_tab_android').bind('tap', galleryTab);
  $('#myanimals_tab_android').bind('tap', myAnimalsTab); 
  //$('#camera_tab').bind('tap', cameraTab); 
  $('#furtograph_tab_android').bind('tap', furTab);
  $('#about_tab_android').bind('tap', aboutTab);

  }
  }

  module.exports = Application;




  
}});

window.require.define({"initialize": function(exports, require, module) {
  var application = require('application');
  window.tapReady = true;
     
    

                                 
  $(function() {
      $.mobile.ajaxEnabled = false;
      $.mobile.linkBindingEnabled = false;
      $.mobile.hashListeningEnabled = false;
      $.mobile.pushStateEnabled = false;
       // Remove page from DOM when it's being replaced
      $('div[data-role="page"]').live('pagehide', function (event, ui) {
          $(event.currentTarget).remove();
      });                                            
    
  	 document.addEventListener("deviceready",  function() {
      try{
        //      var googleAnalytics = window.plugins.googleAnalyticsPlugin;
        //googleAnalytics.startTrackerWithAccountID("UA-34876259-1"); 


      }catch(e){

        alert(e.message);  
      }

          
          

          push = window.pushNotification

          // Reset Badge on resume
          document.addEventListener("resume", function() {
              push.resetBadge()
          })
      
          push.getIncoming(function (incoming) {

            if(incoming.message) {
              console.log("In INCOMING function")
              navigator.notification.alert(incoming.message, function () {}, "Incoming Message", "OK")
            } else {
              console.log("No incoming message")
            }
          })

          function on_push(data) {
            navigator.notification.alert(
            data.message,
            function () {}, "Hello from Urban Airship!", "OK")
          }

          function on_reg(error, pushID) {
            if (!error) {
              console.log("Reg Success: " + pushID)
              $('#id').text(pushID)
            }
          }

          push.registerEvent('registration', on_reg)

          push.registerEvent('push', on_push)
  });
  	
    application.initialize();
    Backbone.history.start();
  });
  
}});

window.require.define({"lib/router": function(exports, require, module) {
  var application = require('application');

  module.exports = Backbone.Router.extend({
  	routes: {
  		'': 'gallery',
  		'about':'about',
  		'camera':'camera',
  		'pet':'pet',
  		'gallery':'gallery',
  		'login':'login',
  		'fur':'fur',
  		'faq':'faq',
  		'submitpet':'submitPet',
  		'actionguide':'actionGuide',
  		'shelterform':'shelterForm',
  		'session':'session',
  		'myanimals':'myanimals',
  		'shelter':'shelter',
  		'shelters':'shelterList'


  	},
  	initialize:function () {
          // Handle back button throughout the application
          $('.back_button').live('tap', function(e) {
          	e.preventDefault();
          	$.mobile.activePage.back = true;
          	window.history.back();

          });
          this.firstPage = true;

  				$('body').append('<div id="header"><div class="logo_android"></div><div id="about_tab_android" class="tab_android"></div><div id="myanimals_tab_android" class="tab_android"></div><div id="furtograph_tab_android" class="tab_android"></div><div id="gallery_tab_android" class="tab_android"></div></div>');
      	  $('.tab_android').removeClass('tab_android_active');
        $('#gallery_tab_android').addClass('tab_android_active');

  		if ( window.localStorage.getItem("launchCount") == "1"){

    	     	//this.$el.append("");
    	     	$('body').append("<div class='eduModal'><div id='edu-wrapper'></div>   </div>");    


    	     		}



      },
      home:function () {
  	         // this.navigate("#gallery" );
  	          // Application.router.navigate("#gallery",{trigger:true});
    	     if ( window.localStorage.getItem("launchCount") == "1"){

    	     	  	        this.$el.append( '<div class="eduModal"><div class="eduLogo"></div><div class="eduText"><p>This is the start page edu-walkthrough modal!</p></div><div id="edu-button" class="wide_button blue_button active_yellow">Let\'s Get Started</div></div>' );

       		
       	}else{
       			         this.changePage(Application.galleryView);

       	}	
  	     },
  	     gallery:function(){
  	     	this.gallery = true;
  	     	this.changePage(Application.galleryView);
  	     	Application.galleryView.enableScroll();


  	     },
  	     about:function () {
  	  //console.log('#page1');
  	  this.changePage(Application.aboutView);
  	  	     	Application.aboutView.enableScroll();

  	  //alert("about");
  	},
  	fur:function(){
  		this.changePage(Application.furView);
  	},
  	faq:function(){
  		this.changePage(Application.faqView);
  	},
  	actionGuide:function(){
  		this.changePage(Application.guideView);
  	},
  	shelterList:function(){
  		this.changePage(Application.shelterList);
  		Application.shelterList.enableScroll();

  	},
  	shelterForm:function(){
  		this.changePage(Application.shelterFormView);
  	},
  	submitPet:function(){
  		this.changePage(Application.submitPet);
  		Application.submitPet.enableScroll();

  	},
  	camera:function () {

  									Application.furView.takePic();

  	},
  	myanimals:function(){
  			     	this.changePage(Application.myanimalsView);

  	},
  	pet:function(sid){
  		this.changePage(Application.petDetail);

  	},
  	shelter:function(){
  				this.changePage(Application.shelterDetail);

  	},
  	session:function(){
  		this.changePage(Application.sessionView);
  		//Application.sessionView.authFb("#about");
  	},
  	changePage:function (page) {
  		window.tapReady = false;
  		$(page.el).attr('data-role', 'page');
  		page.render();
  		$('body').append($(page.el));
  		var transition = $.mobile.defaultPageTransition;
  		var bPage = $.mobile.activePage.back;
  	  // We don't want to slide the first page
  	  if (this.firstPage) {
  	  	transition = 'fade';
  	  	this.firstPage = false;
  	  }
  	  
  	  		  $.mobile.changePage($(page.el), {changeHash:false, transition: bPage ? 'slide' : transition, reverse: bPage});
  	  		  

  	  
  	  $(document).delegate(page.el, 'pageshow', function () {
  	  		window.tapReady = true;


  		});
  	}                                                            
  });
  
}});

window.require.define({"lib/view_helper": function(exports, require, module) {
  // Put your handlebars.js helpers here.
  
}});

window.require.define({"models/collection": function(exports, require, module) {
  // Base class for all collections.
  module.exports = Backbone.Collection.extend({
    
  });
  
}});

window.require.define({"models/model": function(exports, require, module) {
  // Base class for all models.
  module.exports = Backbone.Model.extend({
    
  });
  
}});

window.require.define({"models/myanimals": function(exports, require, module) {
  // Base class for all collections.
  var Pet = require('./pet');

  module.exports = Backbone.Collection.extend({
  	
  	model: Pet,
  	url: 'http://picsforpets.dev.zivtech.com/services/pets/dosomething_views/pics_for_pets_gallery.json',
  	handle: function(){

  		return {"pets": this.toJSON()};

  	},
  	parse: function(response){
  		response.thumbnail = response.UserId;
  		response.forEach(function(a){
  			var len = a.image.length ; 
  			var baseUrl="http://picsforpets.dev.zivtech.com/sites/default/files/styles/";
  			a.thumb_retina = baseUrl+ "thumbnail_retina/public/fb_campaign/" + a.image.substring(67,len);
  			a.thumb_reg = baseUrl+ "thumbnail_regular/public/fb_campaign/" + a.image.substring(67,len);
  			a.petdetail_reg = baseUrl+ "petdetail_regular/public/fb_campaign/" + a.image.substring(67,len);
  			a.petdetail_retina = baseUrl+ "petdetail_retina/public/fb_campaign/" + a.image.substring(67,len);



  			
  		});

  		return response;
  	}








  });
  
}});

window.require.define({"models/pet": function(exports, require, module) {
  // Base class for all models.
  module.exports = Backbone.Model.extend({
     idAttribute:"sid"

    

  });
  
}});

window.require.define({"models/pets": function(exports, require, module) {
  // Base class for all collections.
  var Pet = require('./pet');

  module.exports = Backbone.Collection.extend({
  	
  	model: Pet,
  	url: 'http://www.dosomething.org/services/pets/dosomething_views/pics_for_pets_gallery.json',
  	handle: function(){

  		return {"pets": this.toJSON()};

  	},
  	parse: function(response){
  		response.thumbnail = response.UserId;



  		response.forEach(function(a){
  			var len = a.image.length ; 
  			var baseUrl="http://files.dosomething.org/files/styles/";

  			//http://picsforpets.dosomething.org/files/styles/thumbnail_retina/public/fb_campaign/e19f001231380fbca8_7.jpeg


  			//"http://files.dosomething.org/files/cdv_photo_004.jpg"
  			//http://files.dosomething.org/files/styles/thumbnail_retina/public/cdv_photo_004.jpg

  			if (a.image.substring(0,35) == "http://files.dosomething.org/files/"){
  				a.thumb_retina = baseUrl+ "thumbnail_retina/public/" + a.image.substring(35,len);
  				a.thumb_reg = baseUrl+ "thumbnail_regular/public/" + a.image.substring(35,len);
  				a.petdetail_reg = baseUrl+ "petdetail_regular/public/" + a.image.substring(35,len);
  				a.petdetail_retina = baseUrl+ "petdetail_retina/public/" + a.image.substring(35,len);

  			}else{
  				a.thumb_retina = baseUrl+ "thumbnail_retina/public/fb_campaign/" + a.image.substring(47,len);
  				a.thumb_reg = baseUrl+ "thumbnail_regular/public/fb_campaign/" + a.image.substring(47,len);
  				a.petdetail_reg = baseUrl+ "petdetail_regular/public/fb_campaign/" + a.image.substring(47,len);
  				a.petdetail_retina = baseUrl+ "petdetail_retina/public/fb_campaign/" + a.image.substring(47,len);

  			}
  			if(a["existing shelter"]==""){
  				a.sheltername = a["shelter name"];
  				a.address1 = a.street
  				a.address2 = a.city + ', ' + a.state + ' ' + a.zip;
  			
  			}else{

  				var lines = a["existing shelter address"].split(/\n/);
  				a.sheltername = a["existing shelter"];
  				a.address1 = lines[0];
  				a.address2 = lines[1];
  			}
  			if ( a["facebook share count"] < 1){

  				a["facebook share count"] = "1";

  			}



  			
  		});

  		return response;
  	}








  });
  
}});

window.require.define({"models/shelter": function(exports, require, module) {
  // Base class for all models.
  module.exports = Backbone.Model.extend({
     idAttribute:"nid"

    

  });
  
}});

window.require.define({"models/shelters": function(exports, require, module) {
  //http://picsforpets.dosomething.org/pics-for-pets/shelter-search/json/78704
  var Shelter = require('./shelter');

  module.exports = Backbone.Collection.extend({
  	
  	model: Shelter,
  	url: 'http://www.dosomething.org/fb/pics-for-pets/shelter-search/json/',
  	zip: "",
  	handle: function(){

  		return {"shelters": this.toJSON(),"zip":this.zip};

  	}








  });
  
}});

window.require.define({"views/about_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/about');

  module.exports = View.extend({
    id: 'about-view',
    template: template,
    events: 		{"tap #faq_about":"faqChildBrowser"},

     
    initialize: function() {  
  	
  	 
  	
  	
  	
  	
  	
  	
    },

    render: function() {
    	
    	//disable taps on tab again
    	//$('#gallery_tab').unbind();
  	this.$el.html(this.template(this.getRenderData()));
  	this.afterRender();
    	return this;

    },
    faqChildBrowser:function(){
  		//alert('babyb');
  		

  	},
    enableScroll:function(){
    		var scroll = new iScroll('aboutScroll');
    },

    afterRender: function() {
  	
  	//this.enableScroll();
  	
  	}




  });
  
}});

window.require.define({"views/faq_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/faq');

  module.exports = View.extend({
    id: 'faq-view',
    template: template,

  	
  	events: {
  		"tap #question1" : "answer1",
  		"tap #question2" : "answer2",
  		"tap #question3" : "answer3",
  		"tap #question4" : "answer4",
  		"tap #question5" : "answer5",
  		"tap #question6" : "answer6",
  		"tap #question7" : "answer7",
  		"tap #question8" : "answer8",
  		"tap #question9" : "answer9"
  	},

     
    initialize: function() {  
  	
    },

    render: function() {

  		this.$el.html(this.template(this.getRenderData()));
  		this.afterRender();
    	return this;

    },
    afterRender: function() {
  		
  	},
    answer1: function() {
  			$('#question1').next().toggle();
  			$('#question1 .item_arrow').toggleClass('item_arrow_active');
  	},
    answer2: function() {
  			$('#question2').next().toggle();
  			$('#question2 .item_arrow').toggleClass('item_arrow_active');
  	},
    answer3: function() {
  			$('#question3').next().toggle();
  			$('#question3 .item_arrow').toggleClass('item_arrow_active');
  	},
    answer4: function() {
  			$('#question4').next().toggle();
  			$('#question4 .item_arrow').toggleClass('item_arrow_active');
  	},
    answer5: function() {
  			$('#question5').next().toggle();
  			$('#question5 .item_arrow').toggleClass('item_arrow_active');
  	},
    answer6: function() {
  			$('#question6').next().toggle();
  			$('#question6 .item_arrow').toggleClass('item_arrow_active');
  	},
    answer7: function() {
  			$('#question7').next().toggle();
  			$('#question7 .item_arrow').toggleClass('item_arrow_active');
  	},
    answer8: function() {
  			$('#question8').next().toggle();
  			$('#question8 .item_arrow').toggleClass('item_arrow_active');
  	},
    answer9: function() {
  			$('#question9').next().toggle();
  			$('#question9 .item_arrow').toggleClass('item_arrow_active');
  	}

  });
  
}});

window.require.define({"views/fur_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/fur');
  //var templateAction = require('./templates/guide');
  var templateAction2 = require('./templates/shelterForm');
  var petDetailView = require("views/guide_view");


  module.exports = View.extend({
    id: 'fur-view',
    template: template,
    events: {
      "tap #fur_action" : "actionGuide",
      "tap #fur_pic" : "takePic",
  		"tap #fur_shelter" : "shelterForm"
    

      

    },

    initialize: function() {  








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
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50, allowEdit : true, correctOrientation:true  });








        function onSuccess(imageURI) {

          // Get image handle
          //
          Application.router.navigate("#submitpet", {trigger: true});

          //$("#pet-preview").append('<img src="'  + imageURI + '" width=300>' );
          $('#pet-preview').css('background-image', 'url("' + imageURI + '")');

          Application.furView.uploadImage(imageURI);

          // Unhide image elements
          //


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

      //alert(imageURI);



   
      //Application.submitView.$el.trigger("photoUploadComplete");


      try {
      
      var options = new window.FileUploadOptions();
      options.fileKey="files[pet_0]";
      options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
      //alert(sessname);
      var params = new Object();
      var sessname = window.localStorage.getItem("user_dos_sessname");
      var headers = {"Cookie" : sessname };

      options.headers = headers;
      options.params = params;
      

      var ft = new window.FileTransfer();
      //ft.upload(imageURI, "http://requestb.in/up1llqup", this.uploadImageSuccess, this.uploadImageFailure, options);
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

      //$('.tab').removeClass('tab_active');
      //$('#furtograph_tab').addClass('tab_active');

    }




  });
  
}});

window.require.define({"views/gallery_view": function(exports, require, module) {
  var View = require('./view');
  var petDetailView = require("views/pet_view");

  var template = require('./templates/gallery');
  var itemTemplate = require('./templates/galleryItem')
  var Pets = require('../models/pets');
  var _PETSPERPAGE = 12;
  module.exports = View.extend({
  	id: 'gallery-view',
  	template: template,

  	
  	events: {
  		"tap #loadMore" : "loadMore",
  		"dataLoaded":"append",
  		"tap .pet_thumb": "renderPet",
  		"tap #filters_action":"showFilters",
  		"tap #location" : "filterLocation",
  		"tap #favs" : "filterFavs",
  		"tap #time" : "filterTime",
  		"tap #type" : "filterType",
  		"tap #cancel" : "cancelFilters",
  		"tap #dog_type" : "chooseType1",
  		"tap #cat_type" : "chooseType2",
  		"tap #bird_type" : "chooseType3",
  		"tap #rabbit_type" : "chooseType4",
  		"tap #other_type" : "chooseType5",
  		"tap #edu-button" : "hideEdu",
  		"tap #filterAction_zip":"filterLocationAction"

  	},

  	initialize: function() {  
  		//alert('pets ini');
  		this.petList = new Pets();
  		this.petList.petJSON ={};
  		

  		if ( window.localStorage.getItem("launchCount") != "1"){

  			this.petList.fetch({

  				data: { limit: _PETSPERPAGE},
  				processData:true,
  				add:true,
  				success:function(){
  			   // alert("fire");
  			   Application.galleryView.$el.trigger("dataLoaded");
  				//Application.router.navigate("#page2",{trigger: true});
  			}
  		});
  		}

  		//this.petList.bind('refresh', this.refresh());
  		//this.model.on('change', this.render, this);

  	},
  	

  	render: function() {
    	//disable taps on tab again
    	//$('#gallery_tab').unbind();

    	//var t={};
    	// testing jq 
    	this.$el.html(this.template(this.petList.petJSON));

    	//this.$el.html(this.template(t));

    	this.afterRender();

    	return this;

    },

    afterRender: function() {
    	     // Application.router.navigate("#gallery",{trigger:true});
    	     if ( window.localStorage.getItem("launchCount") == "1"){
    	     	$(this.el).hide();
    	     	//this.$el.append("");
    	     	this.$el.append("<div class='eduModal'><div id='edu-wrapper'></div>   </div>");


    	     	var	carousel,
    	     	el,
    	     	i,
    	     	page,
    	     	slides = [
    	     	"<div class='edu-image' id='edu1'></div>",
    	     	"<div class='edu-image' id='edu2'></div>",
    	     	"<div class='edu-image' id='edu3'></div>",
    	     	"<div class='edu-image' id='edu4'><div id='edu-button' class='wide_button aqua_button active_yellow'>Let's Get Started</div></div></div>"
    	     	];

    	     	carousel = new SwipeView('#edu-wrapper', {
    	     		numberOfPages: slides.length,
    	     		hastyPageFlip: true,
    	     		loop:false
    	     	});

  			// Load initial data
  			for (i=0; i<3; i++) {
  				page = i==0 ? slides.length-1 : i-1;

  				el = document.createElement('span');
  				el.innerHTML = slides[page];
  				carousel.masterPages[i].appendChild(el)
  			}

  			carousel.onFlip(function () {
  				var el,
  				upcoming,
  				i;

  				for (i=0; i<3; i++) {
  					upcoming = carousel.masterPages[i].dataset.upcomingPageIndex;

  					if (upcoming != carousel.masterPages[i].dataset.pageIndex) {
  						el = carousel.masterPages[i].querySelector('span');
  						el.innerHTML = slides[upcoming];
  					}
  				}
  			});


  			$('#edu-button').live( 'tap', function () {
  	  		  	     	$(Application.galleryView.el).show();

  	  		Application.galleryView.hideEdu();


  		});




  }


  },  
  hideEdu:function(){
    	//alert("hello");
    	$(".eduModal").fadeOut();
    	window.localStorage.setItem("launchCount","2");

    	this.initPets();
    },
    refreshScroll:function(){
    	//myScroll.refresh();
    },
    enableScroll: function(){



    	myScroll = new iScroll('wrapper', {
    		useTransition: true


    	});
    },
    reloadList:function(){
  	
  		$('.spinnerModal').show();
    	this.petList.fetch({

    		data: { limit: _PETSPERPAGE},
    		processData:true,
    		add:false,
    		success:function(){
  			   // alert("fire");
  			   Application.galleryView.$el.trigger("dataLoaded");
  				//Application.router.navigate("#page2",{trigger: true});
  			}
  		});


    },

    append: function(){
    	//alert("refresh fired")
    	this.petList.petJSON = this.petList.handle();
    	//this.petList.each(function(pet){console.log(pet.get("name"))});
    	//console.log(js);

    	//http://picsforpets.dev.zivtech.com/sites/default/files/styles/thumbnail_retina/public/fb_campaign/

    	this.$el.html(this.template(this.petList.petJSON));

    	this.enableScroll();

  		//this.petList.each(function(pet){console.log(pet.get("name"))});

  	},
  	appendMore: function(){
    	//alert("refresh fired")
    	this.petList.petJSON = this.petList.handle();
    	//this.petList.each(function(pet){console.log(pet.get("name"))});
    	//console.log(js);

    	//http://picsforpets.dev.zivtech.com/sites/default/files/styles/thumbnail_retina/public/fb_campaign/

    	//this.$el.html(this.template(this.petList.petJSON));
    	//for$('#thelist li').length

    	//'<li data-id="' + {{sid}} + '" class="pet_thumb" style="background-color:#333;background-image:url("' + {{thumb_retina}} + '")"></li>'




    	//$("#thelist").append(items);

    	//this.enableScroll();

  		//this.petList.each(function(pet){console.log(pet.get("name"))});

  	},

  	renderPet: function(e){
    	//alert("test");
    	e.preventDefault();
    	var id = $(e.currentTarget).data("id");
      //alert(id);
      var item = this.petList.get(id);
      //var name = item.get("name");
      Application.petDetail.item = item.toJSON();    
      //stackNavigator.pushView(petDetail);
      Application.router.navigate("#pet" , {trigger: true});

      //petDetail.render();

  },
  initPets:function(){

  	this.petList.fetch({

  		data: { limit: _PETSPERPAGE},
  		processData:true,
  		add:true,
  		success:function(){
  			   // alert("fire");
  			   Application.galleryView.$el.trigger("dataLoaded");
  				//Application.router.navigate("#page2",{trigger: true});
  			}
  		});},
  	loadMore: function() {
  		var pOffset = $('#thelist li').length;
  		this.petList.fetch({

  			data: { limit: _PETSPERPAGE, offset: pOffset},
  			processData:true,
  			add:true,
  			success:function(){
  				Application.galleryView.$el.trigger("dataLoaded");
  			}
  		});

  	},
  	chooseType1: function(){ 
  		changeType('dog'); 
  		$('.spinnerModal').show();
  		
  		this.petList.fetch({

  			data: { limit: _PETSPERPAGE, animal_type:"Dog"},
  			processData:true,
  			add:false,
  			success:function(){
  				   // alert("fire");
  				   Application.galleryView.$el.trigger("dataLoaded");
  					//Application.router.navigate("#page2",{trigger: true});
  				}
  			});
  	},
  	chooseType2: function(){ 
  		changeType('cat'); 
  		$('.spinnerModal').show();
  		
  		this.petList.fetch({

  			data: { limit: _PETSPERPAGE, animal_type:"Cat"},
  			processData:true,
  			add:false,
  			success:function(){
  				   // alert("fire");
  				   Application.galleryView.$el.trigger("dataLoaded");
  					//Application.router.navigate("#page2",{trigger: true});
  				}
  			});
  	},
  	chooseType3: function(){ 
  		changeType('bird'); 
  		$('.spinnerModal').show();
  		this.petList.fetch({

  			data: { limit: _PETSPERPAGE, animal_type:"Bird"},
  			processData:true,
  			add:false,
  			success:function(){
  				   // alert("fire");
  				   Application.galleryView.$el.trigger("dataLoaded");
  					//Application.router.navigate("#page2",{trigger: true});
  				}
  			});
  	},
  	chooseType4: function(){ 
  		changeType('rabbit'); 
  		$('.spinnerModal').show();
  		
  		this.petList.fetch({

  			data: { limit: _PETSPERPAGE, animal_type:"Rabbit"},
  			processData:true,
  			add:false,
  			success:function(){
  				   // alert("fire");
  				   Application.galleryView.$el.trigger("dataLoaded");
  					//Application.router.navigate("#page2",{trigger: true});
  				}
  			});
  	},
  	chooseType5: function(){ 
  		changeType('other');
   		$('.spinnerModal').show();
  		
  		this.petList.fetch({

  			data: { limit: _PETSPERPAGE, animal_type:"Other"},
  			processData:true,
  			add:false,
  			success:function(){
  				   // alert("fire");
  				   Application.galleryView.$el.trigger("dataLoaded");
  					//Application.router.navigate("#page2",{trigger: true});
  				}
  			});
  	},
  	filterType: function(){ 
  		$('#filter_zip').hide();
  		$('#filterAction_zip').hide();
  		
  		if ($('#type').hasClass('filter_active')) {	
  			$('#type').removeClass('filter_active'); 
  		} else {
  			$('.filter').removeClass('filter_active');
  			$('#type').addClass('filter_active'); 
  		}
  		
  		$('.scroll_wrapper').addClass('scroller_down2');
  		$('.type_filter').toggle();
  		this.enableScroll();
  	},
  	showFilters:function(){
  		changeType('dog');
  		$('.filter').removeClass('filter_active');
  		$('.type_filter').removeClass('filter_active');
  		
  		$('#filter_zip').hide();
  		$('#filterAction_zip').hide();
  		$('.type_filter').hide();
  		
  		$('.scroll_wrapper').removeClass('scroller_down2');
  		$('.scroll_wrapper').toggleClass('scroller_down');
  		$('.filters_wrapper').toggleClass('filters_up');
  		$('.filters_wrapper').toggleClass('filters_down');
  		this.enableScroll();
  	},	
  	cancelFilters:function(){
  		$('#filter_zip').hide();
  		$('#filterAction_zip').hide();
  		$('.type_filter').hide();
  		$('.scroll_wrapper').removeClass('scroller_down2');
  		$('.filter').removeClass('filter_active');
  		$('#cancel').addClass('filter_active');
  		this.reloadList();
  	},
  	filterTime:function(){
  		$('#filter_zip').hide();
  		$('#filterAction_zip').hide();
  		$('.type_filter').hide();
  		$('.scroll_wrapper').removeClass('scroller_down2');
  		$('.filter').removeClass('filter_active');
  		$('#time').addClass('filter_active');
  		this.reloadList();
  	},
  	filterLocation: function(){	
  		if ($('#location').hasClass('filter_active')) {	
  			$('#location').removeClass('filter_active'); 
  		} else {
  			$('.filter').removeClass('filter_active');
  			$('#location').addClass('filter_active'); 
  		}
  		
  		$('.scroll_wrapper').addClass('scroller_down2');
  		$('.type_filter').hide();
  		$('#filter_zip').toggle();
  		$('#filterAction_zip').toggle();
  		this.enableScroll();
  	},
  	filterLocationAction: function(){
  		$('.spinnerModal').show();
  		var zipCode = $('#filter_zip').val();
  		
  		this.petList.fetch({
  			data: { limit: _PETSPERPAGE, sort_by: "closest_to_me", zip:zipCode},
  			processData:true,
  			add:false,
  			success:function(){
  				   // alert("fire");
  				   Application.galleryView.$el.trigger("dataLoaded");
  					//Application.router.navigate("#page2",{trigger: true});
  			}
  		});
  	},
  	filterFavs: function(){
  		$('.filter').removeClass('filter_active');
  		$('#favs').addClass('filter_active');
  		$('#filter_zip').hide();
  		$('#filterAction_zip').hide();
  		$('.scroll_wrapper').removeClass('scroller_down2');
  		$('.type_filter').hide();
  		$('.spinnerModal').show();
  		
  		this.petList.fetch({
  			data: { limit: _PETSPERPAGE, display_id:"most_shared"},
  			processData:true,
  			add:false,
  			success:function(){
  				   // alert("fire");
  				   Application.galleryView.$el.trigger("dataLoaded");
  					//Application.router.navigate("#page2",{trigger: true});
  			}
  		});
  	}




  });
  
}});

window.require.define({"views/guide_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/guide');

  module.exports = View.extend({
    id: 'guide-view',
    template: template,

     
    initialize: function() {  
  	
    },

    render: function() {
    	
    	//disable taps on tab again
    	//$('#gallery_tab').unbind();
  		this.$el.html(this.template(this.getRenderData()));
  		this.afterRender();
    	return this;

    },
    afterRender: function() {
  	
  	}

  });
  
}});

window.require.define({"views/login_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/login');

  module.exports = View.extend({
    id: 'login-view',
    template: template  
  });
  
}});

window.require.define({"views/myanimals_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/myanimals');
  var Pets = require('../models/pets');
  var _PETSPERPAGE = 12;

  module.exports = View.extend({
  	id: 'myanimals-view',
  	template: template,
  	events:{
  		"dataLoaded":"append",
  		"tap .mypetitem": "renderPet"
  	},


  	initialize: function() {  
  		this.myList = new Pets();
  		this.myList.petJSON ={};
      //this.myList.url = "http://requestb.in/zinta8zi";
  		this.myList.fetch({

  			data: { display_id: "service_shared_pets"},
  			processData:true,
  			add:true,
  			success:function(){
  			   // alert("fire");
  			   Application.myanimalsView.$el.trigger("dataLoaded");
  				//Application.router.navigate("#page2",{trigger: true});
  			}
  		});






  	},

  	render: function() {

    	//disable taps on tab again
    	//$('#gallery_tab').unbind();

    	//var t={};
    	// testing jq 
    	this.$el.html(this.template(this.myList.petJSON));

    	//this.$el.html(this.template(t));


    	
    	
    	return this;

    },

    afterRender: function() {
    	this.enableScroll();
    	     // Application.router.navigate("#gallery",{trigger:true});

    },  
    enableScroll: function(){
           myScroll = new iScroll('myPetScroll', {useTransition: true});

    },
    append: function(){
    	//alert("refresh fired")
    	this.myList.petJSON = this.myList.handle();
    	//this.petList.each(function(pet){console.log(pet.get("name"))});
    	//console.log(js);

    	//http://picsforpets.dev.zivtech.com/sites/default/files/styles/thumbnail_retina/public/fb_campaign/

    	this.$el.html(this.template(this.myList.petJSON));

    	//this.enableScroll();


    	  	//this.petList.each(function(pet){console.log(pet.get("name"))});

    },
    renderPet: function(e){
    	//alert("test");
    	e.preventDefault();
    	var id = $(e.currentTarget).data("id");
      //alert(id);
      var item = this.myList.get(id);
      //var name = item.get("name");
      Application.petDetail.item = item.toJSON();    
      //stackNavigator.pushView(petDetail);
      Application.router.navigate("#pet" , {trigger: true});

     	//petDetail.render();
      //alert(name);



    }





      });
  
}});

window.require.define({"views/pet_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/petdetail');

  module.exports = View.extend({
    	id: 'pet-view',
      template: template,
      events: {
      "tap #pet_share" : "fbShare",
  		"tap .flip_action" : "flipCard"

      
      },
      initialize: function(){



      },
      fbShare:function(){

        var dialogOptions = {
              link: 'https://apps.facebook.com/dosomethingapp/submit-pet-picture/submission/' + this.item.sid ,
              picture: this.item.image,
              name: 'DoSomething.org\'s Pics For Pets',
              caption: 'Hi. I\'m ' + this.item.name + '.  I\'m '+ this.item["three words"],
              description: 'Do Something about homeless animals, share photos of shelter pets and help them find homes. The more shares a pet gets the better chance it\'ll be adopted, their shelter will also be rewarded for every share!'
          };
      //alert('hello');
         
         if (window.localStorage.getItem("user_dos_auth")){
          window.plugins.facebookConnect.login({permissions: ["email", "user_about_me","publish_stream"], appId: "105775762330"}, 
        function(result) {
          
            window.plugins.facebookConnect.dialog('feed', dialogOptions, function(response) {
              console.log("FacebookConnect.dialog:" + JSON.stringify(response));
          });
          //console.log("FacebookConnect.login:" + JSON.stringify(result));
          if(result.cancelled || result.error) {
            console.log("FacebookConnect.login:failedWithError:" + result.message);
            return;}});
  			var data = {
  				"pet_id":this.item.sid, "fb_id":window.localStorage.getItem("fb_id")
  			};
  		//	alert(window.localStorage.getItem("fb_auth_token"));
  		    $.ajax({
  		      url: "http://www.dosomething.org/services/pets/sharing.json",
  		      type: 'POST',
  		      data: JSON.stringify(data),
  		      contentType: 'application/json; charset=utf-8',
  		      dataType: 'json',

  		      error: function(textStatus, errorThrown) {
  		        //alert('page_submitPet_submit - failed to post');
  		        //alert(JSON.stringify(textStatus));
  		        //console.log(JSON.stringify(errorThrown));
  		      },
  		      success: function(data) {

  		        }
  		      });

          

        }else{

                  window.localStorage.setItem("session_redirect", "#pet");

                  Application.sessionView.authFb();
             

        }



     
         
       
      },
      routerSharePet:function(){


      },
      shareGoals:function(){
        cordova.exec("ChildBrowserCommand.showWebPage", "http://pics4pets.herokuapp.com/prizes.html" );
    
    
      },
      render: function(){
        var x ={};
        $(this.el).html(this.template(this.item));
        //test="steve";
        //alert(test);
        return this; // for chainable calls, like .render().el

      },
      flipCard: function(){
          var action = $('.flip_action'); 
              if (action.hasClass('return')) {
                  action.removeClass('return');
                  action.html('MORE INFO');
              } else {    
                  action.addClass('return'); 
                  action.html('BACK TO PIC');
              }
  						
  								$('.front').toggle();
  								$('.card_back').toggle();
          }
         
      

  		
  		
    });
}});

window.require.define({"views/session_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/loginSplash');

  module.exports = View.extend({
    id: 'session-view',
    template: template,
    events: 		{

    		"tap #facebook_login":"authFb",
    	
    	},

     
    initialize: function() {  
  	
  	 
  	
  	
  	
  	
  	
  	
    },

    render: function() {
    	
    	//disable taps on tab again
    	//$('#gallery_tab').unbind();
  	this.$el.html(this.template(this.getRenderData()));
  	this.afterRender();
    	return this;

    },


    afterRender: function() {
  	
  	
  	
    },
    authFb: function(){

    	window.plugins.facebookConnect.login({permissions: ["email", "user_about_me","publish_stream"], appId: "105775762330"}, 
    		function(result) {
    			
    			Application.sessionView.successFb(result);
    			//console.log("FacebookConnect.login:" + JSON.stringify(result));
    			if(result.cancelled || result.error) {
    				console.log("FacebookConnect.login:failedWithError:" + result.message);
    				return;}});
  		//	window.plugins.facebookConnect.requestWithGraphPath("me/feed", "options", "POST", "callback")
  	


  },
  successFb: function(result){

  	//alert("success");
  	// store login state
  	window.localStorage.setItem("user_fb_auth", true);
    window.localStorage.setItem("fb_auth_token", result.accessToken )
    //console.log(result);
    //this.authDos(fbtoken);

     data = {access_token: result.accessToken,group_name:"PicsforPetsSharers2012"};
      $.ajax({
        url: "https://www.dosomething.org/?q=rest/user/fblogin.json",
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        error: function(textStatus, errorThrown) {
          alert(JSON.stringify(textStatus));
          console.log(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function(data) {
              //alert('page_login_submit - SUCCESS!');
              //$('#result').html(JSON.stringify(data));
              //alert('dos success');
              //Application.sessionView.sucessDoS();
              
                window.localStorage.setItem("user_dos_auth", true);
                try{
                  var len = data["session_name"].length;
                  window.localStorage.setItem("user_dos_sessname", data["session_name"].substring(1,len) + '='+ data["sessid"]);
                  //alert(data["session_name"]);


                } catch (e) {

                  //alert("Error using mycommand: " + e.message);

                }
                var redirectLoc = window.localStorage.getItem("session_redirect");
                if (redirectLoc == "false"){

                  return;
                }else{
                                Application.router.navigate(redirectLoc , {trigger: true});


                }
                // handle cancel button on camera to send user back to gallery instead of back to session


            }
          });





  },
  authDoS:function(token){

     


  },
  sucessDoS:function(){
    alert("before redirect");
      window.localStorage.setItem("user_dos_auth", true);
       

      //this.redirect();


  },
  redirect:function(){
     


  }




  });
  
}});

window.require.define({"views/shelterForm_view": function(exports, require, module) {
  var View = require('./view');
  var Shelters = require('../models/shelters');
  var template = require('./templates/shelterForm');


  module.exports = View.extend({
    id: 'shelterForm-view',
    template: template,
    events:{
      "tap #shelter-submit":"getShelters",
      "sheltersLoaded":"append",



    },

     
    initialize: function() {  
  	 this.shelterList = new Shelters();
      this.shelterList.shelterJSON ={};
      
      
    
    },

    render: function() {
    	
    	//disable taps on tab again
    	//$('#gallery_tab').unbind();
  		this.$el.html(this.template(this.getRenderData()));
  		this.afterRender();
    	return this;

    },

    afterRender: function() {
  	
  	},
    append: function(){
      //alert("refresh fired")
      this.shelterList.shelterJSON = this.shelterList.handle();
      //this.petList.each(function(pet){console.log(pet.get("name"))});
      //console.log(js);

      //http://picsforpets.dev.zivtech.com/sites/default/files/styles/thumbnail_retina/public/fb_campaign/

          
      Application.router.navigate("#shelters",{trigger:true} );


      //this.enableScroll();

      //this.petList.each(function(pet){console.log(pet.get("name"))});

    },
    
    getShelters:function(e){
      e.preventDefault();
      var zip = $('#shelter-z').val();

      //alert(zip);
      this.shelterList.zip = zip;
      this.shelterList.url = 'http://www.dosomething.org/fb/pics-for-pets/shelter-search/json/' + zip + '/';
      this.shelterList.fetch({

        
        add:false,
        success:function(){
           //alert("fire");
           //Application.galleryView.$el.trigger("dataLoaded");
          //Application.router.navigate("#page2",{trigger: true});
                   Application.shelterFormView.$el.trigger("sheltersLoaded");



        }
      });



      //alert("search");
    }

  });
  
}});

window.require.define({"views/shelterList_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/shelterList');

  module.exports = View.extend({
    	id: 'shelter-list',
      template: template,
      events: {
          "tap #cancel-search":"cancel",
          "tap .pet_item": "renderShelter"

      
      },
      initialize: function(){



      },
        cancel:function(e){
          e.preventDefault();
            $.mobile.activePage.back = true;
            window.history.back();

      },
     
      render: function(){
        var x ={};
        $(this.el).html(this.template(Application.shelterFormView.shelterList.shelterJSON));
       
      
        return this; // for chainable calls, like .render().el

      },
      renderShelter: function(e){
      //alert("test");
      e.preventDefault();
      var id = $(e.currentTarget).data("id");
      //alert(id);
      var item = Application.shelterFormView.shelterList.get(id);
      var address = item.attributes.address1 + ' ' + item.attributes.city + "," + item.attributes.state;
      address = encodeURIComponent(address);
      item.attributes.map_url = "http://maps.googleapis.com/maps/api/staticmap?center="  +address +"&zoom=14&size=282x150&markers=color:blue%7Clabel:S%7C "+ address+ " &sensor=false";
      item.attributes.hours = $(item.attributes.hours).text();
      //encodeURIComponent(link)
      //var name = item.get("name");
      Application.shelterDetail.item = item.toJSON();    
      //stackNavigator.pushView(petDetail);
      Application.router.navigate("#shelter" , {trigger: true});

      //petDetail.render();

    },
    enableScroll:function(){
        var scroll = new iScroll('shelterScroll');
    }
      

  		
  		
    });
}});

window.require.define({"views/shelter_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/shelterDetail');

  module.exports = View.extend({
    	id: 'shelter-view',
      template: template,
      events: {

      
      },
      initialize: function(){



      },
     
      render: function(){
        var x ={};
        $(this.el).html(this.template(this.item));
        //test="steve";
        //alert(test);
        return this; // for chainable calls, like .render().el

      }
      

  		
  		
    });
}});

window.require.define({"views/submit_view": function(exports, require, module) {
  var View = require('./view');
  var template = require('./templates/submitpet');

  module.exports = View.extend({
    id: 'submit-view',
    template: template,
    events: {

      "tap #submit-cancel":"cancel",
      "tap #retake-pet":"retake",
      "tap #pet-submit":"submitBtn",
      "photoUploadComplete":"postPet",
      "tap #dog":"chooseDog",
      "tap #cat":"chooseCat",
      "tap #bird":"chooseBird",
      "tap #rabbit":"chooseRabbit"
    },

    initialize: function() {  








    },
    retake:function(){

      Application.furView.takePic();
    },
    cancel:function(e){
      e.preventDefault();
      $("#footer").show();
       $('.tab').removeClass('tab_active');
        $('#gallery_tab').addClass('tab_active');
      $.mobile.activePage.back = true;
      window.history.back();


    },
    render: function() {
    	$('#footer').hide();
    	var t = {};
     this.$el.html(this.template(t));
     this.afterRender();
    	//return this;

    },

    setPetAttr:function(){
      window.localStorage.setItem("pet_name" , $('[name=pet_name]').val());
      window.localStorage.setItem("pet_type" , $('[name=pet_type]').val());
      window.localStorage.setItem("pet_age" , $('[name=pet_age]').val());

      window.localStorage.setItem("pet_description1" , $('[name=pet_description1]').val());
      window.localStorage.setItem("pet_description2" , $('[name=pet_description2]').val());
      window.localStorage.setItem("pet_description3" , $('[name=pet_description3]').val());
      
      window.localStorage.setItem("shelter_name" , $('[name=shelter_name]').val());
      window.localStorage.setItem("shelter_address" , $('[name=shelter_address]').val());
      window.localStorage.setItem("shelter_city" , $('[name=shelter_city]').val());
      window.localStorage.setItem("shelter_state" , $('[name=shelter_state]').val().toUpperCase());
      window.localStorage.setItem("shelter_zip" , $('[name=shelter_zip]').val());




    },
    postPet:function(){


     
      var pet_name = window.localStorage.getItem("pet_name");
      var pet_age = window.localStorage.getItem("pet_age");
      var pet_type = window.localStorage.getItem("pet_type");
      var pet_description1 = window.localStorage.getItem("pet_description1");
      var pet_description2 = window.localStorage.getItem("pet_description2");
      var pet_description3 = window.localStorage.getItem("pet_description3");
      var pet_fid = window.localStorage.getItem("pet_fid");
      var shelter_name = window.localStorage.getItem("shelter_name");
      var shelter_address = window.localStorage.getItem("shelter_address");
      var shelter_city = window.localStorage.getItem("shelter_city");
      var shelter_state = window.localStorage.getItem("shelter_state");
      var shelter_zip = window.localStorage.getItem("shelter_zip");
                          //alert(pet_name);



      var data = {
      "nid": "724609",
      "webform_submission": {
          "nid": "724609"
      },
      "field_fb_app_animal_name": {
          "und": [
              {
                  "value": pet_name
              }
          ]
      },
      "field_fb_app_animal_type": {
          "und": pet_type
      },
      
      "field_fb_app_age": {
          "und": [
              {
                  "value": pet_age
              }
          ]
      },
      "field_fb_app_three_words": {
          "und": [
              {
                  "value": pet_description1
              },
              {
                  "value": pet_description2
              },
              {
                  "value": pet_description3
              }
          ]
      },
      "field_fb_app_image": {
          "und": [
              {
                  "fid": pet_fid

              }
          ]
      },
      "field_fb_app_shelter_name": {
          "und": [
              {
                  "value": shelter_name
              }
          ]
      },
      "field_fb_app_address": {
          "und": [
              {
                  "value": shelter_address
              }
          ]
      },
      "field_fb_app_city": {
          "und": [
              {
                  "value": shelter_city
              }
          ]
      },
      "field_fb_app_state": {
          "und": shelter_state
      },
      "field_fb_app_zip": {
          "und": [
              {
                  "value": shelter_zip
              }
          ]
        }
      };

      $.ajax({
        url: "http://www.dosomething.org/services/pets/webform_submission.json",
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',

        error: function(textStatus, errorThrown) {
          alert('page_submitPet_submit - failed to post');
          alert(JSON.stringify(textStatus));
          console.log(JSON.stringify(errorThrown));
        },
        success: function(data) {
          Application.galleryView.reloadList();
         
          }
        });



      //alert("search");
    },
    submitBtn:function(e){
          e.preventDefault();
          var formError;
          $("#pet-form input[type=text]").each(function() {

                  if(this.value == "") {
                      formError=true;
                      return
                  }

              });

          if(formError){
              alert("All fields required!")

          }else{

            
                     this.setPetAttr();
          window.localStorage.setItem("submit_pet_btn_pressed","true");

          this.submit();
          //alert('submitbtn');
          }
                    
        



    }, 

    submit:function(){


      if (window.localStorage.getItem("pet_photo_upload_complete") == "true"){


          this.postPet();
              $('#footer').show();

          Application.router.navigate("#gallery",{trigger:true} );
          //reset data for next submission
          window.localStorage.setItem("submit_pet_btn_pressed","false");
          window.localStorage.setItem("pet_photo_upload_complete","false");





      }else{
                $('#footer').show();

            Application.router.navigate("#gallery",{trigger:true} );


      }





    },
    enableScroll:function(){
      //var scroll = new iScroll('submitWrapper');
  		$('#submit-view').css('-webkit-backface-visibility','visible');
    },

    afterRender: function() {

    },
  	chooseCat:function() {
  		$('input[type="radio"]').attr('checked',false);
  		$('#cat').attr('checked',true);
  		$('#petType').val('Cat');
  	},
  	chooseDog:function() {
  		$('input[type="radio"]').attr('checked',false);
  		$('#dog').attr('checked',true);
  		$('#petType').val('Dog');
  	},
  	chooseBird:function() {
  		$('input[type="radio"]').attr('checked',false);
  		$('#bird').attr('checked',true);
  		$('#petType').val('Bird');
  	},
  	chooseRabbit:function() {
  		$('input[type="radio"]').attr('checked',false);
  		$('#rabbit').attr('checked',true);
  		$('#petType').val('Rabbit');
  	}




  });
  
}});

window.require.define({"views/templates/about": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"about_page\" class=\"content_wrapper\">\n	<div id=\"aboutScroll\" class=\"scroll_wrapper scroller_down\">\n		<div id=\"scroller\">\n			<div class=\"palette\" style=\"margin-bottom:25px\">\n				<div class=\"text_block\">\n					<div class=\"h2\" style=\"text-transform:uppercase;margin-bottom:5px\">About Pics For Pets</div>\n	\n					<p class=\"h4\">Every year, approximately 3 to 4 million animals in shelters are euthanized simply because they don’t get adopted.</p>\n\n					<div class=\"h3 align_center\">One reason they don’t get adopted? <span style=\"text-decoration:underline\">Bad pictures</span>.</div>\n\n					<p class=\"h4\">Just by taking and sharing a great picture of a shelter animal, you can increase its chance of being adopted. Pics for Pets is a campaign that gives you the tools to take and share great photos of shelter animals to improve their chances of finding a happy home.</p>\n					\n					<p class=\"h4\">Got questions about the campaign? Check out the FAQs or email <a style=\"text-transform:underline;color:#000;\" href=\"mailto:animals@dosomething.org\">animals@dosomething.org</a> (tap and hold to email). </p>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>  ";});
}});

window.require.define({"views/templates/edu": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div class='eduModal'>\n	<div class='eduLogo'></div>\n	<div class='eduText'>\n		<div class='h3' style='padding-top:0'>GALLERY</div>\n		<div class='h4 edu_column' style='margin-right:3.9%'>General: Browse through shelter animal photos. Once you find your favorite, tap on it!</div>\n		<div class='h4 edu_column'>Filters: You can also sort the animals by Most Shared, Least Shared, and Zip Location</div>\n		<div class='clear'></div>\n		<div class='edu_column' style='margin-right:3.9%'>\n			<div class='h3'>MY ANIMALS</div>\n			<div class='h4'>Check in on animals you've uploaded or shared to see how they're doing.</div>\n		</div>\n		<div class='edu_column'>\n			<div class='h3'>CAMERA/PHOTOGRAPH</div>\n			<div class='h4'>Take a picture of your shelter animal. If you want helpful pic tips, check out 'Photograph' first.</div>\n		</div>\n		<div class='clear'></div>\n		<div class='h3'>PET PAGE</div>\n		<div class='edu_column' style='margin-right:3.9%'>\n			<div class='h4'>Click 'More Info' for shelter details on this particular animal.</div>\n		</div>\n		<div class='edu_column'>\n			<div class='h4'>Heart/Share: Here's a quick pulse on the animal's share count!</div>\n		</div>\n		<div class='clear'></div>\n		<div class='edu_column' style='margin-right:3.9%'>\n			<div class='h4' style='padding-top:7px'>Click 'Share Me' to give this animal some love.</div>\n		</div>\n		<div class='edu_column'>\n			<div class='h4' style='padding-top:7px'>Swipe your finger left or right to get to the next animal.</div>\n		</div>		\n		<div class='clear'></div>\n	</div>\n	<div id='edu-button' class='wide_button blue_button active_yellow'>Let's Get Started</div>\n</div>";});
}});

window.require.define({"views/templates/faq": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"faq_page\" class=\"content_wrapper\" style=\"padding-top:55px\">\n			<div class=\"faq_item\">\n				<div id=\"question1\" class=\"question_wrapper\">\n					<div class=\"question\">What is Pics for Pets?</div>\n					<div class=\"item_arrow\"></div>\n					<div class=\"clear\"></div>\n				</div>\n				<div class=\"answer\">Pics for Pets is a campaign by DoSomething.org to increase adoption rates in animal shelters across the country.  Armed with a camera or your smartphone, we are asking young people (25 and under) like you around the country to visit their local animal shelter to take a picture of an animal in need of a new headshot to share on the Pics for Pets Facebook or mobile app. </div>\n			</div>\n			<div class=\"faq_item\">\n				<div id=\"question2\" class=\"question_wrapper\">\n					<div class=\"question\">How do I become a Pics4Pets photographer?</div>\n					<div class=\"item_arrow\"></div>\n					<div class=\"clear\"></div>\n				</div>\n				<div class=\"answer\">Click on \"Photograph\" in the Pics for Pets app, then locate your participating local shelter.  Before visiting your shelter, make sure to download the guide and watch the video of photography tips to help you along your way.  After you have taken an expert photo of an animal (or animals) at the shelter, upload the pic in the \"Photograph\" section and share it with your friends by clicking the \"share\" button.</div>\n			</div>\n			<div class=\"faq_item\">\n				<div id=\"question3\" class=\"question_wrapper\">\n					<div class=\"question\">How do I find my local shelter?</div>\n					<div class=\"item_arrow\"></div>\n					<div class=\"clear\"></div>\n				</div>\n				<div class=\"answer\">Click on the \"Find a Shelter\" button in the \"Photograph\" section of the Pics for Pets app.  Once there, enter in your zip code to find the shelter nearest you.</div>\n			</div>\n			<div class=\"faq_item\">\n				<div id=\"question4\" class=\"question_wrapper\">\n					<div class=\"question\">Am I allowed to handle the animals?</div>\n					<div class=\"item_arrow\"></div>\n					<div class=\"clear\"></div>\n				</div>\n				<div class=\"answer\">For your safety, you will not be permitted to handle the animals.  When visiting the shelter, make sure that there is a volunteer present that can handle the animal for you as you take a picture of the animal. </div>\n			</div>\n			<div class=\"faq_item\">\n				<div id=\"question5\" class=\"question_wrapper\">\n					<div class=\"question\">Can I take pictures of more than one animal?</div>\n					<div class=\"item_arrow\"></div>\n					<div class=\"clear\"></div>\n				</div>\n				<div class=\"answer\">Of course! Just be mindful that shelters are busy places and try to keep photo sessions under 30 minutes.</div>\n			</div>\n			<div class=\"faq_item\">\n				<div id=\"question6\" class=\"question_wrapper\">\n					<div class=\"question\">How do I take good photos of animals?</div>\n					<div class=\"item_arrow\"></div>\n					<div class=\"clear\"></div>\n				</div>\n				<div class=\"answer\">Visit the \"Photograph\" section of the app and click on \"Get Tips.\"  You'll be able to download a great guide to help you take expert photos, as well as a video with tips on how to take the best photos.</div>\n			</div>\n			<div class=\"faq_item\">\n				<div id=\"question7\" class=\"question_wrapper\">\n					<div class=\"question\">How do I win the animals prizes?</div>\n					<div class=\"item_arrow\"></div>\n					<div class=\"clear\"></div>\n				</div>\n				<div class=\"answer\">The more shares a picture gets, the more prizes the shelter can receive. 200 shares gets the shelter $10 for toys, 500 shares gets the shelter $30 for food and 1000 shares gets the shelter $50 for bedding (up to $10,000 in prizes).</div>\n			</div>\n			<div class=\"faq_item\">\n				<div id=\"question8\" class=\"question_wrapper\">\n					<div class=\"question\">How do I win a $10,000 scholarship?</div>\n					<div class=\"item_arrow\"></div>\n					<div class=\"clear\"></div>\n				</div>\n				<div class=\"answer\">Everyone that visits their local shelter and submits a picture of an animal they took will be entered to win the $10,000 scholarship.  We will be announcing the winners by December 1st.</div>\n			</div>\n			<div class=\"faq_item\">\n				<div id=\"question9\" class=\"question_wrapper\">\n					<div class=\"question\">Hey, you didn't answer my question!</div>\n					<div class=\"item_arrow\"></div>\n					<div class=\"clear\"></div>\n				</div>\n				<div class=\"answer\">Sorry about that! Email animals@dosomething.org with any additional questions and Greg or April will get back to you as soon as possible.</div>\n			</div>\n</div>";});
}});

window.require.define({"views/templates/fur": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"furtograph_page\" class=\"content_wrapper palette\">\n	<div class=\"text_block\">\n		<div class=\"h2\" style=\"text-transform:uppercase;margin-bottom:10px\">Be a photographer</div>\n		<div class=\"h4\">Were you inspired by all the pics of shelter pets? Well you can take pics, too! Not only do we provide a camera, but you’ll also find a shelter locator as well as great photography tips to get you started.</div>\n	</div>\n	<div id=\"fur_action\" class=\"wide_button active_opacity green_button\" >Action Guide</div>\n	<div id=\"fur_shelter\" class=\"wide_button blue_button active_opacity\">Find a shelter</div>\n	<div id=\"fur_pic\" class=\"wide_button red_button active_opacity\" style=\"margin-bottom:0\">Take a pic</div>\n</div>";});
}});

window.require.define({"views/templates/gallery": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n					 <li data-id=\"";
    foundHelper = helpers.sid;
    stack1 = foundHelper || depth0.sid;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "sid", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\" class=\"pet_thumb\" style=\"background-color:#333;background-image:url('";
    foundHelper = helpers.thumb_retina;
    stack1 = foundHelper || depth0.thumb_retina;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "thumb_retina", { hash: {} }); }
    buffer += escapeExpression(stack1) + "')\"></li>\n\n  					 ";
    return buffer;}

    buffer += "<div id=\"filters_action\" class=\"gridIconOverlay\"></div>\n\n<div id=\"gallery_page\" class=\"content_wrapper\">\n	<div class=\"filters_wrapper filters_up\">\n		<div id=\"cancel\" class=\"filter\"></div>\n		<div id=\"time\" class=\"filter\"></div>\n		<div id=\"type\" class=\"filter dog\"></div>\n		<div id=\"favs\" class=\"filter\"></div>\n		<div id=\"location\" class=\"filter\"></div>\n		<div class=\"clear\"></div>		\n		\n		<div id=\"dog_type\" class=\"type_filter\"></div>\n		<div id=\"cat_type\" class=\"type_filter\"></div>\n		<div id=\"bird_type\" class=\"type_filter\"></div>\n		<div id=\"rabbit_type\" class=\"type_filter\"></div>\n		<div id=\"other_type\" class=\"type_filter\"></div>\n		<div class=\"clear\"></div>	\n		\n		<input id=\"filterAction_zip\" type=\"submit\" value=\" \" class=\"filterZip_go box_button\"/>\n		<input id=\"filter_zip\" type=\"text\" placeholder=\"Zip Code\" />\n		<div class=\"clear\"></div>			\n	</div>\n\n	<div id=\"wrapper\" class=\"scroll_wrapper\">\n		<div id=\"scroller\">\n			\n\n			<ul id=\"thelist\">\n					 ";
    foundHelper = helpers.pets;
    stack1 = foundHelper || depth0.pets;
    stack2 = helpers.each;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n\n			</ul>\n			<div id=\"loadMore\">\n				<div class=\"wide_button green_button active_yellow centered\">Load More...</div>\n			</div>\n			<!-- <div id=\"pullUp\">\n				<span class=\"pullUpIcon\"></span><span class=\"pullUpLabel\">Pull up to refresh...</span>\n			</div> -->\n		</div>\n	</div>\n</div>\n\n\n\n<div class=\"spinnerModal\" style=\"display:none\">\n  <div class=\"spinnerContainer\">\n		<div class=\"description\">Loading Pets</div>\n\n  </div>\n</div>";
    return buffer;});
}});

window.require.define({"views/templates/galleryItem": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<li style=\"background-image:url('";
    foundHelper = helpers.pet_thumbnail;
    stack1 = foundHelper || depth0.pet_thumbnail;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "pet_thumbnail", { hash: {} }); }
    buffer += escapeExpression(stack1) + "')\"></li>\n";
    return buffer;});
}});

window.require.define({"views/templates/guide": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"guide_page\" class=\"content_wrapper palette\">\n	<div class=\"action_number\">1</div>\n	<div class=\"h2\">Find your nearest animal shelter with the handy shelter locator.</div>\n	<div class=\"clear\"></div>\n	\n	<div class=\"action_number\">2</div>\n	<div class=\"h2\">Visit your shelter to take an awesome animal picture.</div>\n	<div class=\"clear\"></div>\n	\n	<div class=\"action_number\">3</div>\n	<div class=\"h2\">Submit your picture to the gallery as well as important animal details.</div>\n	<div class=\"clear\"></div>\n	\n	<div class=\"action_number\">4</div>\n	<div class=\"h2\">Share your animal with your Facebook friends to help it get adopted.</div>\n	<div class=\"clear\"></div>\n	\n	<div class=\"action_number\">5</div>\n	<div class=\"h2\">Don’t stop there! You can help other animals get adopted, too, by sharing them as well.</div>\n	<div class=\"clear\"></div>\n</div>";});
}});

window.require.define({"views/templates/home": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"content\">\n  <h1>brunch</h1>\n  <h2>Welcome!</h2>\n  <ul>\n    <li><a href=\"http://brunch.readthedocs.org/\">Documentation</a></li>\n    <li><a href=\"https://github.com/brunch/brunch/issues\">Github Issues</a></li>\n    <li><a href=\"https://github.com/brunch/twitter\">Twitter Example App</a></li>\n    <li><a href=\"https://github.com/brunch/todos\">Todos Example App</a></li>\n  </ul>\n</div>\n";});
}});

window.require.define({"views/templates/login": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"loginDS_page\" class=\"content_wrapper palette\">\n	<form>\n		<div class=\"label\">Email or Cell #</div>\n		<input type=\"email\" name=\"email\" />\n		<div class=\"label\">Password</div>\n		<input type=\"text\" name=\"password\" />\n		<input type=\"submit\" name=\"loginDS\" class=\"login_button\" value=\"Login with DoSomething.org\" />\n	</form>\n</div>";});
}});

window.require.define({"views/templates/loginRegister": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"register_page\" class=\"content_wrapper palette\">\n	<div class=\"little_info\">Before you get started we need a little info</div>\n	<form>\n		<div class=\"label\">First Name</div>\n		<input type=\"text\" name=\"first_name\" />\n		<div class=\"label\">Last Name</div>\n		<input type=\"text\" name=\"last_name\" />\n		<div class=\"label\">Email or Cell #</div>\n		<input type=\"text\" name=\"email\" />\n		<input type=\"submit\" name=\"loginDS\" class=\"login_button\" value=\"Let's Do This\" />\n	</form>\n</div>";});
}});

window.require.define({"views/templates/loginSplash": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"loginStart_page\" class=\"content_wrapper palette\">\n<p>To access the camera, first you need to login. Why? So that we can add your amazing photo to the pawtrait gallery.</p>\n	<div id=\"facebook_login\" class=\"wide_button facebook_button active_opacity\">Login with Facebook</div>\n	\n</div>";});
}});

window.require.define({"views/templates/myanimalItem": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<li class=\"pet_item\">\n	<div class=\"pet_image\" style=\"background-image:url('";
    foundHelper = helpers.myanimal_thumbnail;
    stack1 = foundHelper || depth0.myanimal_thumbnail;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "myanimal_thumbnail", { hash: {} }); }
    buffer += escapeExpression(stack1) + "')\"></div>\n	<div class=\"pet_name\">";
    foundHelper = helpers.myanimal_name;
    stack1 = foundHelper || depth0.myanimal_name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "myanimal_name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n	<div class=\"item_arrow\"></div>\n</li>";
    return buffer;});
}});

window.require.define({"views/templates/myanimals": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n					<li class=\"mypetitem\" data-id=\"";
    foundHelper = helpers.sid;
    stack1 = foundHelper || depth0.sid;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "sid", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\"> \n	<div data-id=\"";
    foundHelper = helpers.sid;
    stack1 = foundHelper || depth0.sid;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "sid", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\" class=\"pet_image\" style=\"background-image:url('";
    foundHelper = helpers.thumb_retina;
    stack1 = foundHelper || depth0.thumb_retina;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "thumb_retina", { hash: {} }); }
    buffer += escapeExpression(stack1) + "')\"></div>\n	<div class=\"pet_name\">";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n	<div class=\"item_arrow\"></div>\n	</li>\n  					 ";
    return buffer;}

    buffer += "<div id=\"myAnimals_page\" class=\"content_wrapper\">\n<h1>test</h1>\n	<div id=\"myPetScroll\" class=\"scroll_wrapper\">\n		<div id=\"scroller\">\n			<ul id=\"myanimals\" class=\"border_list\">\n				\n				\n\n\n				";
    foundHelper = helpers.pets;
    stack1 = foundHelper || depth0.pets;
    stack2 = helpers.each;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n				 \n			</ul>\n		</div>\n	</div>\n</div>                  ";
    return buffer;});
}});

window.require.define({"views/templates/myanimalsEmpty": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"emptyMyAnimals_page\" class=\"content_wrapper\">\n	<div class=\"empty_page_line1\">Empty page instructions 1</div>\n	<div class=\"empty_page_line2\">Empty page instructions 2</div>\n</div>";});
}});

window.require.define({"views/templates/petdetail": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<div id=\"petDetail_page\" class=\"content_wrapper\">\n	<div id=\"slider\" class=\"swipe\">\n	  <div class=\"swipe_container\">\n			\n			<div class=\"pet_detail\" style=\"display:block\">\n				<div class=\"petCard\">\n					<div class=\"front\">\n						<div class=\"card_content\">\n							<div class=\"image\" style=\"background-image:url('";
    foundHelper = helpers.petdetail_retina;
    stack1 = foundHelper || depth0.petdetail_retina;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "petdetail_retina", { hash: {} }); }
    buffer += escapeExpression(stack1) + "')\"></div>\n							<div class=\"detail1\">";
    foundHelper = helpers['three words'];
    stack1 = foundHelper || depth0['three words'];
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "three words", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n							<div class=\"detail2\">";
    foundHelper = helpers.city;
    stack1 = foundHelper || depth0.city;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "city", { hash: {} }); }
    buffer += escapeExpression(stack1) + ", ";
    foundHelper = helpers.state;
    stack1 = foundHelper || depth0.state;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "state", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n						</div>\n					</div>\n					<div class=\"card_back\" style=\"display:none\">\n						<div class=\"card_content\">\n							<div class=\"pet_description align_center\" style=\"padding:7px 0 15px 0\">\n							\n\n								";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + " is a ";
    foundHelper = helpers.age;
    stack1 = foundHelper || depth0.age;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "age", { hash: {} }); }
    buffer += escapeExpression(stack1) + " year old ";
    foundHelper = helpers['animal type'];
    stack1 = foundHelper || depth0['animal type'];
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "animal type", { hash: {} }); }
    buffer += escapeExpression(stack1) + ". ";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + " is ";
    foundHelper = helpers['three words'];
    stack1 = foundHelper || depth0['three words'];
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "three words", { hash: {} }); }
    buffer += escapeExpression(stack1) + ". Below is ";
    foundHelper = helpers.name;
    stack1 = foundHelper || depth0.name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "'s shelter information.\n							</div>\n							<div class=\"card_bottom\">\n								<div class=\"shelter_name\">";
    foundHelper = helpers.sheltername;
    stack1 = foundHelper || depth0.sheltername;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "sheltername", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n								<div class=\"shelter_address\">";
    foundHelper = helpers.address1;
    stack1 = foundHelper || depth0.address1;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "address1", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n								<div class=\"shelter_address\">";
    foundHelper = helpers.address2;
    stack1 = foundHelper || depth0.address2;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "address2", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n							</div>\n						</div>\n					</div>\n				</div>\n				<div class=\"detail_buttons\">\n					<div class=\"pet_sharegoals wide_button gray_button heart\">";
    foundHelper = helpers['facebook share count'];
    stack1 = foundHelper || depth0['facebook share count'];
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "facebook share count", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n					<div id=\"pet_moreinfo\" class=\"wide_button green_button active_yellow flip_action\">MORE INFO</div>\n				</div>\n				<div id=\"pet_share\" class=\"wide_button blue_button active_yellow\">SHARE ME</div>\n			</div>\n			\n	  </div>\n	</div>\n</div>";
    return buffer;});
}});

window.require.define({"views/templates/shelterDetail": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<div id=\"shelterDetails_page\" class=\"content_wrapper palette\">\n	<div class=\"shelter_spinner\">\n		<div class=\"spinnerWrapper\">	\n			<div class=\"spinner\">\n		    <div class=\"bar1\"></div>\n		    <div class=\"bar2\"></div>\n		    <div class=\"bar3\"></div>\n		    <div class=\"bar4\"></div>\n		    <div class=\"bar5\"></div>\n		    <div class=\"bar6\"></div>\n		    <div class=\"bar7\"></div>\n		    <div class=\"bar8\"></div>\n		    <div class=\"bar9\"></div>\n		    <div class=\"bar10\"></div>\n		    <div class=\"bar11\"></div>\n		    <div class=\"bar12\"></div>\n		  </div>\n		</div>\n	</div>\n	<div class=\"shelter_map\" style=\"background-image:url('";
    foundHelper = helpers.map_url;
    stack1 = foundHelper || depth0.map_url;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "map_url", { hash: {} }); }
    buffer += escapeExpression(stack1) + "')\"></div>\n	<div class=\"shelter_deets\">\n		<div class=\"shelter_name\">";
    foundHelper = helpers.title;
    stack1 = foundHelper || depth0.title;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n		<div class=\"shelter_address\">";
    foundHelper = helpers.address1;
    stack1 = foundHelper || depth0.address1;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "address1", { hash: {} }); }
    buffer += escapeExpression(stack1) + ", ";
    foundHelper = helpers.city;
    stack1 = foundHelper || depth0.city;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "city", { hash: {} }); }
    buffer += escapeExpression(stack1) + ", ";
    foundHelper = helpers.state;
    stack1 = foundHelper || depth0.state;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "state", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n		<div class=\"shelter_hours\">";
    foundHelper = helpers.hours;
    stack1 = foundHelper || depth0.hours;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "hours", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n	</div>\n	<div class=\"clear\"></div>\n	<div class=\"wide_button red_button active_opacity centered\"><a href=\"tel:";
    foundHelper = helpers.phone;
    stack1 = foundHelper || depth0.phone;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "phone", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\">";
    foundHelper = helpers.phone;
    stack1 = foundHelper || depth0.phone;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "phone", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</a></div>\n</div>";
    return buffer;});
}});

window.require.define({"views/templates/shelterForm": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"shelterForm_page\" class=\"content_wrapper palette\" style=\"padding-bottom:1px\">\n	<form>\n		<div  class=\"label\">Zipcode</div>\n		<input id=\"shelter-z\" type=\"tel\" name=\"zip\" style=\"width:100%\" />\n		<input id=\"shelter-submit\" class=\"active_opacity\" type=\"submit\" name=\"findShelter_button\" value=\"Search!\" />\n	</form>\n</div>";});
}});

window.require.define({"views/templates/shelterList": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, stack2, foundHelper, tmp1, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n				<li data-id=\"";
    foundHelper = helpers.nid;
    stack1 = foundHelper || depth0.nid;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "nid", { hash: {} }); }
    buffer += escapeExpression(stack1) + "\" class=\"pet_item\">\n	<div class=\"pet_name\">";
    foundHelper = helpers.title;
    stack1 = foundHelper || depth0.title;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "title", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n	<div class=\"item_arrow\"></div>\n</li>\n  					 ";
    return buffer;}

    buffer += "<div id=\"shelterList_page\" class=\"content_wrapper\">\n	<div class=\"shelters_header\">\n		<div class=\"shelters_near\">Animal Shelters near: ";
    foundHelper = helpers.zip;
    stack1 = foundHelper || depth0.zip;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "zip", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n		<div id=\"cancel-search\" class=\"box_button cancel_small\"></div>\n	</div>\n\n	<div id=\"shelterScroll\" class=\"scroll_wrapper scroller_down\">\n		<div id=\"scroller\">\n\n\n			<ul id=\"shelters\" class=\"border_list\">\n				";
    foundHelper = helpers.shelters;
    stack1 = foundHelper || depth0.shelters;
    stack2 = helpers.each;
    tmp1 = self.program(1, program1, data);
    tmp1.hash = {};
    tmp1.fn = tmp1;
    tmp1.inverse = self.noop;
    stack1 = stack2.call(depth0, stack1, tmp1);
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n				\n				\n			</ul>\n		</div>\n	</div>\n</div>";
    return buffer;});
}});

window.require.define({"views/templates/shelterListItem": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", helperMissing=helpers.helperMissing, undef=void 0, escapeExpression=this.escapeExpression;


    buffer += "<li class=\"pet_item\">\n	<div class=\"pet_name\">";
    foundHelper = helpers.shelter_name;
    stack1 = foundHelper || depth0.shelter_name;
    if(typeof stack1 === functionType) { stack1 = stack1.call(depth0, { hash: {} }); }
    else if(stack1=== undef) { stack1 = helperMissing.call(depth0, "shelter_name", { hash: {} }); }
    buffer += escapeExpression(stack1) + "</div>\n	<div class=\"item_arrow\"></div>\n</li>";
    return buffer;});
}});

window.require.define({"views/templates/spinner": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div class=\"spinnerModal\">\n  <div class=\"spinnerContainer\">\n		<div class=\"description\">Meow</div>\n		<div class=\"spinnerWrapper\">	\n			<div class=\"spinner\">\n		    <div class=\"bar1\"></div>\n		    <div class=\"bar2\"></div>\n		    <div class=\"bar3\"></div>\n		    <div class=\"bar4\"></div>\n		    <div class=\"bar5\"></div>\n		    <div class=\"bar6\"></div>\n		    <div class=\"bar7\"></div>\n		    <div class=\"bar8\"></div>\n		    <div class=\"bar9\"></div>\n		    <div class=\"bar10\"></div>\n		    <div class=\"bar11\"></div>\n		    <div class=\"bar12\"></div>\n		  </div>\n		</div>	\n  </div>\n</div>";});
}});

window.require.define({"views/templates/submitpet": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var foundHelper, self=this;


    return "<div id=\"submitPet_page\" class=\"content_wrapper\">\n	<!-- <div id=\"submitWrapper\" class=\"pet_scroll_wrapper scroll_wrapper\">\n	 	<div id=\"scroller\">-->\n			<div id=\"submit_pet\" class=\"palette\" style=\"margin-top:60px;margin-bottom:250px\">\n				<div id=\"pet-preview\" class=\"pet_preview\" ></div>\n				<div id=\"retake-pet\" class=\"wide_button red_button active_opacity\">Retake Pic</div>\n				<form id=\"pet-form\">\n					<div class=\"label\">Animal Name</div>\n					<input id=\"pet_name\" type=\"text\" name=\"pet_name\" />\n					<div class=\"form_friends form_friends1\">\n						<div class=\"label\">Type</div>\n						<input type=\"radio\" id=\"dog\" value=\"Dog\"><div class=\"radio_label\">Dog</div>\n						<input type=\"radio\" id=\"cat\" value=\"Cat\"><div class=\"radio_label\">Cat</div>\n						<input type=\"radio\" id=\"bird\" value=\"Bird\"><div class=\"radio_label\">Bird</div>\n						<input type=\"radio\" id=\"rabbit\" value=\"Rabbit\"><div class=\"radio_label\">Rabbit</div>\n						<div class=\"clear\"></div>\n						<select id=\"petType\" name=\"pet_type\" style=\"display:none\">\n							<option value=\"Dog\">Dog</option>\n				  		<option value=\"Cat\">Cat</option>\n				  		<option value=\"Bird\">Bird</option>\n				  		<option value=\"Rabbit\">Rabbit</option>\n						</select>\n					</div>\n					<div class=\"form_friends form_friends1\">\n						<div class=\"label\">Age</div>\n						<input type=\"text\" name=\"pet_age\" min=\"0\" max=\"100\" placeholder=\"In years\" />\n					</div>\n					\n					<div class=\"clear\"></div>\n					<div class=\"label\">Three words that describe this pet</div>\n					<div class=\"form_friends form_friends1\" style=\"height:35px\">\n						<input type=\"text\" name=\"pet_description1\" placeholder=\"Word 1\" />\n					</div>\n					<div class=\"form_friends form_friends1\" style=\"height:35px\">\n						<input type=\"text\" name=\"pet_description2\" placeholder=\"Word 2\" />\n					</div>\n					<div class=\"form_friends form_friends1\" style=\"height:35px\">\n						<input type=\"text\" name=\"pet_description3\" placeholder=\"Word 3\" />\n					</div>\n					<div class=\"clear\"></div>\n					<div class=\"label\">Shelter Name</div>\n					<input type=\"text\" name=\"shelter_name\" />\n					<div class=\"label\">Street Address</div>\n					<input type=\"text\" name=\"shelter_address\" />\n					<div class=\"label\">City</div>\n					<input type=\"text\" name=\"shelter_city\" />\n					<div class=\"form_friends form_friends2\">\n						<div class=\"label\">State</div>\n						<input type=\"text\" name=\"shelter_state\" style=\"text-transform:uppercase\" maxlength=\"2\" />\n					</div>\n					<div class=\"form_friends form_friends3\">\n						<div class=\"label\">Zip Code</div>\n						<input type=\"text\" name=\"shelter_zip\" />\n					</div>\n					<div class=\"clear\"></div>\n					\n					<input id=\"pet-submit\" type=\"submit\" name=\"submit_pet\" class=\"login_button active_opacity\" value=\"Submit\" />\n				</form>\n			</div>\n		<!--</div>\n	</div>-->\n</div>";});
}});

window.require.define({"views/view": function(exports, require, module) {
  require('lib/view_helper');

  // Base class for all views.
  module.exports = Backbone.View.extend({
    initialize: function() {
      this.render = _.bind(this.render, this);
    },

    template: function() {},
    getRenderData: function() {},

    render: function() {
      this.$el.html(this.template(this.getRenderData()));
      this.afterRender();
      return this;
    },

    afterRender: function() {}
  });
  
}});

