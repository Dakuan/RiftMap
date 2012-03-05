steal('funcunit').then(function(){

module("Riftmap.SpeciesBox", { 
	setup: function(){
		S.open("//riftmap/species_box/species_box.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Riftmap.SpeciesBox Demo","demo text");
});


});