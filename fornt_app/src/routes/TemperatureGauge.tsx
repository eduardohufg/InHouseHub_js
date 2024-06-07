import React, { useState, useEffect } from 'react';
import { Gauge } from '@mui/x-charts/Gauge';
import { useTheme } from '@mui/material/styles';

interface TemperatureGaugeProps {
    temperature: number; // Asume que la temperatura se pasa como un número
  }
  
 

  const TemperatureGauge: React.FC<TemperatureGaugeProps> = ({ temperature }) => {
    const theme = useTheme();
  
    return (
      <div style={{ width: '200px', height: '200px' }}>
         <Gauge
        value={temperature}
        startAngle={-110}
        endAngle={110}
        sx={{
          '& .MuiGauge-root text': { // Aplica estilos directamente al texto dentro del componente Gauge
            fontSize: 40,
            transform: 'translate(0px, 0px)',
            fill: theme.palette.text.primary // Usando colores del tema para coherencia
          },
          '& .MuiGauge-root circle': { // Estilo para el círculo (track) del Gauge
            stroke: theme.palette.action.disabledBackground
          },
          '& .MuiGauge-root path': { // Estilo para el indicador (thumb) del Gauge
            fill: theme.palette.primary.main
          }
        }}
        text={({ value }) => `${value}°C`} // Muestra solo el valor actual
      />
    </div>
  );
};
  
  export default TemperatureGauge;