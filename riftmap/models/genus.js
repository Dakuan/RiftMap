steal('jquery/model', './base.js',function(){

/**
 * @class Riftmap.models.genus
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend genus services.  
 */
Riftmap.models.base('Riftmap.models.genus',
/* @Static */
{
	findByLake: function(lakeId){
		
		var url = this.basePath + 'getgeneraforlake/' + lakeId + '?callback=?';
		
		return $.ajax({
			url: url,
			type: 'get',
			dataType: 'json genus.models'
		});
	}
},
/* @Prototype */
{

});

})