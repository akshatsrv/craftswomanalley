import { NextResponse } from "next/server";
import { Resend } from "resend";
import { 
  generateOrderId, 
  getEstimatedDelivery, 
  buildCustomerEmail, 
  buildAdminEmail 
} from "@/lib/order-utils";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = "support@craftswomanalley.com";

export async function GET() {
  if (!resend) {
    return NextResponse.json({ error: "RESEND_API_KEY not found in .env.local" }, { status: 500 });
  }

  const orderId = generateOrderId();
  const estimatedDelivery = getEstimatedDelivery();
  
  const sampleCustomer = {
    name: "Test Customer",
    email: "akshatsharma.srv@gmail.com", // This will receive the confirmation
    phone: "9876543210",
    address: "102, Ardee City, Sector 52",
    city: "Gurugram",
    pincode: "122003"
  };

  const sampleItems = [
    { name: "Velvet Tulip – Eternal Bloom", quantity: 1, price: "₹499" },
    { name: "Parchment Scroll", quantity: 1, price: "₹899" }
  ];

  const total = 1398;

  try {
    // Using your freshly verified business domain!
    const SENDER_EMAIL = "CraftswomanAlley <support@craftswomanalley.com>";

    const data = await resend.emails.send({
      from: SENDER_EMAIL,
      to: sampleCustomer.email,
      subject: `✨ Order Confirmed! ${orderId} – CraftswomanAlley`,
      html: buildCustomerEmail(sampleCustomer, sampleItems, total, orderId, estimatedDelivery),
    });

    return NextResponse.json({ 
      success: true, 
      message: "Sample email fired! Check your inbox.",
      orderId,
      resendResponse: data 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
