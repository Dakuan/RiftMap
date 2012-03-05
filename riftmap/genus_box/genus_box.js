steal( 'jquery/controller','jquery/view/ejs','riftmap/select_box' )
	.then( './views/init.ejs', function($){

/**
 * @class Riftmap.genusBox
 */
Riftmap.SelectBox('Riftmap.GenusBox',
/** @Static */
{
	defaults : {
		placeHolder: 'select a genus...'
	}
},
/** @Prototype */
{
	init : function(){
		this._super();
		Riftmap.models.genus.findByLake(1).done(this.callback('onDataRecieved'));
		this.showLoader();
	},
	onDataRecieved: function(data){
		this.addItems(data);
	},
	'{document} gettingGenera': function(){

	},
	'.itemList itemSelected': function(el, ev, args){
		$(document).trigger('genusSelected', args);
		$.route.attr('selectedGenus', args.id)
	}	
})
});