import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { StoreProvider } from './context/StoreContext';
import RegisterPage from './pages/RegisterPage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import CatPage from './pages/CatPage';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import CheckoutPage from './pages/CheckoutPage';
import {Elements, Stripe} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './components/forms/CheckoutForm';
import SuccesPage from './pages/SuccesPage';



// const stripePromise = loadStripe('pk_test_51ONQ20DXBwOdH4dJssO46tXGfLuQmKPQrTRDERGcp6xaYpa0IFB1fcBwYQ5DYu5a6QdZmbahzkxFqHIAOhFLBvbA007J6WAZVI');

// how can i integrate Stripe into my app?
// https://stripe.com/docs/payments/integration-builder

function App() {

  // const [clientSecret, setClientSecret] = useState("");

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  // const appearance = {
  //   theme: 'stripe',
  // };
  // const options = {
  //   clientSecret,
  //   appearance,
  // };

  return (
    <>
      <Router>
        {/* <Elements stripe={stripePromise} > */}
        <AuthProvider>
          <CartProvider>
            <StoreProvider>
              <Header/>
              <Routes> 
                <Route path='/' Component={HomePage}/>
                <Route path='/login' Component={LoginPage}/>
                <Route path='/register' Component={RegisterPage}/>
                <Route path='/store' Component={CatPage}/>
                <Route path='/store/:id' Component={ProductPage}/>
                <Route path='/my-order' Component={OrderPage}/>
                <Route path='/my-order/checkout' Component={CheckoutPage}/>
                <Route path='/my-order/success' Component={SuccesPage}/>
                {/* <Route path='/my-order/stripe-checkout' Component={CheckoutForm}/> */}
              </Routes>
              <Footer/>
            </StoreProvider> 
          </CartProvider>
        </AuthProvider>
        {/* </Elements>  */}
      </Router>
    </>
  )
}

export default App;


