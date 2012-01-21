steal(
	'./riftmap.css', 			// application CSS file
	'./models/models.js',		// steals all your models	// sets up fixtures for your models
	'./controllers/shell_controller.js',
	'./controllers/map_controller.js',
	function(){	
		// configure your application
		$(document).ready(function(){
			$('#AppShell').riftmap_shell();
		});
	})