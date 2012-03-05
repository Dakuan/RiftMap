steal('funcunit').then(function(){

	module("Riftmap.SelectBox", { 
		setup: function(){
			S.open("//riftmap/select_box/select_box.html");
		}
	});
	
	test("Select box gets populated", function(){
		ok(S('.overview').children(':first').exists(),'item list is not empty'); 
	});
	
	test("items list extends on click", function(){
		S('.selectedItem').click();
		ok(S('.itemList').height(function(value){
			return value > 0;
		}), "has height");
	});
	
	test("selected item box changes on item selected", function(){
		S('.selectedItem').click();
		var item = S('.item:first');
		item.click(function(){
				var expected= item.html().trim();
				var actual = S('.selectedItem').html().trim();
				equal(actual, expected, 'item text matches');
				ok(S('.itemList').height(function(value){
						return value === 0;
				}),"list hides on select");
			});
	});
});