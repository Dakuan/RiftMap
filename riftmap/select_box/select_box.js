steal( 'jquery/controller','jquery/model', 'jquery/view/ejs', 'riftmap/plugin/tinyScroll/tinyScroll.js' )
	.then( './views/init.ejs', function($){

/**
 * @class Riftmap.SelectBox
 */
$.Controller('Riftmap.SelectBox',
/** @Static */
{
	defaults : {
		text: "name",
		placeHolder: 'select an item...',
		enabled: false,
		maxHeight: 200,
		isiPad: navigator.userAgent.match(/iPad/i) != null
	}
},
/** @Prototype */
{
	init : function(){
		this.reset();	
		this.list = this.element.find('.itemList');
		this.selectedItem = this.element.find('.selectedItem');
	},
	addItems: function(items){
		this.hideLoader();
		this.list.html($.View('//riftmap/select_box/views/items',{items:items, text: this.options.text}));
		this.setHeight(items.length);
		if(!this.options.isiPad){
			this.list.tinyscrollbar();
		}
		else{
			this.list.css('overflow-y', 'scroll')
		}
		this.options.enabled = true;	
		this.selectedItem.removeClass('disabled');
		this.selectedItem.find('span[class=text]').html(this.options.placeHolder);
	},
	setHeight: function(count){
		var potential = count * 20;
		if(potential < this.options.maxHeight){
			this.list.css('height', potential + 'px');
		}
		else{
			this.list.css('height', this.options.maxHeight + 'px');
		}
	},
	hide: function(){
		this.selectedItem.removeClass('selected');
		this.extended = false;
		var self = this;
		this.list.slideUp('slow', this.callback('onHide'));
	},
	onHide: function(){
		this.list.find('.item').removeClass('clicked');
	},
	show: function(){
		$(document).trigger('selectBoxOpening', this);
		this.selectedItem.addClass('selected');
		this.extended = true;
		var self = this;
		this.list.slideDown('slow', function(){
			if(!self.options.isiPad){
				self.list.tinyscrollbar_update();
			}
			$('.scrollbar').fadeIn();
		});
	},
	reset: function(){
		this.element.html("//riftmap/select_box/views/init.ejs",{text: this.options.placeHolder});
	},
	showLoader: function(){		
		this.element.find('.loader').fadeIn('100');
	},
	hideLoader: function(){
		this.element.find('.loader').fadeOut('100');
	},
	'{document} selectBoxOpening': function(el, ev, args){
		if(args !== this){
			steal.dev.log(this.options.placeholder);
			this.hide();
		}
	},
	'.item click': function(el){
		this.selectedModel = el.model();
		this.selectedItem.find('span[class=text]').html(this.selectedModel[this.options.text]);
		this.list.trigger('itemSelected', this.selectedModel);
		this.hide();
		el.addClass('clicked');
	},
	'.selectedItem click':function(){
		if(this.options.enabled){
			if(this.extended){
				this.hide();
			}
			else{
				this.show();
			}
		}
	}
})
});