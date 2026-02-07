import React from 'react';

function MetricCard({ title, value, icon, color, change }) {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <span className="metric-title">{title}</span>
        <span className="metric-icon" style={{ color: color }}>
          {icon}
        </span>
      </div>
      <div className="metric-value" style={{ color: color }}>
        {value}
      </div>
      {change && (
        <div className={`metric-change ${change.startsWith('-') ? 'negative' : ''}`}>
          {change}
        </div>
      )}
    </div>
  );
}

export default MetricCard;
