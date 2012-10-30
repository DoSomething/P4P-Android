// Base class for all collections.
var Pet = require('./pet');

module.exports = Backbone.Collection.extend({
	
	model: Pet,
	url: 'http://www.dosomething.org/services/pets/my-animals/retrieve.json',
	handle: function(){

		return {"pets": this.toJSON()};

	},
	parse: function(response){
		response.thumbnail = response.UserId;
		response.forEach(function(a){
			var len = a.image.length ; 
			var baseUrl="http://files.dosomething.org/files/styles/";
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
			
		});

		return response;
	}
	
});
