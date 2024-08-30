import getCookie from '../hooks/useCookie';
import { PaymentFormData } from '../types/types';

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

export async function getPlanById(id: string) {
  const token = getCookie('token');

  const response = await fetch(`http://localhost:3001/plans/show/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch plan data');
  }

  return response.json();
}


export async function processPayment(paymentData: PaymentFormData) {
  const token = getCookie('token');

  const response = await fetch('http://localhost:3001/payment/process_payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  });

  if (!response.ok) {
    throw new Error('Failed to process payment');
  }

  return response.json();
}
