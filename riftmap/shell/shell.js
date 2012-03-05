steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Riftmap.shell
 */
$.Controller('Riftmap.shell',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html("//riftmap/shell/views/init.ejs",{});
		
		$('#header').riftmap_header();
		
		$('#map').riftmap_map();
		
		$('#toolbar').riftmap_toolbar();
	}
})

});