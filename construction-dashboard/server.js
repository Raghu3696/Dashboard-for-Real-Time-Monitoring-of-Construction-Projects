const express = require('express');
const cors = require('cors');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Sample construction project data
let projects = [
  {
    id: '1',
    name: 'Downtown Office Complex',
    location: 'New York, NY',
    progress: 68,
    budget: 25000000,
    spent: 17000000,
    status: 'On Track',
    startDate: '2024-01-15',
    endDate: '2025-06-30',
    manager: 'Sarah Johnson',
    workers: 145,
    phases: [
      { name: 'Foundation', progress: 100, status: 'Completed' },
      { name: 'Structure', progress: 85, status: 'In Progress' },
      { name: 'MEP', progress: 45, status: 'In Progress' },
      { name: 'Finishing', progress: 20, status: 'In Progress' }
    ]
  },
  {
    id: '2',
    name: 'Harbor Bridge Expansion',
    location: 'San Francisco, CA',
    progress: 42,
    budget: 45000000,
    spent: 18900000,
    status: 'At Risk',
    startDate: '2023-09-01',
    endDate: '2025-12-31',
    manager: 'Michael Chen',
    workers: 223,
    phases: [
      { name: 'Planning', progress: 100, status: 'Completed' },
      { name: 'Foundation', progress: 100, status: 'Completed' },
      { name: 'Main Structure', progress: 35, status: 'In Progress' },
      { name: 'Finishing', progress: 5, status: 'Not Started' }
    ]
  },
  {
    id: '3',
    name: 'Residential Tower A',
    location: 'Chicago, IL',
    progress: 91,
    budget: 18000000,
    spent: 16380000,
    status: 'On Track',
    startDate: '2023-03-20',
    endDate: '2025-03-15',
    manager: 'Emily Rodriguez',
    workers: 98,
    phases: [
      { name: 'Foundation', progress: 100, status: 'Completed' },
      { name: 'Structure', progress: 100, status: 'Completed' },
      { name: 'Interior', progress: 95, status: 'In Progress' },
      { name: 'Landscaping', progress: 65, status: 'In Progress' }
    ]
  },
  {
    id: '4',
    name: 'Metro Station Renovation',
    location: 'Boston, MA',
    progress: 55,
    budget: 12000000,
    spent: 7200000,
    status: 'On Track',
    startDate: '2024-02-10',
    endDate: '2025-08-20',
    manager: 'David Park',
    workers: 67,
    phases: [
      { name: 'Demolition', progress: 100, status: 'Completed' },
      { name: 'Structural Work', progress: 70, status: 'In Progress' },
      { name: 'Systems', progress: 40, status: 'In Progress' },
      { name: 'Finishing', progress: 15, status: 'In Progress' }
    ]
  }
];

// Generate real-time metrics
let metrics = {
  totalProjects: 4,
  activeWorkers: 533,
  totalBudget: 100000000,
  totalSpent: 59480000,
  avgProgress: 64,
  onTrack: 3,
  atRisk: 1,
  delayed: 0
};

// API Routes
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: 'Project not found' });
  }
});

app.get('/api/metrics', (req, res) => {
  res.json(metrics);
});

// Recent activities
app.get('/api/activities', (req, res) => {
  const activities = [
    { id: 1, type: 'milestone', project: 'Downtown Office Complex', message: 'Structure Phase 85% complete', time: '15 mins ago' },
    { id: 2, type: 'alert', project: 'Harbor Bridge Expansion', message: 'Weather delay expected next week', time: '1 hour ago' },
    { id: 3, type: 'update', project: 'Residential Tower A', message: 'Interior work ahead of schedule', time: '2 hours ago' },
    { id: 4, type: 'milestone', project: 'Metro Station Renovation', message: 'Demolition phase completed', time: '3 hours ago' },
    { id: 5, type: 'update', project: 'Downtown Office Complex', message: '15 new workers assigned', time: '5 hours ago' }
  ];
  res.json(activities);
});

// Start HTTP server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// WebSocket server for real-time updates
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  // Send initial data
  ws.send(JSON.stringify({ type: 'initial', data: { projects, metrics } }));
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Simulate real-time updates
setInterval(() => {
  projects = projects.map(project => {
    // Randomly update progress slightly
    const progressChange = Math.random() > 0.5 ? Math.random() * 0.5 : 0;
    const newProgress = Math.min(100, project.progress + progressChange);
    
    return {
      ...project,
      progress: parseFloat(newProgress.toFixed(2)),
      workers: project.workers + Math.floor(Math.random() * 6 - 3) // +/- 3 workers
    };
  });
  
  // Update metrics
  metrics.avgProgress = parseFloat((projects.reduce((sum, p) => sum + p.progress, 0) / projects.length).toFixed(2));
  metrics.activeWorkers = projects.reduce((sum, p) => sum + p.workers, 0);
  
  // Broadcast to all connected clients
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ 
        type: 'update', 
        data: { projects, metrics } 
      }));
    }
  });
}, 5000); // Update every 5 seconds
