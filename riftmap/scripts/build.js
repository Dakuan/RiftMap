//steal/js riftmap/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('riftmap/scripts/build.html',{to: 'riftmap'});
});
