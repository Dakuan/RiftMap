//js riftdata/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('riftdata/riftdata.html', {
		markdown : ['riftdata']
	});
});