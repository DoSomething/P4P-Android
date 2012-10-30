var View = require('./view');
var template = require('./templates/about');

module.exports = View.extend({
  id: 'about-view',
  template: template,
  events: 		{"tap #faq_about":"openFAQ"},

  initialize: function() {  
	
  },

  render: function() {
  	
  	//disable taps on tab again
  	//$('#gallery_tab').unbind();
	this.$el.html(this.template(this.getRenderData()));
	this.afterRender();
  	return this;

  },
  openFAQ:function(){
		Application.router.navigate("#faq", {trigger: true});
	},
  enableScroll:function(){
  		var scroll = new iScroll('aboutScroll');
  },

  afterRender: function() {
	
	//this.enableScroll();
	
	}

});
