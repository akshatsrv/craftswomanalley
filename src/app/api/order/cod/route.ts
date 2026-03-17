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
    const { customer, items, total, taxAmount = 0 } = await request.json();

    const orderId = generateOrderId();
    const estimatedDelivery = getEstimatedDelivery();

    console.log("\n━━━━━━━━━━ NEW COD ORDER ━━━━━━━━━━");
    console.log("Order ID    :", orderId);
    console.log("Method      : Cash on Delivery");
    console.log("Customer    :", customer.name, `<${customer.email}>`);
    console.log("Total       : ₹" + total);
    console.log("GST (18%)   : ₹" + taxAmount);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    if (resend) {
      const SENDER_EMAIL = "CraftswomanAlley <support@craftswomanalley.com>";
      
      await Promise.all([
        resend.emails.send({
          from: SENDER_EMAIL,
          to: customer.email,
          subject: `📦 COD Order Confirmed! ${orderId} – CraftswomanAlley`,
          html: buildCustomerEmail(customer, items, total, orderId, estimatedDelivery, "COD", taxAmount),
          replyTo: ADMIN_EMAIL,
        }),
        resend.emails.send({
          from: SENDER_EMAIL,
          to: ADMIN_EMAIL,
          subject: `🫴 NEW COD ORDER ${orderId} – ₹${total} from ${customer.name}`,
          html: buildAdminEmail(customer, items, total, orderId, "COD", taxAmount),
          replyTo: customer.email,
        }),
      ]);
      console.log("✅ COD Emails sent.");
    }

    return NextResponse.json({
      success: true,
      orderId,
      estimatedDelivery,
      paymentMethod: "COD"
    });
  } catch (error) {
    console.error("COD Order error:", error);
    return NextResponse.json({ error: "Failed to process COD order" }, { status: 500 });
  }
}
