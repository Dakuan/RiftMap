steal( 'jquery/controller','jquery/view/ejs' )
	.then( './views/init.ejs', function($){

/**
 * @class Riftmap.header
 */
$.Controller('Riftmap.header',
/** @Static */
{
	defaults : {}
},
/** @Prototype */
{
	init : function(){
		this.element.html("//riftmap/header/views/init.ejs",{});
	}
})

});