import { useEffect, useState } from 'react';
import { getUser } from '../../api/UserApi';
import { Box, Button, Card, Divider, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { User } from '../../types/types';

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getUser();
        if (data) {
          setUser(data)
        }
      } catch (err: unknown) {
        console.log(err)
      }
    }
    fetchPlans()
  }, []);

  const handleSubscribe = () => {
    navigate('/dashboard/plans');
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2, borderRadius: 2 }}>
            <Typography variant='h4'>Bem vindo</Typography>
            <Divider />
            <Box sx={{ pt: 2 }}>
              <Typography>Perfil: {user?.role}</Typography>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2, borderRadius: 2 }}>
            {user?.signatures?.length ? (
              <>
                <Typography variant="h4">Assinatura Ativa</Typography>
                <Divider />
                <Box sx={{ pt: 2 }}>
                  <Typography>Metodologia: {user.signatures[0].plan?.metodology}</Typography>
                  <Typography>Frequência: {user.signatures[0].plan?.frequency}</Typography>
                  <Typography>Modalidades: {user.signatures[0].plan?.modality}</Typography>
                  <Typography>Início: {new Date(user.signatures[0].begin_at).toLocaleDateString()}</Typography>
                  <Typography>Expira em: {new Date(user.signatures[0].expires_at).toLocaleDateString()}</Typography>
                </Box>
              </>
            ) : (
              <>
                <Typography variant='h6'>Nenhuma assinatura encontrada</Typography>
                <Button variant="contained" color="primary" onClick={handleSubscribe} sx={{ mt: 2 }}>
                  Assine agora
                </Button>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
