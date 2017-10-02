import React from 'react'
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

// import STRIPE_PUBLISHABLE from './constants/stripe';
// import PAYMENT_SERVER_URL from './constants/server';

const CURRENCY = 'USD';

const fromDolToCent = amount => amount * 100;

const successPayment = data => {
  console.log('Payment Successful');
};

const errorPayment = data => {
  console.log('Payment Error');
};

const postTrx = function (data, renterId) {
  data.forEach(item => {
  axios.post('/api/renttrx',
    {
      renteeId: item.rentee_id,
      renterId: renterId,
      startDate: item.startDate,
      endDate: item.endDate,
      item_id: item.id,
    })
    .then((data) => {
      console.log('posting trx successful')
    })
    .catch((err) => {
      console.log('posting trx err', err)
    })
  })
}

const onToken = (amount, description, cart, renterId, emptyCart) => token =>
  axios.post('/api/item/payment',
    {
      description,
      source: token.id,
      currency: CURRENCY,
      amount: fromDolToCent(amount)
    })
    .then(successPayment)
    .then(postTrx(cart, renterId))
    .then(() => emptyCart())
    .catch(errorPayment);
    
const Checkout = ({ cart, label, name, description, amount, renterId, length, emptyCart }) =>
  <StripeCheckout 
    label={label}
    image="https://i.imgur.com/NP3wjfn.png"
    name={name}
    description={description}
    amount={fromDolToCent(amount)}
    token={onToken(amount, description, cart, renterId, emptyCart)}
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