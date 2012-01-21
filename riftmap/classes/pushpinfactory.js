steal('jquery/class', function($){
	$.Class('Riftmap.Pushpinfactory',
	{
		createPin : function(localeLabel){
   			var pin = new Microsoft.Maps.Pushpin(localeLable.getLocation(), { text: localeLabel.Name, 
	        														icon: '', 
        															width: 200, 
        															height: 50, 
        															zIndex: 500,
        															typeName: "riftMapPin" , 
        															textOffset: new Microsoft.Maps.Point(0, 35) });	
		}
	})
});