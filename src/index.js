import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const queryClient = new QueryClient();

const stripePromise = loadStripe('pk_test_51ONQ20DXBwOdH4dJssO46tXGfLuQmKPQrTRDERGcp6xaYpa0IFB1fcBwYQ5DYu5a6QdZmbahzkxFqHIAOhFLBvbA007J6WAZVI');

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <QueryClientProvider client={queryClient}>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
    <ReactQueryDevtools initialIsOpen />
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();