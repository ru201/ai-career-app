import React from 'react';
import '../App.css';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const SkillsChart = ({ chartData, handleSelect }) => {

    const selectLabel = (name) => {
        handleSelect(name);
    }

    return (
        <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" tick={{ fontSize: 10 }} onClick={(e) => selectLabel(e.value)} style= {{ cursor: 'pointer' }}/>
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Radar dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillsChart;
 