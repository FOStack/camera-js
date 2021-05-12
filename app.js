const http = require('http');
import * as camera from './camera.js';

http.createServer(onRequest).listen(8000);
console.log('Server has started');

function onRequest(request, response){
    response.writeHead(200);
    camera.start();
  response.end();
}