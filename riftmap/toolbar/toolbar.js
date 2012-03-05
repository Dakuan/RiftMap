steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Riftmap.toolbar
 */
$.Controller('Riftmap.toolbar',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html("//riftmap/toolbar/views/init.ejs",{});
		
		$('#genusBox').riftmap_genus_box();
		$('#speciesBox').riftmap_species_box();
		$('#localeBox').riftmap_locale_box();
	}
})

});