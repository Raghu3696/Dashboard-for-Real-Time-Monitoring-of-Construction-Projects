# 🏗️ Real-Time Construction Project Monitoring Dashboard

A comprehensive, real-time dashboard for monitoring construction projects with dynamic data visualization, built with React, Node.js, and WebSocket integration.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)

## 🎯 Features

- **Real-Time Monitoring**: WebSocket integration for live project updates every 5 seconds
- **Interactive Dashboard**: Modern, responsive UI with smooth animations
- **KPI Metrics**: Track total projects, active workers, budgets, and average progress
- **Project Cards**: Detailed view of each project including:
  - Progress tracking with visual progress bars
  - Budget vs spent analysis
  - Worker allocation
  - Project phases breakdown
  - Status indicators (On Track, At Risk, Delayed)
- **Activity Feed**: Live feed of project milestones, alerts, and updates
- **Data Visualization**: Multiple chart types using Recharts:
  - Budget vs Spent comparison (Bar Chart)
  - Project Progress tracking (Line Chart)
  - Status Distribution (Pie Chart)
  - Worker Distribution (Bar Chart)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI framework
- **Recharts 2.10.3** - Data visualization library
- **CSS3** - Custom styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **WebSocket (ws)** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Git

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/construction-dashboard.git
cd construction-dashboard
```

### 2. Install Dependencies

#### Install backend dependencies:
```bash
npm install
```

#### Install frontend dependencies:
```bash
cd client
npm install
cd ..
```

Or use the convenience script:
```bash
npm run install-all
```

### 3. Running the Application

#### Development Mode (Recommended)

**Terminal 1 - Start the backend server:**
```bash
npm start
```
The server will run on `http://localhost:5000`

**Terminal 2 - Start the React frontend:**
```bash
cd client
npm start
```
The frontend will open automatically at `http://localhost:3000`

#### Production Build

Build the React app:
```bash
npm run build
```

Then serve it with the backend by adding static file serving to `server.js`.

## 📁 Project Structure

```
construction-dashboard/
├── client/                     # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ActivityFeed.js    # Activity feed component
│   │   │   ├── Charts.js          # Data visualization charts
│   │   │   ├── MetricCard.js      # KPI metric cards
│   │   │   └── ProjectCard.js     # Project detail cards
│   │   ├── App.css                # Main styling
│   │   ├── App.js                 # Main App component
│   │   ├── index.css
│   │   └── index.js
│   └── package.json
├── server.js                   # Express + WebSocket server
├── package.json
└── README.md
```

## 🎨 Features Breakdown

### Real-Time Updates
The dashboard uses WebSocket connections to push updates from the server to all connected clients every 5 seconds. This includes:
- Project progress changes
- Worker count fluctuations
- Metric recalculations

### Project Tracking
Each project card displays:
- Project name and location
- Status badge (On Track, At Risk, Delayed)
- Budget information and spending
- Active worker count
- Project manager details
- Timeline (start and end dates)
- Overall progress percentage
- Individual phase progress

### Metrics Dashboard
Four key performance indicators:
- **Total Projects**: Number of active construction projects
- **Active Workers**: Total workforce across all projects
- **Total Budget**: Combined budget of all projects
- **Average Progress**: Mean completion percentage

### Data Visualization
Interactive charts powered by Recharts:
- Bar charts for budget analysis
- Line charts for progress trends
- Pie charts for status distribution
- Responsive design adapts to screen size

## 🔧 Configuration

### Backend Configuration
Modify `server.js` to customize:
- Port number (default: 5000)
- WebSocket update interval (default: 5000ms)
- Initial project data
- API endpoints

### Frontend Configuration
Modify `client/src/App.js` to customize:
- WebSocket connection URL
- Polling intervals
- Component layouts

## 🎯 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/projects` | GET | Get all projects |
| `/api/projects/:id` | GET | Get specific project |
| `/api/metrics` | GET | Get dashboard metrics |
| `/api/activities` | GET | Get recent activities |

## 🌟 Key Highlights

1. **Professional Design**: Modern UI with gradient backgrounds, smooth animations, and hover effects
2. **Real-Time Capabilities**: Simulates live construction site data updates
3. **Comprehensive Data**: Tracks multiple aspects of construction projects
4. **Scalable Architecture**: Easy to extend with additional features
5. **Production-Ready**: Clean code structure and best practices

## 📝 Sample Data

The dashboard comes pre-loaded with 4 sample projects:
- Downtown Office Complex (68% complete)
- Harbor Bridge Expansion (42% complete)
- Residential Tower A (91% complete)
- Metro Station Renovation (55% complete)

## 🔮 Future Enhancements

Potential features to add:
- User authentication and role-based access
- Database integration (MongoDB/PostgreSQL)
- Export reports to PDF
- Email notifications for critical alerts
- Integration with Tableau for advanced analytics
- Mobile app version
- Weather data integration
- Equipment tracking
- Document management
- Team collaboration features

## 🐛 Troubleshooting

**WebSocket connection fails:**
- Ensure backend server is running on port 5000
- Check for firewall blocking WebSocket connections

**Charts not rendering:**
- Verify Recharts is installed: `npm list recharts`
- Clear browser cache and reload

**Port already in use:**
- Change port in `server.js` and update proxy in `client/package.json`

## 📄 License

MIT License - feel free to use this project for your portfolio or commercial applications.

## 👨‍💻 Author

Built with ❤️ for construction project management

## 🙏 Acknowledgments

- React team for the amazing framework
- Recharts for beautiful data visualization
- Express.js community

---

**Note**: This is a demonstration project. For production use, implement proper security measures, database integration, and authentication systems.
