//js riftdata/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('riftdata/riftmap.html', {
		markdown : ['riftmap']
	});
});