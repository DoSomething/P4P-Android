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

		window.plugins.facebookConnect.login({permissions: ["email", "user_about_me","publish_stream"], appId: "105775762330"},  
			function(result) {
				window.plugins.facebookConnect.dialog('feed', dialogOptions, function(response) {
					Application.petDetail.registerShareDos();
				});
			}
		);

	},
	registerShareDos:function(){
		var data = {
			"pet_id":this.item.sid, "fb_id":window.localStorage.getItem("fb_id")
		};
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