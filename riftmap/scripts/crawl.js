// load('riftdata/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("riftdata/riftdata.html","riftdata/out")
});
