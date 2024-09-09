import React from 'react';
import { ChakraProvider, Box, VStack, Grid, extendTheme } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AccountManager from './components/AccountManager';
import PostCreator from './components/PostCreator';
import Analytics from './components/Analytics';
import URLShortener from './components/URLShortener';
import AdminPanel from './components/AdminPanel';
import PaymentHandler from './components/PaymentHandler';
import Calendar from './components/Calendar';
import InsightPage from './components/InsightPage';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import ForgotPassword from './components/ForgotPassword';
import PricingPage from './components/PricingPage';
import Inbox from './components/Inbox';
import { CurrencyProvider } from './contexts/CurrencyContext';

const theme = extendTheme({
  colors: {
    purple: {
      50: '#f5e9ff',
      100: '#dac1ff',
      200: '#c098ff',
      300: '#a56eff',
      400: '#8b45ff',
      500: '#721bff',
      600: '#5a00e6',
      700: '#4400b3',
      800: '#2e0080',
      900: '#18004d',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'purple.50',
        color: 'purple.900',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        _hover: {
          bg: 'purple.400',
        },
      },
      variants: {
        solid: {
          bg: 'purple.500',
          color: 'white',
        },
        outline: {
          borderColor: 'purple.500',
          color: 'purple.500',
        },
      },
    },
    Heading: {
      baseStyle: {
        color: 'purple.800',
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <CurrencyProvider>
        <Router>
          <Box textAlign="center" fontSize="xl">
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route
                path="*"
                element={
                  <Grid minH="100vh" p={3} bg="purple.50">
                    <VStack spacing={8}>
                      <Header />
                      <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/accounts" element={<AccountManager />} />
                        <Route path="/posts" element={<PostCreator />} />
                        <Route path="/analytics" element={<Analytics />} />
                        <Route path="/url-shortener" element={<URLShortener />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/payments" element={<PaymentHandler />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/insights" element={<InsightPage />} />
                        <Route path="/inbox" element={<Inbox />} />
                      </Routes>
                    </VStack>
                  </Grid>
                }
              />
            </Routes>
          </Box>
        </Router>
      </CurrencyProvider>
    </ChakraProvider>
  );
}

export default App;
