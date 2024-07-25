import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const CustomYAxisTick = ({ x, y, payload, handleSelect }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        y={3} 
        textAnchor="end" 
        fill="#666" 
        fontSize={10.5}
      >
        <tspan 
          onClick={() => handleSelect(payload.value)} 
          style={{ cursor: 'pointer' }}
        >
          {payload.value}
        </tspan>
      </text>
    </g>
  );
};

const HorizontalBarChart = ({ chartData, handleSelect }) => {
  return (
    <div className='chart-container'>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 20
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" tick={{ fontSize: 12 }} />
          <YAxis 
            dataKey="name" 
            type="category" 
            tick={({ x, y, payload }) => 
              <CustomYAxisTick x={x} y={y} payload={payload} handleSelect={handleSelect} />
            }
            interval={0}
          />
          <Tooltip />
          <Bar 
            dataKey="score" 
            fill={`rgba(118, 205, 38, 0.6)`} 
            background={{ fill: 'rgba(0,0,0,0.1)' }} 
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                onClick={() => handleSelect(entry.name)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HorizontalBarChart;
