const express = require("express");
const cors = require("cors")
const app = express();

const port = process.env.PORT || 4242

// This is your test secret API key.
const stripe = require("stripe")('sk_test_51M1pSXISRMAhtHgJhZj9unrwCxiyQdZi569zbgiM2D52A7uIW9NXCDDKg3i19xmMLlffEBoPYSyf0P4j5pmTRITB00ASzJpik3');


app.use(express.json());
app.use(cors({
  "origin": "*",
}))

app.options('*', cors())

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.get("/", (req, res) => {
  res.json({"hello": "Hi there"})
})

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.listen(port, () => console.log("Node server listening on port 4242!"));