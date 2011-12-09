steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'riftmap/models',
	   'riftmap/models/localelabel.js' )
	.then(function($){
$.Controller('Riftmap.Controllers.Map',
{
	init : function(){
		
		this.map = new Microsoft.Maps.Map(document.getElementById("MapContainer"),
	        {
	            credentials: "AsZr5U9t2cAH1YZh8fMdisYJ3479SF2aw4MqdnC8-cK8bnHS_qpyNeAvXdXg8WID",
	            //center: mapCenter,
	            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
	            //zoom: zoomLevel,
	            showScalebar: false,
	            enableSearchLogo: false,
	            enableClickableLogo: false,
	            showMapTypeSelector: false,
	            labelOverlay: Microsoft.Maps.LabelOverlay.hidden
	        });
	        
        Microsoft.Maps.Events.addHandler(this.map, 'viewchangeend', this.callback('onViewChangeEnd'));	        	
	},
	
	onViewChangeEnd : function(){
		
		var deferred = Riftmap.Models.Localelabel.findForZoomLevel(this.map.getZoom(), 1);
	}
})
})