steal('jquery/model', function(){

/**
 * @class Riftmap.Models.Shell
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend shell services.  
 */
$.Model('Riftmap.Models.Localelabel',
/* @Static */
{
	findAll: "/shells.json",
	findForZoomLevel: function(localeId, lakeId){ 		
		
		var url = "http://riftdata.apphb.com/Locale/GetLocalesForZoomLevel/" + localeId + "?lakeId=" + lakeId + "&callback=?";
		
		steal.dev.log(url);
		
		var deferred = $.getJSON(url, function(){
			steal.dev.log('no feckin way')
		});	
		
		deferred.fail(function(data){
			steal.dev.log('deep meh');
			steal.dev.log(data);
		})
		
		deferred.done(function(){
			steal.dev.log('woop');
		})
	},
  	findOne : "/shells/{id}.json", 
  	create : "/shells.json",
 	update : "/shells/{id}.json",
  	destroy : "/shells/{id}.json"
},
/* @Prototype */
{});

})