// load('riftmap/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("riftmap/riftmap.html","riftmap/out")
});
