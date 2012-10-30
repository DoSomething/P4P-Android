var View = require('./view');
var template = require('./templates/myanimals');
var MyPets = require('../models/myanimals');
var _PETSPERPAGE = 12;

module.exports = View.extend({
	id: 'myanimals-view',
	template: template,
	events:{
		"dataLoaded":"append",
		"tap .mypetitem": "renderPet"
	},

	initialize: function() {  
		
	},

	render: function() {

		this.myList = new MyPets();
		this.myList.petJSON ={};

    //this.myList.url = "http://requestb.in/zinta8zi";
		var fbId = window.localStorage.getItem("fb_id");
		var uid = window.localStorage.getItem("uid");
		
		
		this.myList.fetch({
			data: { "fbid":fbId, "uid":uid},
			processData:true,
			add:true,
			success:function(){
			   // alert("fire");
			   Application.myanimalsView.$el.trigger("dataLoaded");
				//Application.router.navigate("#page2",{trigger: true});
			}
		});

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
  },  

  enableScroll: function(){
		myScroll = new iScroll('myPetScroll', {useTransition: true});
  },

  append: function(){
  	alert("refresh fired")
  	this.myList.petJSON = this.myList.handle();
  	//this.petList.each(function(pet){console.log(pet.get("name"))});
  	//console.log(js);

  	//http://picsforpets.dev.zivtech.com/sites/default/files/styles/thumbnail_retina/public/fb_campaign/

  	this.$el.html(this.template(this.myList.petJSON));

  	this.enableScroll();

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
  }

});