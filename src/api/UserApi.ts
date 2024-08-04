export async function registerUser(userData: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const response = await fetch('http://localhost:3001/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error('Failed to register');
  }

  return response.json();
}

export async function loginUser(userData: { email: string; password: string }) {
  const response = await fetch('http://localhost:3001/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return response.json();
}

