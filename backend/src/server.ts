import { WebSocketServer } from "ws";
import * as dotenv from 'dotenv'; 
dotenv.config();

const PORT = +process.env.PORT | 8080;

const ws = new WebSocketServer({port: PORT});
console.log('Server is running on ', `ws://localhost:${PORT}`);

ws.on('connection', client => {
 // console.log('Server is running on ', `ws://localhost:${PORT}`);
  client.on('message', (data) => {  
    console.log('received message from client:', data.toString('utf8'));
    
  });

  client.send('Hello from server ws!');
});
