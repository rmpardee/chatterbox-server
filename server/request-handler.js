/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

// var index = fs.readFileSync('./client/index.html');  //  

// var http = require("http");
// var sys = require('sys');
// var path = require('path');
// var url = require('url');
// var fs = require('fs'); 

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);

  // The outgoing status.
  var statusCodePass = 200;
  var statusCodeCreated = 201;
  var statusCodeFail = 404;
  var statusCode500 = 500;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = "text/plain";
  headers['Content-Type'] = "text/plain";

   var obj = {
    // "Hello World":"hello",
    "results": []
  };

  // Check if request.method = 'GET'
  if (request.method === 'GET') {
    // response.writeHead - statusCodePass
    response.writeHead(statusCodePass, headers);
    response.end(JSON.stringify(obj));
  } else if (request.method === 'POST') {
    // response.writeHead - statusCodePass
    response.writeHead(statusCodeCreated, headers);
    response.end(JSON.stringify(obj));
  }
    // response.end

  // else check if request.method = 'POST'

    // response.writeHead - statusCodeCreated
    // response.end

  // NOTE: Once this is properly talking to our app we'll likely have to change this to
  // the below:
  // headers['Content-Type'] = "application/json"; 

  // var my_path = url.parse(request.url).pathname;
  // var full_path = path.join(process.cwd(), my_path);
  // // console.log("path", path);
  // fs.stat(full_path, function(exist){
  //   if (!exist) {
  //     response.writeHead(statusCodeFail, headers);
  //     response.end("404 Not Found");
  //   } else {
  //     fs.readFile(full_path, "binary", function(err, file) {
  //       if (err) {
  //         response.writeHead(statusCode500, headers);
  //         response.end(err);
  //       } else {
  //         response.writeHead(statusCodePass, headers);
  //         // Option 1
  //         response.write(file, "Hello World");
  //         response.end();
  //         // Option 2
  //         // response.end(file, "Hello World");
  //         // Option 3
  //         // response.end("Hello World");
  //       }
  //     });
  //   }
  // });

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // response.writeHead(statusCodePass, headers);

 

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  // response.end(JSON.stringify(obj));
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.end(index); 
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve your chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.handleRequest = requestHandler;   //
