steal( 'jquery/controller','jquery/view/ejs' ,'riftmap/select_box')
	.then( './views/init.ejs', function($){

/**
 * @class Riftmap.LocaleBox
 */
Riftmap.SelectBox('Riftmap.LocaleBox',
/** @Static */
{
	defaults : {
		placeHolder: 'select a locale...'
	}
},
/** @Prototype */
{
	init : function(){
		this._super();
	},
	onDataRecieved: function(data){
		this.addItems(data);
		$(document).trigger('displaySpeciesPins',[data]);
	},
	'{document} speciesSelected': function(el, ev, args){
		Riftmap.models.locale.findBySpecies(args.id).done(this.callback('onDataRecieved'));
		this.showLoader();
	}
})

});