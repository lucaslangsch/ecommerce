function getCookie(name: string): string | null {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)` // eslint-disable-line
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
}

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
