steal('jquery/model', 'jquery/model/list', './locale.js', function() {

		/**
	 * @class Dakuan.Models.Tweet.List
	 * @parent twitter
	 * @inherits jQuery.Model.List
	 * Wraps backend tweet services.  
	 */
	$.Model.List('Riftmap.models.locale.List', {
		//static
	}, {
		//prototype
/*
		 * empties the array
		 */
		clear: function() {

			var self = this;

			$.each(this, function( index, element ) {
				self.pop(element);
			});
		},
		toLocations: function(){
			
			var locations = this.slice(0);
			return locations.map(function(locale){
				return locale.getLocation();
			});
		},
		/*
		 * Converts the list into a Bing Maps Location Rect
		 * @return {Microsoft.Maps.LocationRect} the location rect for the list of locales
		 */
		getLocationRect: function() {

			return Microsoft.Maps.LocationRect.fromLocations(this.toLocations());
		}
	});
})