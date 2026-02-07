import React from 'react';

function ActivityFeed({ activities }) {
  return (
    <div className="activity-list">
      {activities.map((activity) => (
        <div key={activity.id} className={`activity-item ${activity.type}`}>
          <div className="activity-type">{activity.type}</div>
          <div className="activity-project">{activity.project}</div>
          <div className="activity-message">{activity.message}</div>
          <div className="activity-time">{activity.time}</div>
        </div>
      ))}
    </div>
  );
}

export default ActivityFeed;
