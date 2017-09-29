const stripe = require('../constants/stripe');

const postStripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr });
  } else {
    res.status(200).send({ success: stripeRes });
  }
}

module.exports = {
  getMsg: (req, res) => {

    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
  },
  postCharge: (req, res) => {
    stripe.charges.create(req.body, postStripeCharge(res));
  }
}