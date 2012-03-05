steal("funcunit/qunit", "riftmap/fixtures", "riftmap/models/genus.js", function(){
	module("Model: Riftmap.models.genus")
	
	test("findAll", function(){
		expect(4);
		stop();
		Riftmap.models.genus.findAll({}, function(genus){
			ok(genus)
	        ok(genus.length)
	        ok(genus[0].name)
	        ok(genus[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Riftmap.models.genus({name: "dry cleaning", description: "take to street corner"}).save(function(genus){
			ok(genus);
	        ok(genus.id);
	        equals(genus.name,"dry cleaning")
	        genus.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Riftmap.models.genus({name: "cook dinner", description: "chicken"}).
	            save(function(genus){
	            	equals(genus.description,"chicken");
	        		genus.update({description: "steak"},function(genus){
	        			equals(genus.description,"steak");
	        			genus.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Riftmap.models.genus({name: "mow grass", description: "use riding mower"}).
	            destroy(function(genus){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})