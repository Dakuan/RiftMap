steal("funcunit/qunit", "riftmap/fixtures", "riftmap/models/.js", function(){
	module("Model: Riftmap.")
	
	test("findAll", function(){
		expect(4);
		stop();
		Riftmap..findAll({}, function(s){
			ok(s)
	        ok(s.length)
	        ok(s[0].name)
	        ok(s[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Riftmap.({name: "dry cleaning", description: "take to street corner"}).save(function(){
			ok();
	        ok(.id);
	        equals(.name,"dry cleaning")
	        .destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Riftmap.({name: "cook dinner", description: "chicken"}).
	            save(function(){
	            	equals(.description,"chicken");
	        		.update({description: "steak"},function(){
	        			equals(.description,"steak");
	        			.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Riftmap.({name: "mow grass", description: "use riding mower"}).
	            destroy(function(){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})