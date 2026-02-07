import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

function Charts({ projects }) {
  // Prepare data for budget chart
  const budgetData = projects.map(project => ({
    name: project.name.split(' ').slice(0, 2).join(' '),
    budget: project.budget / 1000000,
    spent: project.spent / 1000000,
  }));

  // Prepare data for progress chart
  const progressData = projects.map(project => ({
    name: project.name.split(' ').slice(0, 2).join(' '),
    progress: project.progress,
  }));

  // Prepare data for status pie chart
  const statusCounts = projects.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  const COLORS = ['#48bb78', '#f56565', '#f6ad55', '#4299e1'];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        style={{ fontSize: '14px', fontWeight: 'bold' }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
      {/* Budget vs Spent Chart */}
      <div>
        <h3 style={{ marginBottom: '15px', color: '#2d3748', fontSize: '16px' }}>Budget vs Spent (in Millions)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={budgetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" style={{ fontSize: '12px' }} />
            <YAxis style={{ fontSize: '12px' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="#667eea" name="Budget" />
            <Bar dataKey="spent" fill="#764ba2" name="Spent" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Chart */}
      <div>
        <h3 style={{ marginBottom: '15px', color: '#2d3748', fontSize: '16px' }}>Project Progress (%)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" style={{ fontSize: '12px' }} />
            <YAxis domain={[0, 100]} style={{ fontSize: '12px' }} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="progress" 
              stroke="#48bb78" 
              strokeWidth={3}
              name="Progress"
              dot={{ fill: '#48bb78', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Status Distribution */}
      <div>
        <h3 style={{ marginBottom: '15px', color: '#2d3748', fontSize: '16px' }}>Project Status Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Workers Distribution */}
      <div>
        <h3 style={{ marginBottom: '15px', color: '#2d3748', fontSize: '16px' }}>Workers per Project</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart 
            data={projects.map(p => ({ 
              name: p.name.split(' ').slice(0, 2).join(' '), 
              workers: p.workers 
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" style={{ fontSize: '12px' }} />
            <YAxis style={{ fontSize: '12px' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="workers" fill="#4299e1" name="Workers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
