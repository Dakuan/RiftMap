steal('funcunit').then(function(){

module("Riftmap.header", { 
	setup: function(){
		S.open("//riftmap/header/header.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Riftmap.header Demo","demo text");
});


});