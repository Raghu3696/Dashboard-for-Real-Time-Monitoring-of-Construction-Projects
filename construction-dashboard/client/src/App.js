import React, { useState, useEffect } from 'react';
import './App.css';
import ProjectCard from './components/ProjectCard';
import MetricCard from './components/MetricCard';
import ActivityFeed from './components/ActivityFeed';
import Charts from './components/Charts';

function App() {
  const [projects, setProjects] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [activities, setActivities] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Fetch initial data
    fetchProjects();
    fetchMetrics();
    fetchActivities();

    // Setup WebSocket connection for real-time updates
    const ws = new WebSocket('ws://localhost:5000');

    ws.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      
      if (message.type === 'initial' || message.type === 'update') {
        setProjects(message.data.projects);
        setMetrics(message.data.metrics);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      ws.close();
    };
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await fetch('/api/metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const response = await fetch('/api/activities');
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>
          <span className="header-icon">🏗️</span>
          Construction Dashboard
        </h1>
        <div className="live-indicator">
          <div className="pulse"></div>
          {isConnected ? 'Live' : 'Connecting...'}
        </div>
      </header>

      {metrics && (
        <div className="metrics-grid">
          <MetricCard
            title="Total Projects"
            value={metrics.totalProjects}
            icon="📊"
            color="#667eea"
          />
          <MetricCard
            title="Active Workers"
            value={metrics.activeWorkers.toLocaleString()}
            icon="👷"
            color="#48bb78"
            change="+12"
          />
          <MetricCard
            title="Total Budget"
            value={`$${(metrics.totalBudget / 1000000).toFixed(1)}M`}
            icon="💰"
            color="#f6ad55"
          />
          <MetricCard
            title="Avg Progress"
            value={`${metrics.avgProgress.toFixed(1)}%`}
            icon="📈"
            color="#4299e1"
            change="+2.3%"
          />
        </div>
      )}

      <div className="dashboard-content">
        <div className="projects-section">
          <h2 className="section-title">Active Projects</h2>
          <div className="projects-list">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="activity-section">
          <h2 className="section-title">Recent Activity</h2>
          <ActivityFeed activities={activities} />
        </div>
      </div>

      <div className="charts-section">
        <h2 className="section-title">Project Analytics</h2>
        <Charts projects={projects} />
      </div>
    </div>
  );
}

export default App;
