steal('jquery/model', './base.js',function(){

/**
 * @class Riftmap.models.species
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend genus services.  
 */
Riftmap.models.base('Riftmap.models.species',
/* @Static */
{
	findByGenus: function( genusId ) {
	
		var url = this.basePath + 'getspeciesforgenera/' + genusId + '?callback=?';
	
		return $.ajax({
			url: url,
			type: 'get',
			dataType: 'json species.models'
		});
	}
},
/* @Prototype */
{
	
});

})