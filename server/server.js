const express = require('express');
const cors = require('cors');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const WebSocket = require('ws');
const moment = require('moment')

const app = express();
const port = 5003;

app.use(express.json());
app.use(cors());

let serialPort;
let wss;

// Function to open the serial port
function openSerialPort() {
  serialPort = new SerialPort({path:'/dev/tty.usbserial-140', baudRate: 9600 }, (err) => {
    if (err) {
      console.error('Error opening serial port:', err.message);
      if (err.message.includes('Resource busy')) {
        console.log('Retrying in 5 seconds...');
        setTimeout(openSerialPort, 5000); 
      }
      return;
    }
    const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\n' }));
    setupParser(parser);
  });

  serialPort.on('close', () => {
    console.log('Serial port closed. Attempting to reopen...');
    setTimeout(openSerialPort, 5000); // Retry after 5 seconds if the port is closed
  });
}

// Function to setup parser
function setupParser(parser) {
  parser.on('data', (line) => {
    console.log(`Received: ${line}`);
    // Extract temperature and humidity values using regular expressions
    const temperatureMatch = line.match(/Temperature: (\d+\.\d+)/);
    const humidityMatch = line.match(/Humidity: (\d+\.\d+)/);
    
    // Check if both temperature and humidity values are found
    if (temperatureMatch && humidityMatch) {
      const temperature = parseFloat(temperatureMatch[1]);
      const humidity = parseFloat(humidityMatch[1]);
      
      const formattedDate = moment().format('DD/MM/YYYY hh:mm:ss A');
      // Construct sensor data object
      const sensorData = {
        timestamp:formattedDate,
        temperature,
        humidity
      };
      
      // Broadcast data to WebSocket clients
      broadcastData(JSON.stringify(sensorData));
    }
  });
}

// Function to broadcast data to all WebSocket clients
function broadcastData(data) {
  console.log('Data sent to the client: ', data);
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// WebSocket setup
wss = new WebSocket.Server({ port: 5001 }, () => {
  console.log('WebSocket server is running on ws://localhost:5001');
});

wss.on('connection', (ws) => {
  console.log('Client connected');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  openSerialPort(); 
});
