steal('funcunit').then(function(){

module("Riftmap.map", { 
	setup: function(){
		S.open("//riftmap/map/map.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Riftmap.map Demo","demo text");
});


});