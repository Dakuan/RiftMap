steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'riftmap/models',
	   'riftmap/models/localelabel.js' )
	.then(function($){
$.Controller('Riftmap.Controllers.Map',
{
	init : function(lakeId){
		
       	Riftmap.Models.Localelabel.findForZoomLevel(10, lakeId, this.callback(this.zoomToLocales));         	
	},
	
	zoomToLocales : function(locales){
		
		var locations = Riftmap.Models.Localelabel.localesToLocations(locales);
		
		var locationRect = Microsoft.Maps.LocationRect.fromLocations(locations);
		
		if(this.map === undefined){
 			this.createMap(locationRect);
		}
		else{
			this.map.setView({bounds : locationRect});
		}			          
	},
	
	createMap : function(bounds){
		
		this.map = new Microsoft.Maps.Map(document.getElementById("MapContainer"),
	        {
	            credentials: "AsZr5U9t2cAH1YZh8fMdisYJ3479SF2aw4MqdnC8-cK8bnHS_qpyNeAvXdXg8WID",
	            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
	            bounds: bounds,
	            showScalebar: false,
	            enableSearchLogo: false,
	            enableClickableLogo: false,
	            showMapTypeSelector: false,
	            labelOverlay: Microsoft.Maps.LabelOverlay.hidden
	        });
	        
        //attach events        
        Microsoft.Maps.Events.addHandler(this.map, 'viewchangeend', this.callback('onViewChangeEnd'));
        
        //create layers
        this.labelsLayer = new Microsoft.Maps.EntityCollection();
        
        this.map.entities.push(this.labelsLayer);
	},
	
	onViewChangeEnd : function(){
		
		Riftmap.Models.Localelabel.findForZoomLevel(this.map.getZoom(), 1, this.callback('onGetLocaleData'));
	},
	
	onGetLocaleData : function(data){
		
		this.labelsLayer.clear();
		
		var self = this;
				
		$.each(data, function(index, element){
			
			var location = element.getLocation();
			
			if(self.map.getBounds().contains(location)){
				
	        	var pin = new Microsoft.Maps.Pushpin(location, { text: element.Name, 
	        														icon: '', 
        															width: 200, 
        															height: 50, 
        															zIndex: 500,
        															typeName: "riftMapPin" , 
        															textOffset: new Microsoft.Maps.Point(0, 35) });	
		
				self.labelsLayer.push(pin);
			}
		});
		
		$('.riftMapPin').fadeIn('fast');	
	}
})
})