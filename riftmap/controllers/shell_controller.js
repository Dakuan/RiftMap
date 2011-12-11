steal( 'jquery/controller',
       'jquery/view/ejs',
	   'jquery/dom/form_params',
	   'jquery/controller/view',
	   'riftmap/models' )
	.then('riftmap/views/map/mapcontainer.ejs', function($){

/**
 * @class riftmap.Shell.Create
 * @parent index
 * @inherits jQuery.Controller
 * Creates shells
 */
$.Controller('Riftmap.Controllers.Shell',
/** @Prototype */
{
	init : function(){
		
		var mapContainer = this.view('map/mapcontainer');
		
		//insert div for map control
		this.element.html(mapContainer);
		
		//attach the map
		$(mapContainer).riftmap_map(1);
	}
})
})