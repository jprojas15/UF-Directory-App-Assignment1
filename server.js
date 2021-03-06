var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

    HINT: explore the request object and its properties 
    http://stackoverflow.com/questions/17251553/nodejs-request-object-documentation
   */
  if (request.method == 'GET' && parsedUrl.path == "/listings") {
    response.writeHead(200, {
      'Content-Type': 'application/json'});
    console.log(listingData);
    response.end(listingData);
  } else {
    response.writeHead(404, {
      'Content-Type': 'application/json'});
    response.end('Bad gateway error');
  };
};

fs.readFile('listings.json','utf8',function(err, data) {
  /*
    This callback function should save the data in the listingData variable, 
    then start the server. 
   */
   listingData=data;
   server = http.createServer(requestHandler);
   server.listen(port,function() {
    console.log('server started!');
   });
});
