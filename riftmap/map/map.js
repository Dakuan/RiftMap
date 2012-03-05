steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Riftmap.map
 */
$.Controller('Riftmap.map',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.map = new Microsoft.Maps.Map(document.getElementById("map"), {
			credentials: "AsZr5U9t2cAH1YZh8fMdisYJ3479SF2aw4MqdnC8-cK8bnHS_qpyNeAvXdXg8WID",
			mapTypeId: Microsoft.Maps.MapTypeId.aerial,
			showScalebar: false,
			enableSearchLogo: false,
			enableClickableLogo: false,
			showMapTypeSelector: false,
			labelOverlay: Microsoft.Maps.LabelOverlay.hidden
		});
		
		window.onresize = this.callback('resize');
		
		window.onresize = this.callback('resize');
		
     	// Register and load a new module
         Microsoft.Maps.registerModule("mapLoaded", "./riftmap/map/mapLoadedModule.js");
         Microsoft.Maps.loadModule("mapLoaded", { callback: this.callback('onMapLoaded') });
		
		Riftmap.models.locale.findForZoomLevel(10, 1).done(this.callback('zoomToLocales'));
	},
	resize: function(){
		this.element.find('.MicrosoftMap').height(window.innerHeight - 120);
	},

	onMapLoaded: function(){
		
	this.resize();

		
		//attach events        
		Microsoft.Maps.Events.addHandler(this.map, 'viewchangeend', this.callback('onViewChangeEnd'));

		//create layers
		this.labelsLayer = new Microsoft.Maps.EntityCollection();

		this.fishPinLayer = new Microsoft.Maps.EntityCollection();

		this.map.entities.push(this.labelsLayer);

		this.map.entities.push(this.fishPinLayer);
	},
	'{window} onresize': function(){
		alert('bing');
	},
	
			/*
		 * Adds fish pins for the specified locales
		 * @param {Dakuan.Map.Models.Locale.List} locales The list of locales
		 */
	'{document} displaySpeciesPins': function( el, ev, locales ) {

			this.fishPinLayer.clear();

			var self = this;
			
			var localeList = new Riftmap.models.locale.List(locales);

			$.each(localeList, function( index, element ) {

				var location = element.getLocation();

				var pin = new Microsoft.Maps.Pushpin(location, {
					text: element.name,
					icon: './riftmap/assets/fishPin.png',
					width: 50,
					height: 50,
					zIndex: 999,
					typeName: "riftMapSpeciesPin id_" + element.id
				});

				self.fishPinLayer.push(pin);
			});

			this.map.setView({
				bounds: localeList.getLocationRect()
			});
		},
	
	onViewChangeEnd: function() {

		Riftmap.models.locale.findForZoomLevel(this.map.getZoom(), 1).done(this.callback('onGetLocaleData'));
	},
	
	/*
		 * Handles the arrival of locale data, clearing the old data, populating the new map pins and making styling tweaks
		 * @param {Dakuan.Map.Models.List} data The list of locales
		 */
	onGetLocaleData: function( data ) {

			this.labelsLayer.clear();

			var self = this;

			$.each(data, function( index, element ) {

				var location = element.getLocation();

				if ( self.map.getBounds().contains(location) ) {

					var pin = new Microsoft.Maps.Pushpin(location, {
						text: element.Name,
						icon: '',
						width: 100,
						height: 50,
						zIndex: 500,
						typeName: "riftMapPin id_" + element.Id,
						textOffset: new Microsoft.Maps.Point(0, 35)
					});

					Microsoft.Maps.Events.addHandler(pin, 'mouseover', function(ev){

						$('.' + ev.target._typeName.split(' ')[1]).addClass('hover');
					});
					
					pin['model'] = element;
					
					Microsoft.Maps.Events.addHandler(pin, 'mouseout', function(ev){

						$('.' + ev.target._typeName.split(' ')[1]).removeClass('hover');
					});

					self.labelsLayer.push(pin);
				}
			});

			$('[class*="riftMapPin"]').fadeIn('fast', function() {
				$('.riftMapPin').children().css('text-shadow', '0px 1px 0px #888');
				$('.riftMapPin').children().css('font-weight', 'lighter');
			});
	},
	
	/*
	 * Moves the map to view the reqested locales. If the map control does not exist, it is created.
	 * @param {Dakuan.Map.Models.Locale.List} locales The list of locales
	 */
	zoomToLocales: function( locales ) {

		var locationRect = Microsoft.Maps.LocationRect.fromLocations(locales.toLocations());

		if ( this.map === undefined ) {
			this.createMap(locationRect);
		}
		else {
			this.map.setView({
				bounds: locationRect
			});
		}
	}
})

});