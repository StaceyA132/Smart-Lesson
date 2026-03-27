import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchLessons } from './api';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchUsers(), fetchLessons()])
      .then(([usersData, lessonsData]) => {
        setUsers(usersData);
        setLessons(lessonsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
          {loading ? (
            <div style={{ color: '#718096' }}>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : users.length === 0 ? (
            <div style={{ color: '#718096' }}>No users found.</div>
          ) : (
            <ul style={{ color: '#2d3748', paddingLeft: 0, listStyle: 'none' }}>
              {users.map((user) => (
                <li key={user.id} style={{ marginBottom: 8 }}>
                  <strong>{user.name}</strong> <span style={{ color: '#718096' }}>({user.email})</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e2e8f0', padding: 24 }}>
          <h2 style={{ color: '#2b6cb0', fontSize: 24 }}>Lessons</h2>
          {loading ? (
            <div style={{ color: '#718096' }}>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : lessons.length === 0 ? (
            <div style={{ color: '#718096' }}>No lessons found.</div>
          ) : (
            <ul style={{ color: '#2d3748', paddingLeft: 0, listStyle: 'none' }}>
              {lessons.map((lesson) => (
                <li key={lesson.id} style={{ marginBottom: 8 }}>
                  <strong>{lesson.title}</strong>
                  <div style={{ color: '#718096', fontSize: 14 }}>{lesson.content}</div>
                </li>
              ))}
            </ul>
          )}
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
