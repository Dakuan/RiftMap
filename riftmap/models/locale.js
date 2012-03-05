steal('jquery/model', './base.js',function(){

/**
 * @class Riftmap.models.species
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend genus services.  
 */
Riftmap.models.base('Riftmap.models.locale',
/* @Static */
{
	/*
	 * Finds the locales that have fish living there of the specified species
	 * @param {Int} speciesId the speciesId
	 * @return {Dakuan.Map.Models.Locale.List} the list of locales
	 */
	findBySpecies: function( speciesId ) {

		var url = this.basePath + 'GetLocalesForSpecies/' + speciesId + '?callback=?';

		return $.ajax({
			url: url,
			type: 'get',
			dataType: 'json locale.models'
		});
	},
	findForZoomLevel: function( zoomLevel, lakeId) {

		var url = "http://riftdata.apphb.com/Service" + "/GetLocalesForZoomLevel/" + zoomLevel + "?lakeId=" + lakeId + "&callback=?";

		return $.ajax({
			url: url,
			type: 'get',
			dataType: 'json locale.models'
		});
	}
},
/* @Prototype */
{
	/*
	 * Converts the Locale model into a bing maps location
	 * @return {Microsoft.Maps.Location} The bing maps location for this locale
	 */
	getLocation: function() {
		if(this.lat === undefined){
			return new Microsoft.Maps.Location(this.Latitude, this.Longitude);
		}
		else{
			return new Microsoft.Maps.Location(this.lat, this.lng);
		}

	}
});

})