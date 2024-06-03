# IoT-Based Smart Weather Monitoring System

## Overview
The IoT-Based Smart Weather Monitoring System is designed to continuously monitor and display real-time temperature and humidity data. 
The system uses a combination of hardware (DHT11 sensor and Arduino Uno) and software (Node.js server and React frontend) to provide a comprehensive solution for weather monitoring.

## Features
- **Real-time Monitoring:** Continuously monitors temperature and humidity.
- **Data Visualization:** Displays real-time data using gauges and line charts.
- **WebSocket Communication:** Ensures instant data updates.
Dashboard:
![dashboard](https://github.com/jamalabdi2/IoT-Temperature-And-Humidity-Monitoring-System/assets/113813239/718e58dc-8638-493c-9e80-94953dd7c56f)

Temperature and humidity real time chart
![charts](https://github.com/jamalabdi2/IoT-Temperature-And-Humidity-Monitoring-System/assets/113813239/d1943ac3-94e0-4f08-97bd-44adfe54b20a)

## Technologies Used
### Backend
- Node.js: Server environment.
- Express: Web framework for Node.js.
- SerialPort: Library for reading from and writing to serial ports.
- WebSocket: Enables real-time communication between the server and clients.
- Moment.js: Library for parsing, validating, manipulating, and formatting dates.

### Frontend
- React: JavaScript library for building user interfaces.
- Chart.js: JavaScript library for data visualization.
- @mui/x-charts: Material-UI's charts library.
- WebSocket: For real-time data updates.

### Hardware
- Arduino
- DHT11 Sensor
- Connecting wires
- BreadBoard

## Setup and Installation
### Prerequisites
- Node.js and npm installed.
- React installed.
- Arduino Uno with temperature and humidity sensors connected to a serial port.

### Backend Setup
1. Clone the repository:
   ```bash
   git clone git@github.com:jamalabdi2/IoT-Temperature-And-Humidity-Monitoring-System.git

2. Navigate to the server directory and install dependencies:
    ``` bash
    cd server
    npm install
      
2. Navigate to the server directory and install dependencies:
    ``` bash
    cd server
    npm install
2. Navigate to the server directory and install dependencies:
    ``` bash
    cd server
    npm install
2. Navigate to the server directory and install dependencies:
    ``` bash
    cd server
    npm install

3. Start the Node.js server:
   ``` bash
     npm run dev





### Frontend Setup
1. Navigate to the client directory and install dependencies:

   ```bash
   cd client
   npm install

2. Start the React application:
    ``` bash
    npm start

### Usage
  - Ensure your hardware (microcontroller with sensors) is connected and configured correctly.
  - Start the backend and frontend servers.
  - Open the frontend application in your browser (usually at http://localhost:3000).
  - The dashboard will display real-time temperature and humidity data, along with historical data in line charts.
