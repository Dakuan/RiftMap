steal('funcunit').then(function(){

module("Riftmap.genusBox", { 
	setup: function(){
		S.open("//riftmap/genus_box/genus_box.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Riftmap.genusBox Demo","demo text");
});


});