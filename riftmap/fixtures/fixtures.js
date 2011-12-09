// map fixtures for this application

steal("jquery/dom/fixture", function(){
	
	$.fixture.make("shell", 5, function(i, shell){
		var descriptions = ["grill fish", "make ice", "cut onions"]
		return {
			name: "shell "+i,
			description: $.fixture.rand( descriptions , 1)[0]
		}
	})
})