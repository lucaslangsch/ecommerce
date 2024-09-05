import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { Alert, Box, Card, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { fetchPostData, useFetchPlanById,  } from '../../api/PlansApi';
import { PaymentFormData } from '../../types/types';
import { useMutation } from '@tanstack/react-query';

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
  const { email } = useContext(AuthContext);
  const { data, isLoading, isError } = useFetchPlanById(id!);
  const { mutate, isError: isErrorMutate } = useMutation({
    mutationFn: (paymentData: PaymentFormData) => fetchPostData('/payment/process_payment', paymentData)})

  useEffect(() => {
    return () => {
      if (window.paymentBrickController) {
        console.log('desmontou')
        window.paymentBrickController.unmount();
      }
    };
  }, [id]);

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Skeleton height={190} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Skeleton height={190} />
        </Grid>
      </Grid>
    );
  }

  if (isError) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Alert severity="error">Não foi possível encontrar o plano selecionado, por favor tente novamente</Alert>
        </Grid>
      </Grid>
    )
  }

  const initialization = {
    amount: data?.value || 0,
    payer: {
      email: email,
    }
  };

  const paymentMethods =
    data?.frequency === "semestral" || data?.frequency === "anual"
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
        mercadoPagoPlanId: data?.mercado_pago_id,
        planId: id
      };
      mutate(paymentData, {
        onSuccess: (result) => {
          console.log('Payment result:', result);
          navigate("/dashboard");
        },
        onError: (error) => {
          console.error('Failed to process payment 1', error);
        }
      });
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
                Metodologia: {data?.metodology}
              </Typography>
              <Typography>
                Frequência: {data?.frequency}
              </Typography>
              <Typography>
                Modalidade: {data?.modality}
              </Typography>
              <Typography>
                Valor: R$ {data?.value},00
              </Typography>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ padding: 2, borderRadius: 2 }}>
          { isErrorMutate ? <Alert severity='error'>Pagamento recusado, por favor tente novamente</Alert> : null}
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
