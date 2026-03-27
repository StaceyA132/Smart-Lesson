// API utility for Smart Lesson frontend
const API_BASE = 'http://localhost:8000';

export async function fetchUsers() {
  const res = await fetch(`${API_BASE}/users/`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function fetchLessons() {
  const res = await fetch(`${API_BASE}/lessons/`);
  if (!res.ok) throw new Error('Failed to fetch lessons');
  return res.json();
}

export async function fetchEngagementEvents() {
  const res = await fetch(`${API_BASE}/events/`);
  if (!res.ok) throw new Error('Failed to fetch engagement events');
  return res.json();
}

export async function fetchExperiments() {
  const res = await fetch(`${API_BASE}/experiments/`);
  if (!res.ok) throw new Error('Failed to fetch experiments');
  return res.json();
}
