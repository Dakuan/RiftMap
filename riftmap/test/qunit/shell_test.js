steal("funcunit/qunit", "riftmap/fixtures", "riftmap/models/shell.js", function(){
	module("Model: Riftmap.Models.Shell")
	
	test("findAll", function(){
		expect(4);
		stop();
		Riftmap.Models.Shell.findAll({}, function(shells){
			ok(shells)
	        ok(shells.length)
	        ok(shells[0].name)
	        ok(shells[0].description)
			start();
		});
		
	})
	
	test("create", function(){
		expect(3)
		stop();
		new Riftmap.Models.Shell({name: "dry cleaning", description: "take to street corner"}).save(function(shell){
			ok(shell);
	        ok(shell.id);
	        equals(shell.name,"dry cleaning")
	        shell.destroy()
			start();
		})
	})
	test("update" , function(){
		expect(2);
		stop();
		new Riftmap.Models.Shell({name: "cook dinner", description: "chicken"}).
	            save(function(shell){
	            	equals(shell.description,"chicken");
	        		shell.update({description: "steak"},function(shell){
	        			equals(shell.description,"steak");
	        			shell.destroy();
						start();
	        		})
	            })
	
	});
	test("destroy", function(){
		expect(1);
		stop();
		new Riftmap.Models.Shell({name: "mow grass", description: "use riding mower"}).
	            destroy(function(shell){
	            	ok( true ,"Destroy called" )
					start();
	            })
	})
})