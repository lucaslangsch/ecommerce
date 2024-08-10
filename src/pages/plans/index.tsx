import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/navbar';
import styles from './index.module.css';
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';


const PUBLIC_KEY = "APP_USR-7790b7ef-c642-4e4b-aeaa-53ae59481867";
initMercadoPago(PUBLIC_KEY);

function Plans() {
  useEffect(() => {
  }, []);

  const initialization = {
    amount: 100,
    preferenceId: "<PREFERENCE_ID>",
  };
  const customization = {
    paymentMethods: {
      ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
    },
  };
  const onSubmit = async (
    { selectedPaymentMethod, formData }
  ) => {
    console.log(selectedPaymentMethod)
    if (selectedPaymentMethod === "bank_transfer") {
      formData = {
        ...formData,
        transaction_amount: 1,
      }
    }
    // callback chamado ao clicar no botão de submissão dos dados
    return new Promise((resolve, reject) => {
      fetch("/process_payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...formData, details: 'sd'}),
      })
        .then((response) => response.json())
        .then((response) => {
          // receber o resultado do pagamento
          resolve();
        })
        .catch((error) => {
          // lidar com a resposta de erro ao tentar criar o pagamento
          reject();
        });
    });
  };
  const onError = async (error) => {
    // callback chamado para todos os casos de erro do Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback chamado quando o Brick estiver pronto.
      Aqui você pode ocultar loadings do seu site, por exemplo.
    */
  };



  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Payment
          initialization={initialization}
          customization={customization}
          onSubmit={onSubmit}
          onReady={onReady}
          onError={onError}
        />
      </main>
    </>
  );
}

export default Plans;
