import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import styles from './index.module.css';
import { Card, CardContent, Grid, Typography } from '@mui/material';

async function getPlans() {
  const response = await fetch('http://localhost:3001/plans/showPrePlans', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch plans');
  }

  return response.json();
}

function Dashboard() {
  const [plans, setPlans] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data.results); // Ajuste de acordo com a estrutura de dados retornada
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPlans();
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.containerMain}>
          {error && <div>Error: {error}</div>}
          {!error && plans.length === 0 && <div>Loading...</div>}
          {!error && plans.length > 0 && (
            <Grid container spacing={2}>
              {plans.map(plan => (
                <Grid item key={plan.id} xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {plan.reason}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Frequency: {plan.auto_recurring.frequency} {plan.auto_recurring.frequency_type}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Amount: {plan.auto_recurring.transaction_amount} {plan.auto_recurring.currency_id}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </main>
    </>
  );
}

export default Dashboard;