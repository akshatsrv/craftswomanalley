import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { 
  generateOrderId, 
  getEstimatedDelivery, 
  buildCustomerEmail, 
  buildAdminEmail, 
  OrderItem 
} from "@/lib/order-utils";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = "support@craftswomanalley.com";

export async function POST(request: Request) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      customer,
      items,
      total,
      taxAmount
    } = await request.json();

    // 1. Verify Payment Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    const orderId = generateOrderId();
    const estimatedDelivery = getEstimatedDelivery();

    if (!isAuthentic) {
      return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
    }

    // 2. Payment is valid, finalize order
    console.log("\n━━━━━━━━━━ NEW VERIFIED ORDER ━━━━━━━━━━");
    console.log("Order ID    :", orderId);
    console.log("Payment ID  :", razorpay_payment_id);
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
          subject: `✨ Order Confirmed! ${orderId} – CraftswomanAlley`,
          html: buildCustomerEmail(customer, items, total, orderId, estimatedDelivery, "Prepaid", taxAmount),
          replyTo: ADMIN_EMAIL,
        }),
        resend.emails.send({
          from: SENDER_EMAIL,
          to: ADMIN_EMAIL,
          subject: `🛍️ New Order ${orderId} – ₹${total} from ${customer.name}`,
          html: buildAdminEmail(customer, items, total, orderId, "Prepaid", taxAmount),
          replyTo: customer.email,
        }),
      ]);
      console.log("✅ Emails sent for verified order.");
    }

    return NextResponse.json({
      success: true,
      orderId,
      estimatedDelivery,
      paymentId: razorpay_payment_id
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 });
  }
}
