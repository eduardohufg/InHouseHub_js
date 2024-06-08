import React from 'react';
import { Gauge } from '@mui/x-charts/Gauge';
import { useTheme } from '@mui/material/styles';

interface HumidityGaugeProps {
    humidity: number;
    }

const HumidityGauge: React.FC<HumidityGaugeProps> = ({ humidity }) => {
    const theme = useTheme();

    return (
        <div style={{ width: '180px', height: '140px' }}>
            <Gauge
                value={humidity}
                startAngle={-110}
                endAngle={110}
                sx={{
                    '& .MuiGauge-root text': {
                        fontSize: 40,
                        transform: 'translate(0px, 0px)',
                        fill: theme.palette.text.primary
                    },
                    '& .MuiGauge-root circle': {
                        stroke: theme.palette.action.disabledBackground
                    },
                    '& .MuiGauge-root path': {
                        fill: theme.palette.primary.main
                    }
                }}
                text={({ value }) => `${value}%`}
            />
        </div>
    );
}

export default HumidityGauge;