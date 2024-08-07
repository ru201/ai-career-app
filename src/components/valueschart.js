import React from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import '../App.css';

const ValuesChart = ({ chartData, handleSelect }) => {
    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, name }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 10;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <g onClick={() => handleSelect(name)}>
                <text
                    x={x}
                    y={y}
                    fill="#666666"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    style={{ fontSize: '0.6em', cursor: 'pointer' }}
                >
                    {name}
                </text>
            </g>
        );
    };

    const renderCustomizedLabelLine = (props) => {
        const { cx, cy, midAngle, outerRadius } = props;
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 10;
        const ex = cx + radius * Math.cos(-midAngle * RADIAN);
        const ey = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <line
                x1={outerRadius * Math.cos(-midAngle * RADIAN) + cx}
                y1={outerRadius * Math.sin(-midAngle * RADIAN) + cy}
                x2={ex}
                y2={ey}
                stroke="#8884d8"
                strokeWidth="1"
                fill="none"
            />
        );
    };

    return (
        <div className='chart-container'>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        dataKey="score"
                        isAnimationActive={false}
                        data={chartData}
                        cx="51.5%"
                        cy="50%"
                        outerRadius="50%"
                        label={renderCustomizedLabel}
                        labelLine={renderCustomizedLabelLine}
                    >
                        {chartData.map((entry, index) => {
                            return <Cell 
                                key={`cell-${index}`} 
                                fill={entry.fill} 
                                onClick={() => handleSelect(entry.name)}
                                style={{ cursor: 'pointer' }} 
                            />
                        })}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ValuesChart;
