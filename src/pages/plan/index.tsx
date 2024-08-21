import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';

const PUBLIC_KEY = "APP_USR-7790b7ef-c642-4e4b-aeaa-53ae59481867";
initMercadoPago(PUBLIC_KEY, { locale: 'pt-BR' });

declare global {
  interface Window {
    paymentBrickController: {
      unmount: () => void;
    };
  }
}

type Plan = {
  id: string;
  modality: string;
  frequency: string;
  type: string;
  value: number;
}

type CardData = {
  'token': string,
  'issuer_id': string,
  'payment_method_id': string,
  'transaction_amount': number,
  'payment_method_option_id': string | null,
  'processing_mode': string | null,
  'installments': number,
  'payer': {
    'email': string,
    'identification': {
      'type': string,
      'number': string
    }
  }
}

type BankTransferData = {
  'payment_method_id': string,
  'transaction_amount': number,
  'payer': {
    'email': string
  }
}

type TicketData = {
  'payment_method_id': string,
  'transaction_amount': number,
  'transaction_details'?: {
    'financial_institution': string,
  },
  'payer': {
    'email': string,
    'identification'?: {
      'type': string,
      'number': string
    },
    'first_name'?: string,
    'last_name'?: string,
    'address'?: {
      'city': string,
      'federal_unit': string,
      'neighborhood': string,
      'street_name': string,
      'street_number': string,
      'zip_code': string
    }
  },
  'metadata'?: {
    'payment_point'?: string,
    'payment_mode'?: string
  }
}


type PaymentMethod = 'atm' | 'ticket' | 'bank_transfer' | 'creditCard' | 'debitCard' | 'wallet_purchase' | 'onboarding_credits';

type PaymentFormData = {
  selectedPaymentMethod: PaymentMethod;
  formData: CardData | TicketData | BankTransferData;
};

function Plan() {
  const { id } = useParams<{ id: string }>();
  const [planData, setPlanData] = useState<Plan | null>(null);

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/plans/show/${id}`);
        const data = await response.json();
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
      email: 'lucas@mail.com',
    },
    paymentId: '84692811719'
  };

  const { modality, frequency, type, value } = planData;

  const paymentMethods =
    frequency === "semestral" || frequency === "anual"
      ? { creditCard: "all" as string[] | "all" }
      : { ticket: "all" as string[] | "all", bankTransfer: "all" as string[] | "all", creditCard: "all" as string[] | "all" };

  const customization = {
    paymentMethods: { ...paymentMethods, maxInstallments: 1, minInstallments: 1 },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }: PaymentFormData) => {
    return new Promise((reject) => {
      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, planId: planData.id, selectedPaymentMethod }),
      })
        .then((response) => response.json())
        .catch((error) => reject(error));
    });
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
                Metodologia: {modality}
              </Typography>
              <Typography>
                Frequência: {frequency}
              </Typography>
              <Typography>
                Modalidade: {type}
              </Typography>
              <Typography>
                Valor: {value}
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
