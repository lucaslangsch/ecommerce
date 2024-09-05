import { useMutation, useQuery } from '@tanstack/react-query';
import getCookie from '../hooks/useCookie';
import { PaymentFormData, PlanType } from '../types/types';

const URL = import.meta.env.VITE_URL_FETCH

export const fetchData = async (endpoint: string) => {
  const token = getCookie('token');
  const response = await fetch(`${URL}${endpoint}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  if (!response.ok) {
    const dataError = await response.json();
    throw new Error(dataError.message);
  }
  return response.json()
}

export function useFetchPlans() {
  const query = useQuery({
    queryFn: () => fetchData('/plans/show'),
    queryKey: ['plans-data'],
    staleTime: 1 * 60 * 1000,
    retry: 1,
  })
  return query;
}

export function useFetchPlanById(id: string) {
  const query = useQuery<PlanType, Error>({
    queryFn: () => fetchData(`/plans/show/${id}`),
    queryKey: ['plan-data', id],
    staleTime: 1 * 60 * 1000,
    retry: 1,
  })
  return query;
}

export const fetchPostData = async (endpoint: string, body: object) => {
  const token = getCookie('token');
  const response = await fetch(`${URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (!response.ok) {
    const dataError = await response.json();
    throw new Error(dataError.message);
  }
  return response.json()
}

export function useFetchProcessPayment(paymentData: PaymentFormData) {
  const mutation = useMutation({
    mutationFn: () => fetchPostData('/payment/process_payment', paymentData),
    mutationKey: ['process-payment'],
    retry: 1,
  })
  return mutation;
}
