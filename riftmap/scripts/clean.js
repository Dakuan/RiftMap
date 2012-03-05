//steal/js riftmap/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/clean',function(){
	steal.clean('riftmap/riftmap.html',{indent_size: 1, indent_char: '\t'});
});
