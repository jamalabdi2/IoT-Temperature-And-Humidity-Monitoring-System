import React, { useEffect, useState } from 'react';
import './App.css';
import LineCharts from './components/LineCharts';
import TemperatureGauge from './components/TemperatureGauge';
import HumidityGauge from './components/HumidityGauge';

function App() {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5001');

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setTemperatureData((prevData) => [...prevData, { timestamp: newData.timestamp, value: newData.temperature }]);
      setHumidityData((prevData) => [...prevData, { timestamp: newData.timestamp, value: newData.humidity }]);
      console.log(newData)
    };

    return () => {
      // Close the WebSocket connection if it's open
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
        console.log('WebSocket connection closed');
      }
    };
  }, []); // Empty dependency array to run only once   
  console.log()

  return (
    <div className="container">
      <header>
        <h1>Sensor Data Dashboard</h1>
      </header>
      <div className="sensor-data">
        <div className="sensor-data-item">
          <h2>Timestamp</h2>
          <p>{temperatureData.length > 0 && temperatureData[temperatureData.length - 1].timestamp}</p>
        </div>
        <div className="sensor-data-item">
          <h2>Temperature</h2>
          <p>{temperatureData.length > 0 && temperatureData[temperatureData.length - 1].value} °C</p>
          {temperatureData.length > 0 && typeof temperatureData[temperatureData.length - 1].value === 'number' && (
        <TemperatureGauge value={temperatureData[temperatureData.length - 1].value} />
      )}
        </div>
        <div className="sensor-data-item">
          <h2>Humidity</h2>
          <p>{humidityData.length > 0 && humidityData[humidityData.length - 1].value} %</p>
          {humidityData.length > 0 && typeof humidityData[humidityData.length - 1].value === 'number' && (
        <HumidityGauge value={humidityData[humidityData.length - 1].value} />
      )}
        </div>
      </div>
      <div className="charts">
        <LineCharts data={temperatureData} label="Temperature" />
        <LineCharts data={humidityData} label="Humidity" />
      </div>
    </div>
  );
}

export default App;
