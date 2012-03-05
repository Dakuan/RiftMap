steal('funcunit').then(function(){

module("Riftmap.LocaleBox", { 
	setup: function(){
		S.open("//riftmap/locale_box/locale_box.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Riftmap.LocaleBox Demo","demo text");
});


});