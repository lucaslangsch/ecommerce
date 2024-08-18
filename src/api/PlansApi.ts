import getCookie from '../hooks/useCookie';

export async function getPlans() {
  const token = getCookie('token');

  const response = await fetch('http://localhost:3001/plans/show', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch plans');
  }

  return response.json();
}
