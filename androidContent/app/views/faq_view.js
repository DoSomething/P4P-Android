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
