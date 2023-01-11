import { httpServer } from "./src/http_server/index.js";
import { mouse, left, right, up, down } from "@nut-tree/nut-js";
import WebSocket from "ws";
import { WebSocketServer } from "ws";
import MouseMove from './mouseMove.js';

const HTTP_PORT = 8181;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);


const PORT = +WS_PORT | 8080;

const ws = new WebSocketServer({port: PORT});


ws.on('connection', client => {
  console.log('WebSocket is running on ', `ws://localhost:${PORT}!`);
  client.on('message', (data) => {
    const command = data.toString('utf8');

    console.log('received message from server:', command);
     new MouseMove(command);
   
 
    client.send('Hello from ws!');
  });

  
});

// (async () => {
//   await mouse.move(left(500));
//   await mouse.move(up(500));
//   await mouse.move(right(500));
//   await mouse.move(down(500))
// })();