import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 32, background: '#f7f9fa', minHeight: '100vh' }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ color: '#1a202c', fontSize: 36 }}>Smart Lesson Dashboard</h1>
        <p style={{ color: '#4a5568', fontSize: 18 }}>
          View users, lessons, engagement stats, and experiment results in real time.
        </p>
      </header>
      <main style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e2e8f0', padding: 24 }}>
          <h2 style={{ color: '#2b6cb0', fontSize: 24 }}>Users</h2>
          <div style={{ color: '#718096' }}>[User list will appear here]</div>
        </section>
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e2e8f0', padding: 24 }}>
          <h2 style={{ color: '#2b6cb0', fontSize: 24 }}>Lessons</h2>
          <div style={{ color: '#718096' }}>[Lesson list will appear here]</div>
        </section>
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e2e8f0', padding: 24 }}>
          <h2 style={{ color: '#2b6cb0', fontSize: 24 }}>Engagement Stats</h2>
          <div style={{ color: '#718096' }}>[Engagement stats and charts will appear here]</div>
        </section>
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e2e8f0', padding: 24 }}>
          <h2 style={{ color: '#2b6cb0', fontSize: 24 }}>Experiment Results</h2>
          <div style={{ color: '#718096' }}>[Experiment results and analytics will appear here]</div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
