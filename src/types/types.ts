type PlanType = {
  id: string,
  modality: string,
  frequency: string,
  metodology: string,
  value: number,
  mercado_pago_id: string | null,
  recurrence: boolean,
  created_at: string,
  updated_at: string,
}

type CardDataType = {
  token: string,
  issuer_id: string,
  payment_method_id: string,
  transaction_amount: number,
  payment_method_option_id: string | null,
  processing_mode: string | null,
  installments: number,
  payer: {
    email: string,
    identification: {
      type: string,
      number: string
    }
  }
}

type BankTransferData = {
  payment_method_id: string,
  transaction_amount: number,
  payer: {
    email: string
  }
}

type TicketData = {
  payment_method_id: string,
  transaction_amount: number,
  transaction_details?: {
    financial_institution: string,
  },
  payer: {
    email: string,
    identification?: {
      type: string,
      number: string
    },
    first_name?: string,
    last_name?: string,
    address?: {
      city: string,
      federal_unit: string,
      neighborhood: string,
      street_name: string,
      street_number: string,
      zip_code: string
    }
  },
  metadata?: {
    payment_point?: string,
    payment_mode?: string
  }
}

type PaymentMethod = 'atm' | 'ticket' | 'bank_transfer' | 'creditCard' | 'debitCard' | 'wallet_purchase' | 'onboarding_credits';

type PaymentFormData = {
  selectedPaymentMethod: PaymentMethod,
  formData: CardDataType | TicketData | BankTransferData,
  mercadoPagoPlanId?: string | null,
  planId?: string,
};

type UserRegisterType = {
  name: string,
  lastName: string,
  email: string,
  password: string
}

type UserLoginType = {
  email: string,
  password: string
}

type User = {
  id: number,
  name: string,
  lastName: string,
  email: string,
  role: string,
  signatures?: Signature[]
}

type Signature = {
  id: number,
  planId: number,
  active: boolean,
  userId: number,
  begin_at: string,
  expires_at: string,
  plan: Plan
}

type Plan = {
  id: number,
  mercado_pago_id: string,
  metodology: string,
  frequency: string,
  modality: string,
  value: number,
  recurrence: boolean,
  created_at: string,
  updated_at: string
}

export type {
  CardDataType,
  BankTransferData,
  PaymentFormData,
  PaymentMethod,
  PlanType,
  TicketData,
  UserRegisterType,
  UserLoginType,
  User,
  Signature
}