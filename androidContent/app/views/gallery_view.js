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
