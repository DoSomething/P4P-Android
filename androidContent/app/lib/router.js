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
