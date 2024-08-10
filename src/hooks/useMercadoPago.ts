import { useEffect, useState } from 'react';
import { loadMercadoPago } from "@mercadopago/sdk-js";

const useMercadoPago = (publicKey: string) => {
  const [mp, setMp] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeMercadoPago = async () => {
      await loadMercadoPago();
      const mpInstance = new window.MercadoPago(publicKey);
      setMp(mpInstance);
      setIsInitialized(true);
    };

    initializeMercadoPago();
  }, [publicKey]);

  return { mp, isInitialized };
};

export default useMercadoPago;
