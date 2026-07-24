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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, total } = body;

    const orderId = generateOrderId();
    const estimatedDelivery = getEstimatedDelivery();

    // Always log order server-side
    console.log("\n━━━━━━━━━━ NEW ORDER ━━━━━━━━━━");
    console.log("Order ID :", orderId);
    console.log("Customer :", customer.name, `<${customer.email}>`);
    console.log("Total    : ₹" + total);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    if (resend) {
      const SENDER_EMAIL = "CraftswomanAlley <support@craftswomanalley.com>";
      
      // Send BOTH emails in parallel
      await Promise.all([
        // 1. Customer order confirmation
        resend.emails.send({
          from: SENDER_EMAIL,
          to: customer.email,
          subject: `✨ Order Confirmed! ${orderId} – CraftswomanAlley`,
          html: buildCustomerEmail(customer, items, total, orderId, estimatedDelivery),
          replyTo: ADMIN_EMAIL,
        }),
        // 2. Admin notification
        resend.emails.send({
          from: SENDER_EMAIL,
          to: ADMIN_EMAIL,
          subject: `🛍️ New Order ${orderId} – ₹${total} from ${customer.name}`,
          html: buildAdminEmail(customer, items, total, orderId),
          replyTo: customer.email,
        }),
      ]);
      console.log("✅ Both emails sent via Resend.");
    }

    return NextResponse.json({
      success: true,
      orderId,
      estimatedDelivery,
      message: "Order placed and notifications sent",
    });
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json({ success: false, error: "Failed to process order" }, { status: 500 });
  }
}
