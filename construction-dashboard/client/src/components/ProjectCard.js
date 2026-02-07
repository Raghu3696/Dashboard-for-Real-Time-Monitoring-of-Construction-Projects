import React from 'react';

function ProjectCard({ project }) {
  const formatCurrency = (amount) => {
    return `$${(amount / 1000000).toFixed(1)}M`;
  };

  const getBudgetStatus = () => {
    const percentSpent = (project.spent / project.budget) * 100;
    const percentProgress = project.progress;
    
    if (percentSpent > percentProgress + 10) {
      return 'Over Budget';
    } else if (percentSpent < percentProgress - 10) {
      return 'Under Budget';
    }
    return 'On Budget';
  };

  return (
    <div className={`project-card ${project.status.toLowerCase().replace(' ', '-')}`}>
      <div className="project-header">
        <div className="project-info">
          <h3>{project.name}</h3>
          <div className="project-location">
            📍 {project.location}
          </div>
        </div>
        <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
          {project.status}
        </span>
      </div>

      <div className="project-details">
        <div className="detail-item">
          <span className="detail-label">Budget</span>
          <span className="detail-value">{formatCurrency(project.budget)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Spent</span>
          <span className="detail-value">{formatCurrency(project.spent)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Workers</span>
          <span className="detail-value">{project.workers}</span>
        </div>
      </div>

      <div className="project-details">
        <div className="detail-item">
          <span className="detail-label">Manager</span>
          <span className="detail-value" style={{ fontSize: '14px' }}>{project.manager}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Start Date</span>
          <span className="detail-value" style={{ fontSize: '14px' }}>
            {new Date(project.startDate).toLocaleDateString()}
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">End Date</span>
          <span className="detail-value" style={{ fontSize: '14px' }}>
            {new Date(project.endDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="progress-section">
        <div className="progress-header">
          <span className="progress-label">Overall Progress</span>
          <span className="progress-percentage">{project.progress.toFixed(1)}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>

      {project.phases && (
        <div className="phases-section" style={{ marginTop: '15px' }}>
          <div className="detail-label" style={{ marginBottom: '8px' }}>Project Phases</div>
          {project.phases.map((phase, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                <span style={{ color: '#4a5568' }}>{phase.name}</span>
                <span style={{ color: '#667eea', fontWeight: '600' }}>{phase.progress}%</span>
              </div>
              <div className="progress-bar" style={{ height: '6px' }}>
                <div 
                  className="progress-fill" 
                  style={{ width: `${phase.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
