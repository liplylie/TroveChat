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

const Checkout = ({ label, name, description, amount, length }) =>
  <StripeCheckout
    label={label}
    image="https://i.imgur.com/NP3wjfn.png"
    name={name}
    description={description}
    amount={fromDolToCent(amount)}
    token={onToken(amount, description)}
    currency={CURRENCY}
    billingAddress={true}
    shippingAddress={true}
    stripeKey={'pk_test_BtldIkOgEzoxf2fN7T8fxsMO'}
  >
  <button className={length>0 ? 'btn btn-primary checkout-btn' : "btn btn-primary checkout-btn checkout-btn-disabled"}>
    Check Out
  </button>
  </StripeCheckout>

export default Checkout;