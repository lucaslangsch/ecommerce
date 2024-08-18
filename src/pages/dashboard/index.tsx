import { useEffect, useState } from 'react';
import { getUser } from '../../api/UserApi';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';

function Dashboard() {
  const [role, setRole] = useState<string>('')

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getUser();
        if (data) {
          setRole(data.role)
        }
      } catch (err: unknown) {
        console.log(err)
      }
    }
    fetchPlans()
  }, []);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2, borderRadius: 2 }}>
            <Typography variant='h4'>Bem vindo</Typography>
            <Divider />
            <Box sx={{ pt: 2 }}>
              <Typography>Perfil: {role}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2, borderRadius: 2 }}>
            <Typography variant='h4'>Bem vindo</Typography>
            <Divider />
            <Box sx={{ pt: 2 }}>
              <Typography>Perfil: {role}</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
