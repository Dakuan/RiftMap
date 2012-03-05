steal('jquery/model', function(){

/**
 * @class Riftmap.
 * @parent index
 * @inherits jQuery.Model
 * Wraps backend  services.  
 */
$.Model('Riftmap.',
/* @Static */
{
	findAll: "/s.json",
  	findOne : "/s/{id}.json", 
  	create : "/s.json",
 	update : "/s/{id}.json",
  	destroy : "/s/{id}.json"
},
/* @Prototype */
{});

})