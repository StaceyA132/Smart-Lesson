import React, { useEffect, useState } from 'react';
import { fetchUsers, fetchLessons, fetchEngagementEvents, fetchExperiments, addUser, addLesson } from './api';
  const [userFilter, setUserFilter] = useState('');
  const [lessonFilter, setLessonFilter] = useState('');
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [newLesson, setNewLesson] = useState({ title: '', content: '' });
  const [addingUser, setAddingUser] = useState(false);
  const [addingLesson, setAddingLesson] = useState(false);

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [engagementEvents, setEngagementEvents] = useState<any[]>([]);
  const [experiments, setExperiments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetchUsers(),
      fetchLessons(),
      fetchEngagementEvents(),
      fetchExperiments()
    ])
      .then(([usersData, lessonsData, eventsData, experimentsData]) => {
        setUsers(usersData);
        setLessons(lessonsData);
        setEngagementEvents(eventsData);
        setExperiments(experimentsData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadData();
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
          <input
            type="text"
            placeholder="Filter by name or email"
            value={userFilter}
            onChange={e => setUserFilter(e.target.value)}
            style={{ marginBottom: 12, padding: 6, width: '100%', borderRadius: 6, border: '1px solid #cbd5e1' }}
          />
          <form
            onSubmit={async e => {
              e.preventDefault();
              setAddingUser(true);
              try {
                await addUser(newUser);
                setNewUser({ name: '', email: '' });
                loadData();
              } catch (err: any) {
                setError(err.message);
              }
              setAddingUser(false);
            }}
            style={{ marginBottom: 12 }}
          >
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
              required
              style={{ marginRight: 8, padding: 6, borderRadius: 6, border: '1px solid #cbd5e1' }}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
              required
              style={{ marginRight: 8, padding: 6, borderRadius: 6, border: '1px solid #cbd5e1' }}
            />
            <button type="submit" disabled={addingUser} style={{ padding: '6px 16px', borderRadius: 6, background: '#2b6cb0', color: '#fff', border: 'none' }}>
              {addingUser ? 'Adding...' : 'Add User'}
            </button>
          </form>
          {loading ? (
            <div style={{ color: '#718096' }}>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : users.length === 0 ? (
            <div style={{ color: '#718096' }}>No users found.</div>
          ) : (
            <ul style={{ color: '#2d3748', paddingLeft: 0, listStyle: 'none' }}>
              {users.filter(user =>
                user.name.toLowerCase().includes(userFilter.toLowerCase()) ||
                user.email.toLowerCase().includes(userFilter.toLowerCase())
              ).map((user) => (
                <li key={user.id} style={{ marginBottom: 8 }}>
                  <strong>{user.name}</strong> <span style={{ color: '#718096' }}>({user.email})</span>
                </li>
              ))}
            </ul>
          )}
        </section>
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e2e8f0', padding: 24 }}>
          <h2 style={{ color: '#2b6cb0', fontSize: 24 }}>Lessons</h2>
          <input
            type="text"
            placeholder="Filter by title or content"
            value={lessonFilter}
            onChange={e => setLessonFilter(e.target.value)}
            style={{ marginBottom: 12, padding: 6, width: '100%', borderRadius: 6, border: '1px solid #cbd5e1' }}
          />
          <form
            onSubmit={async e => {
              e.preventDefault();
              setAddingLesson(true);
              try {
                await addLesson(newLesson);
                setNewLesson({ title: '', content: '' });
                loadData();
              } catch (err: any) {
                setError(err.message);
              }
              setAddingLesson(false);
            }}
            style={{ marginBottom: 12 }}
          >
            <input
              type="text"
              placeholder="Title"
              value={newLesson.title}
              onChange={e => setNewLesson({ ...newLesson, title: e.target.value })}
              required
              style={{ marginRight: 8, padding: 6, borderRadius: 6, border: '1px solid #cbd5e1' }}
            />
            <input
              type="text"
              placeholder="Content"
              value={newLesson.content}
              onChange={e => setNewLesson({ ...newLesson, content: e.target.value })}
              required
              style={{ marginRight: 8, padding: 6, borderRadius: 6, border: '1px solid #cbd5e1' }}
            />
            <button type="submit" disabled={addingLesson} style={{ padding: '6px 16px', borderRadius: 6, background: '#2b6cb0', color: '#fff', border: 'none' }}>
              {addingLesson ? 'Adding...' : 'Add Lesson'}
            </button>
          </form>
          {loading ? (
            <div style={{ color: '#718096' }}>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : lessons.length === 0 ? (
            <div style={{ color: '#718096' }}>No lessons found.</div>
          ) : (
            <ul style={{ color: '#2d3748', paddingLeft: 0, listStyle: 'none' }}>
              {lessons.filter(lesson =>
                lesson.title.toLowerCase().includes(lessonFilter.toLowerCase()) ||
                lesson.content.toLowerCase().includes(lessonFilter.toLowerCase())
              ).map((lesson) => (
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
          {loading ? (
            <div style={{ color: '#718096' }}>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : engagementEvents.length === 0 ? (
            <div style={{ color: '#718096' }}>No engagement events found.</div>
          ) : (
            <ul style={{ color: '#2d3748', paddingLeft: 0, listStyle: 'none' }}>
              {engagementEvents.map((event) => (
                <li key={event.id} style={{ marginBottom: 8 }}>
                  User <strong>{event.user_id}</strong> received lesson <strong>{event.lesson_id}</strong> via <strong>{event.channel}</strong>
                  {event.interacted && (
                    <span style={{ color: '#38a169', marginLeft: 8 }}>
                      (interacted)
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
        <section style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e2e8f0', padding: 24 }}>
          <h2 style={{ color: '#2b6cb0', fontSize: 24 }}>Experiment Results</h2>
          {loading ? (
            <div style={{ color: '#718096' }}>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : experiments.length === 0 ? (
            <div style={{ color: '#718096' }}>No experiments found.</div>
          ) : (
            <ul style={{ color: '#2d3748', paddingLeft: 0, listStyle: 'none' }}>
              {experiments.map((exp) => (
                <li key={exp.id} style={{ marginBottom: 8 }}>
                  <strong>{exp.name}</strong> — {exp.strategy}
                  {exp.result && (
                    <span style={{ color: '#3182ce', marginLeft: 8 }}>
                      ({exp.result})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
