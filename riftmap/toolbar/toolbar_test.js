steal('funcunit').then(function(){

module("Riftmap.toolbar", { 
	setup: function(){
		S.open("//riftmap/toolbar/toolbar.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Riftmap.toolbar Demo","demo text");
});


});