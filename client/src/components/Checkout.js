import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

// import STRIPE_PUBLISHABLE from './constants/stripe';
// import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD';

const fromDolToCent = amount => amount * 100;

const successPayment = data => {
  alert('Payment Successful');
};

const errorPayment = data => {
  console.log('error!!!!!',data)
  alert('Payment Error');
};

const onToken = (amount, description) => token =>
  // console.log('in onToken')
  axios.post('/api/women/payment',
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDolToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const Checkout = ({ label, name, description, amount }) =>
  <StripeCheckout
    label={label}
    name={name}
    description={description}
    amount={fromDolToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={'pk_test_BtldIkOgEzoxf2fN7T8fxsMO'}
  />

export default Checkout;
// {/* billingAddress={true}
// shippingAddress={true} */}