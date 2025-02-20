/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var fs = require('fs');

module.exports.requestHandler = function(request, response) {
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
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var splitURL = request.url.split('?');
  request.url = splitURL[0]
  // The outgoing status.
  var statusCode = 200;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;

  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = 'application/json';


    
   
  
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  
  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.

  var result = 'Hello, World!'
  
  var body = "";
  
  if(request.method === 'OPTION') {
    response.writeHead(statusCode, headers);
    response.end();
  }else

  
  
  if(request.url.includes('/classes/messages')){
    var {readData, writeData} = require('./data')
    
    if(request.method==='GET'){
      result = {results: readData()}
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify(result));

    }
    




    if(request.method==='POST'){

      request.on('data', (chunk) => {
        
        body+=chunk
      }).on('end', () => { 

        var newMessage = JSON.parse(body)
        var {hasher} = require('./hasher')
        newMessage.objectId = hasher(newMessage.text);
        writeData(newMessage);
        statusCode = 201;
        response.writeHead(statusCode, headers);
        
        // console.log(newMessage)
        response.end(JSON.stringify([newMessage]));

        //body = Buffer.concat(body)
        // at this point, `body` has the entire request body stored in it as a string
      });
      
      }
      
      
  } else   {
    var url = request.url === '/' ? '/client/index.html': request.url;
 console.log(url)
    fs.readFile('.'+url ,(err, data)=>{
      if(err) {
          response.writeHead(404,headers);
          response.end( );
      }
      headers['Content-Type'] = 'text/html';
      if(url.slice(-3)==="css")
        headers['Content-Type'] = 'text/css';
      if(url.slice(-2)=='js')
        headers['Content-Type'] = 'text/javascript';
      console.log(data)
      response.writeHead(200, headers)
      response.end(data)
      
    }) 


  }
  
  
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
