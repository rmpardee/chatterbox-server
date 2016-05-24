/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/


var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  // 
  var method = request.method;
  //
  var url = request.url;
  // Array container to collect chunks
  var body = [];

  
  // The stream starts with a 'data' event. When we hear it run anon func.
  request.on('data', function(chunk) {
    console.log("chunk", chunk);

    // INVESTIGATE THIS LINE FOR GOOD STUFF - DON"T USE FS, eva
    // fs.readFile(chunk, 'utf8', function(err, data){
    //   console.log("data", data);
    // });

    // Add each chunk to our array container
    body.push(chunk);
  // When stream finishes it will emit an end event
  }).on('end', function() {
    // Concatenate and stringify together all of the chunks we've collected
    body = Buffer.concat(body).toString();
  });

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + method + " for url " + url);

  // The outgoing status options:
  var statusCodePass = 200;
  var statusCodeCreated = 201;
  var statusCodeFail = 404;
  var statusCode500 = 500;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = "text/plain";

  // NOTE: Once this is properly talking to our app we'll likely have to change this to
  // the below:
  headers['Content-Type'] = "application/json"; 

  var responseBody = {
    headers: headers,
    method: method,
    url: url,
    body: body,
    results: []
  };
  // console.log("---------------");
  // console.log("responseBody", responseBody);
  // console.log("body", body);
  // save the object to return(right word?) (we'll stringify it first)
  //  var obj = {
  //   // "Hello World":"hello",
  //   "results": []
  // };


  // Check if it's a GET request
  if (request.method === 'GET') {
    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.

    // If so, have it send the 'pass' HTTP code (200) and end() the stringified object
    response.writeHead(statusCodePass, headers);

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
    // response.end(JSON.stringify(obj));
    response.end(JSON.stringify(responseBody));
  }
  // Check if it's a GET request
  // else if (request.method === 'POST') {
  else if (method === 'POST') {
    console.log("testing");
    // console.log("request.json", request.json);
    // request.json = object with username and message being posted
    // obj.results.push(request.json);
    // responseBody.results.push(request.json);

    // If so, have it send the 'created' HTTP code (201) and end() the stringified object
    response.writeHead(statusCodeCreated, headers);
    // response.end(JSON.stringify(obj));
    response.end(JSON.stringify(responseBody));
  }

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

// Make the requestHandler function available in other node files by exporting it
exports.handleRequest = requestHandler;




