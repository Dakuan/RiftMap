steal("funcunit", function(){
	module("riftdata test", { 
		setup: function(){
			S.open("//riftdata/riftdata.html");
		}
	});
	
	test("Copy Test", function(){
		equals(S("h1").text(), "Welcome to JavaScriptMVC 3.2!","welcome text");
	});
})