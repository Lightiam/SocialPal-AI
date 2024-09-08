import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  useToast,
  Text,
} from "@chakra-ui/react";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import config from '../config';
import { CurrencyContext } from '../contexts/CurrencyContext';

// Initialize Stripe
const stripePromise = loadStripe('your_stripe_publishable_key');

const PaymentForm = ({ amount, currency, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      return;
    }

    try {
      const response = await fetch(`${config.API_URL}/api/payments/create-payment-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency }),
      });
      const data = await response.json();

      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        toast({
          title: "Payment failed",
          description: result.error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        onSuccess(result.paymentIntent);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing your payment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Card details</FormLabel>
        <CardElement />
      </FormControl>
      <Button
        mt={4}
        colorScheme="purple"
        isLoading={isLoading}
        type="submit"
        disabled={!stripe}
      >
        Pay {amount} {currency}
      </Button>
    </form>
  );
};

const PaymentHandler = () => {
  const { currency: selectedCurrency } = useContext(CurrencyContext);
  const [amount, setAmount] = useState('');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [convertedAmount, setConvertedAmount] = useState('');
  const toast = useToast();

  useEffect(() => {
    convertCurrency();
  }, [amount, baseCurrency, selectedCurrency]);

  const convertCurrency = async () => {
    if (amount && baseCurrency !== selectedCurrency) {
      try {
        const response = await fetch(`${config.API_URL}/api/currency/convert`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: parseFloat(amount),
            from_currency: baseCurrency,
            to_currency: selectedCurrency,
          }),
        });
        const convertedAmount = await response.json();
        setConvertedAmount(convertedAmount.toFixed(2));
      } catch (error) {
        console.error('Currency conversion failed:', error);
        setConvertedAmount('');
      }
    } else {
      setConvertedAmount(amount);
    }
  };

  const handleManualPayment = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/payments/manual-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: 1, // Replace with actual user ID
          amount: parseFloat(convertedAmount || amount),
          currency: selectedCurrency,
          payment_method: 'manual',
          status: 'completed',
        }),
      });
      const data = await response.json();
      toast({
        title: "Manual payment recorded",
        description: `Payment of ${convertedAmount || amount} ${selectedCurrency} has been recorded.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record manual payment.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    toast({
      title: "Payment successful",
      description: `Your payment of ${convertedAmount || amount} ${selectedCurrency} has been processed.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box width="100%" p={5}>
      <Heading as="h2" size="xl" mb={5}>Payment Handler</Heading>
      <VStack spacing={4} align="stretch">
        <FormControl>
          <FormLabel>Amount ({baseCurrency})</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Base Currency</FormLabel>
          <Select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
            {config.SUPPORTED_CURRENCIES.map((curr) => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </Select>
        </FormControl>
        {convertedAmount && baseCurrency !== selectedCurrency && (
          <Text>
            Converted amount: {convertedAmount} {selectedCurrency}
          </Text>
        )}
        <FormControl>
          <FormLabel>Payment Method</FormLabel>
          <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="stripe">Stripe</option>
            <option value="manual">Manual Payment</option>
          </Select>
        </FormControl>
        {paymentMethod === 'stripe' ? (
          <Elements stripe={stripePromise}>
            <PaymentForm
              amount={parseFloat(convertedAmount || amount)}
              currency={selectedCurrency}
              onSuccess={handlePaymentSuccess}
            />
          </Elements>
        ) : (
          <Button colorScheme="purple" onClick={handleManualPayment}>
            Record Manual Payment
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default PaymentHandler;
