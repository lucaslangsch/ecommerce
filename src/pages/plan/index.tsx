import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import { getPlanById, processPayment } from '../../api/PlansApi';
import { PlanType, PaymentFormData } from '../../types/types';

const PUBLIC_KEY = "APP_USR-7790b7ef-c642-4e4b-aeaa-53ae59481867";
initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

declare global {
  interface Window {
    paymentBrickController: {
      unmount: () => void;
    };
  }
}

function Plan() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [planData, setPlanData] = useState<PlanType>();
  const { email } = useContext(AuthContext);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const data = await getPlanById(id!);
        setPlanData(data);
      } catch (error) {
        console.error('Failed to fetch plan data', error);
      }
    };

    fetchPlanData();

    return () => {
      if (window.paymentBrickController) {
        window.paymentBrickController.unmount();
      }
    };
  }, [id]);

  if (!planData) {
    return <div>Loading...</div>;
  }

  const initialization = {
    amount: planData.value,
    payer: {
      email: email,
    }
  };

  const { modality, frequency, metodology, value } = planData;

  const paymentMethods =
    frequency === "semestral" || frequency === "anual"
      ? { creditCard: "all" as string[] | "all" }
      : { ticket: "all" as string[] | "all", bankTransfer: "all" as string[] | "all", creditCard: "all" as string[] | "all" };

  const customization = {
    paymentMethods: { ...paymentMethods, maxInstallments: 1, minInstallments: 1 },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }: PaymentFormData) => {
    try {
      const paymentData = {
        selectedPaymentMethod,
        formData,
        mercadoPagoPlanId: planData.mercado_pago_id,
        planId: id
      };
      const result = await processPayment(paymentData);
      console.log('Payment result:', result);
      navigate("/dashboard");
    } catch (error) {
      console.error('Failed to process payment', error);
    }
  };

  const onError = async (error: unknown) => {
    console.error('Payment brick error:', error);
  };

  const onReady = async () => {
    console.log('Payment brick is ready');
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2, borderRadius: 2 }}>
            <Typography variant='h4'>Você está comprando</Typography>
            <Divider />
            <Box sx={{ pt: 2 }}>
              <Typography>
                Metodologia: {metodology}
              </Typography>
              <Typography>
                Frequência: {frequency}
              </Typography>
              <Typography>
                Modalidade: {modality}
              </Typography>
              <Typography>
                Valor: R$ {value},00
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2, borderRadius: 2 }}>
            <Payment
              initialization={initialization}
              customization={customization}
              onSubmit={onSubmit}
              onReady={onReady}
              onError={onError}
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Plan;
