import React, { createContext, useState, useContext } from 'react';
import config from '../config';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(config.DEFAULT_CURRENCY);

  const value = {
    currency,
    setCurrency,
    supportedCurrencies: config.SUPPORTED_CURRENCIES,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext };
