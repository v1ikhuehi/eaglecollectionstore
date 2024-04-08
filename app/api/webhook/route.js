const stripe = require("stripe")(process.env.STRIPE_SK);
import { mongooseConnect } from "@/lib/connectDB";
import OrderModel from "@/model/OrderModel";

export async function POST(req) {
  //connected to database
  await mongooseConnect();

  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

  const sig = req.headers.get("stripe-signature");

  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (error) {
    return new Response(JSON.stringify(`Webhook Error: ${error.message}`), {
      status: 400,
    });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const paymentData = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      const { payment_status, metadata, shipping_details } = paymentData;

      const orderId = metadata.orderId;
      const address = shipping_details.address;
      if (payment_status === "paid" || orderId) {
        await OrderModel.findByIdAndUpdate(orderId, {
          paid: true,
          address: address,
          status: "Pending",
        });
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new Response(JSON.stringify("successful payment"), { status: 200 });
}
