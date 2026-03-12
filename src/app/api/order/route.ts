import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, total } = body;

    // 1. Simulate Order Storage
    console.log("--- NEW ORDER RECEIVED ---");
    console.log("Customer:", customer);
    console.log("Items:", items);
    console.log("Total:", total);

    // 2. Notification System
    const emailSubject = `New Order from ${customer.name} - CraftswomanAlley`;
    const emailHtml = `
      <div style="font-family: serif; padding: 40px; color: #1a1a1a;">
        <h1 style="font-size: 24px;">New Artisanal Order</h1>
        <p>You have received a new order from physical soul <strong>${customer.name}</strong> (${customer.email}).</p>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 12px; margin: 24px 0;">
          <h2 style="font-size: 18px;">Customer Details</h2>
          <p>Phone: ${customer.phone}</p>
          <p>Address: ${customer.address}, ${customer.city} - ${customer.pincode}</p>
        </div>
        <div style="margin: 24px 0;">
          <h2 style="font-size: 18px;">Items</h2>
          <ul>
            ${items.map((item: { name: string; quantity: number; price: string }) => `<li>${item.name} x ${item.quantity} - ${item.price}</li>`).join('')}
          </ul>
        </div>
        <p style="font-size: 20px; color: #7c4dff; font-weight: bold;">Total: ₹${total}</p>
      </div>
    `;

    if (resend) {
      await resend.emails.send({
        from: 'CraftswomanAlley <onboarding@resend.dev>', // Resend default for testing
        to: process.env.OWNER_EMAIL || customer.email, // Fallback to customer for testing
        subject: emailSubject,
        html: emailHtml,
      });
      console.log("RESEND EMAIL SENT");
    } else {
      console.log("RESEND_API_KEY MISSING. SIMULATED EMAIL LOGGED.");
    }

    return NextResponse.json({ success: true, message: "Order processed and notification triggered" });
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json({ success: false, error: "Failed to process order" }, { status: 500 });
  }
}
