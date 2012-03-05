steal('funcunit').then(function(){

module("Riftmap.shell", { 
	setup: function(){
		S.open("//riftmap/shell/shell.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Riftmap.shell Demo","demo text");
});


});