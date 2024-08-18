import getCookie from '../hooks/useCookie';

type userDataType = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

type userLoginType = {
  email: string;
  password: string;
};

export async function registerUser(userData: userDataType) {
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

export async function loginUser(userData: userLoginType) {
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

export async function getUser() {
  const token = getCookie('token');

  const response = await fetch('http://localhost:3001/user/getUser', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to login');
  }

  return response.json();
}
