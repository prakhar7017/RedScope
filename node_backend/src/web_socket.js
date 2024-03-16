import { WebSocketServer } from 'ws';
import fs from 'fs-extra';
import path from "path";

const sessionMap = new Map(); // Map to store sessionId and associated URL data file path
const dataFolderName = 'data_files'; // Folder to store data files

const startWebSocketServer = () => {
  const wss = new WebSocketServer({ port: 3008 });
  wss.on('connection', (ws) => {
    console.log('WebSocket connection established.');

    ws.on('message', (message) => {
      const payload = JSON.parse(message.toString());
      processPayload(payload, ws); // Pass the WebSocket connection object
    });
  });
};

const processPayload = (payload, ws) => {
  const { sessionId, type, url, data } = payload;
  console.log("*".repeat(80));
  console.log( { sessionId, type, url, payload });
  console.log("*".repeat(80));

  if (type === 'rrweb events') {
    const jsonData = JSON.parse(data);
    let dataFilePath;

    if (sessionId) {
      dataFilePath = sessionMap.get(sessionId);
      if (!dataFilePath) {
        // If data file path doesn't exist for the sessionId, create a new file
        dataFilePath = path.join(dataFolderName, `${sessionId}_${url}.json`);
        sessionMap.set(sessionId, dataFilePath);
      }
    } else {
      console.error('No sessionId provided in payload.');
      return; // Stop processing payload if no sessionId is provided
    }

    fs.writeJsonSync(dataFilePath, jsonData, { flag: 'a' });

    // Optionally, you can send acknowledgment back to the client
    ws.send(JSON.stringify({ message: 'Data received successfully.' }));
  } else {
    console.error('Invalid payload type.');
  }
};

const fetchRrwebEvents = (sessionId, id) => {
  if (!sessionId || !sessionMap.has(sessionId)) {
    return "Invalid sessionId";
  }

  const dataFilePath = sessionMap.get(sessionId);
  const data = fs.readJsonSync(dataFilePath);
  return data;
};

export {
  startWebSocketServer,
  fetchRrwebEvents
};
