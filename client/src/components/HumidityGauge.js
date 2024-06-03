import React from 'react';
import { Gauge } from '@mui/x-charts/Gauge';

function HumidityGauge({ value }) {
  return (
      <Gauge width={100} height={100} value={value} />
  );
}

export default HumidityGauge;
