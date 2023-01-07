import { httpServer } from "./src/http_server/index.js";
import { mouse } from "@nut-tree/nut-js";
import WebSocket from "ws";

const HTTP_PORT = 8181;
const WS_PORT = 8080;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const ws = new WebSocket(`ws://localhost:${WS_PORT}`);
ws.on('open', () => {
  console.log(`[Client] Connected`);
  ws.send(`Hi from the client!`);
});

ws.on('message', (data) => {  
  console.log('Received msg from server:' + data);
});