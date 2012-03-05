steal( 'jquery/controller','jquery/view/ejs','riftmap/select_box'  )
	.then( './views/init.ejs', function($){

/**
 * @class Riftmap.SpeciesBox
 */
Riftmap.SelectBox('Riftmap.SpeciesBox',
/** @Static */
{
	defaults : {
		placeHolder: 'select a species...'
	}
},
/** @Prototype */
{
	init : function(){
		this._super();
	},
	'{document} genusSelected' : function(el, ev, args){
		Riftmap.models.species.findByGenus(args.id).done(this.callback('onDataRecieved'));
		this.showLoader();
	},
	onDataRecieved: function(data){
		this.addItems(data);
	},
	'.itemList itemSelected': function(el, ev, args){
		$(document).trigger('speciesSelected', args);
		$.route.attr('selectedSpecies', args.id)
	}	
})

});