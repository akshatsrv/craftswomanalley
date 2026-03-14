import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const ADMIN_EMAIL = "craftswomanalley@gmail.com";

type OrderItem = { name: string; quantity: number; price: string; image?: string };

// ─── Generate unique order ID ─────────────────────────────────────────────────
function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CWA-${ts}-${rand}`;
}

// ─── Estimated delivery date (12 business days from now) ─────────────────────
function getEstimatedDelivery(): string {
  const date = new Date();
  let added = 0;
  while (added < 12) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return date.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

// ─── Customer confirmation email (Flipkart-style) ────────────────────────────
function buildCustomerEmail(customer: Record<string, string>, items: OrderItem[], total: number, orderId: string, estimatedDelivery: string): string {
  const itemsHtml = items.map((item) => `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid #f0f0f0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="60" style="vertical-align: top; padding-right: 16px;">
              <div style="width:56px; height:56px; background:#f9f5f0; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:24px; text-align:center; line-height:56px;">🎁</div>
            </td>
            <td style="vertical-align: top;">
              <p style="margin:0; font-size:14px; font-weight:600; color:#1a1a1a;">${item.name}</p>
              <p style="margin:4px 0 0; font-size:12px; color:#888;">Qty: ${item.quantity}</p>
              <p style="margin:4px 0 0; font-size:13px; color:#7c4dff; font-weight:700;">${item.price}</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Order Confirmed – CraftswomanAlley</title></head>
<body style="margin:0; padding:0; background:#f5f0eb; font-family: 'Georgia', serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb; padding: 40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

        <!-- HEADER -->
        <tr>
          <td style="background: linear-gradient(135deg, #2d1b4e 0%, #7c4dff 100%); border-radius:16px 16px 0 0; padding: 32px 40px; text-align:center;">
            <p style="margin:0 0 4px; color:rgba(255,255,255,0.7); font-size:10px; letter-spacing:0.4em; text-transform:uppercase; font-family:sans-serif;">CraftswomanAlley</p>
            <h1 style="margin:0; color:#fff; font-size:32px; font-weight:400; letter-spacing:-1px;">Order Confirmed ✨</h1>
            <p style="margin:12px 0 0; color:rgba(255,255,255,0.8); font-size:14px; font-style:italic;">Your artisanal treasures are on their way</p>
          </td>
        </tr>

        <!-- ORDER STATUS BAR -->
        <tr>
          <td style="background:#fff; padding: 24px 40px; border-bottom: 1px solid #f0f0f0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align:center; width:25%;">
                  <div style="width:32px; height:32px; background:#7c4dff; border-radius:50%; margin:0 auto 8px; display:flex; align-items:center; justify-content:center; font-size:14px; line-height:32px; text-align:center; color:#fff; font-family:sans-serif;">✓</div>
                  <p style="margin:0; font-size:10px; font-family:sans-serif; color:#7c4dff; font-weight:700; text-transform:uppercase; letter-spacing:0.1em;">Order Placed</p>
                </td>
                <td style="height:2px; background: linear-gradient(to right, #7c4dff, #e0d5f5); vertical-align:middle;"></td>
                <td style="text-align:center; width:25%;">
                  <div style="width:32px; height:32px; background:#e0d5f5; border-radius:50%; margin:0 auto 8px; line-height:32px; text-align:center; font-size:12px;">📦</div>
                  <p style="margin:0; font-size:10px; font-family:sans-serif; color:#aaa; font-weight:600; text-transform:uppercase; letter-spacing:0.1em;">Crafting</p>
                </td>
                <td style="height:2px; background:#f0f0f0; vertical-align:middle;"></td>
                <td style="text-align:center; width:25%;">
                  <div style="width:32px; height:32px; background:#f0f0f0; border-radius:50%; margin:0 auto 8px; line-height:32px; text-align:center; font-size:12px;">🚚</div>
                  <p style="margin:0; font-size:10px; font-family:sans-serif; color:#aaa; font-weight:600; text-transform:uppercase; letter-spacing:0.1em;">Shipped</p>
                </td>
                <td style="height:2px; background:#f0f0f0; vertical-align:middle;"></td>
                <td style="text-align:center; width:25%;">
                  <div style="width:32px; height:32px; background:#f0f0f0; border-radius:50%; margin:0 auto 8px; line-height:32px; text-align:center; font-size:12px;">🏠</div>
                  <p style="margin:0; font-size:10px; font-family:sans-serif; color:#aaa; font-weight:600; text-transform:uppercase; letter-spacing:0.1em;">Delivered</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- GREETING & ORDER INFO -->
        <tr>
          <td style="background:#fff; padding: 32px 40px 0;">
            <p style="margin:0 0 4px; font-size:22px; color:#1a1a1a;">Hi ${customer.name},</p>
            <p style="margin:0; font-size:14px; color:#666; font-family:sans-serif; line-height:1.6;">Your order has been successfully placed. Our artisan will begin crafting your treasures with love and care.</p>
          </td>
        </tr>

        <!-- ORDER DETAILS BOX -->
        <tr>
          <td style="background:#fff; padding: 24px 40px;">
            <div style="background:#f9f5f0; border-radius:12px; padding:24px; border-left:4px solid #7c4dff;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:top; width:50%;">
                    <p style="margin:0 0 4px; font-size:10px; font-family:sans-serif; text-transform:uppercase; letter-spacing:0.2em; color:#888;">Order ID</p>
                    <p style="margin:0; font-size:14px; font-family:sans-serif; font-weight:700; color:#1a1a1a;">${orderId}</p>
                  </td>
                  <td style="vertical-align:top; text-align:right; width:50%;">
                    <p style="margin:0 0 4px; font-size:10px; font-family:sans-serif; text-transform:uppercase; letter-spacing:0.2em; color:#888;">Expected Delivery</p>
                    <p style="margin:0; font-size:14px; font-family:sans-serif; font-weight:700; color:#7c4dff;">${estimatedDelivery}</p>
                  </td>
                </tr>
              </table>
            </div>
          </td>
        </tr>

        <!-- ITEMS -->
        <tr>
          <td style="background:#fff; padding: 0 40px;">
            <p style="margin:0 0 16px; font-size:16px; color:#1a1a1a; border-bottom:1px solid #f0f0f0; padding-bottom:12px;">Your Artisanal Selections</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${itemsHtml}
            </table>
          </td>
        </tr>

        <!-- TOTAL -->
        <tr>
          <td style="background:#fff; padding: 16px 40px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-family:sans-serif; font-size:12px; color:#888; padding:4px 0;">Subtotal</td>
                <td style="text-align:right; font-family:sans-serif; font-size:12px; color:#888;">₹${total.toLocaleString("en-IN")}</td>
              </tr>
              <tr>
                <td style="font-family:sans-serif; font-size:12px; color:#888; padding:4px 0;">Shipping</td>
                <td style="text-align:right; font-family:sans-serif; font-size:12px; color:#2ecc71; font-weight:700;">FREE</td>
              </tr>
              <tr>
                <td colspan="2" style="border-top:1px solid #f0f0f0; padding-top:12px; margin-top:8px;"></td>
              </tr>
              <tr>
                <td style="font-size:18px; color:#1a1a1a; font-weight:600;">Amount Paid</td>
                <td style="text-align:right; font-size:20px; color:#7c4dff; font-weight:700; font-family:sans-serif;">₹${total.toLocaleString("en-IN")}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- DELIVERY ADDRESS -->
        <tr>
          <td style="background:#fff; padding: 0 40px 32px;">
            <div style="background:#f9f5f0; border-radius:12px; padding:20px;">
              <p style="margin:0 0 8px; font-size:10px; font-family:sans-serif; text-transform:uppercase; letter-spacing:0.2em; color:#888;">Delivery Address</p>
              <p style="margin:0; font-size:14px; font-family:sans-serif; color:#1a1a1a; line-height:1.7;">
                <strong>${customer.name}</strong><br/>
                ${customer.address}<br/>
                ${customer.city} – ${customer.pincode}<br/>
                📞 ${customer.phone}
              </p>
            </div>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="background: linear-gradient(135deg, #2d1b4e 0%, #7c4dff 100%); border-radius:0 0 16px 16px; padding: 32px 40px; text-align:center;">
            <p style="margin:0 0 12px; color:#fff; font-size:18px;">Thank you for shopping with CraftswomanAlley 💜</p>
            <p style="margin:0 0 20px; color:rgba(255,255,255,0.7); font-size:12px; font-family:sans-serif;">Questions? Reply to this email or contact us at craftswomanalley@gmail.com</p>
            <p style="margin:0; color:rgba(255,255,255,0.5); font-size:10px; font-family:sans-serif; letter-spacing:0.2em; text-transform:uppercase;">Handcrafted with love from our alley to yours</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Admin notification email ─────────────────────────────────────────────────
function buildAdminEmail(customer: Record<string, string>, items: OrderItem[], total: number, orderId: string): string {
  const itemsHtml = items.map((item) => `
    <tr style="border-bottom:1px solid #f0f0f0;">
      <td style="padding:12px 8px; font-family:sans-serif; font-size:13px; color:#1a1a1a;">${item.name}</td>
      <td style="padding:12px 8px; font-family:sans-serif; font-size:13px; color:#666; text-align:center;">${item.quantity}</td>
      <td style="padding:12px 8px; font-family:sans-serif; font-size:13px; color:#7c4dff; font-weight:700; text-align:right;">${item.price}</td>
    </tr>
  `).join("");

  const orderDate = new Date().toLocaleString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Order – ${orderId}</title></head>
<body style="margin:0; padding:0; background:#f0f0f0; font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px; background:#f0f0f0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- HEADER -->
        <tr>
          <td style="background:#1a1a1a; padding:28px 40px; border-bottom:3px solid #7c4dff;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0; color:rgba(255,255,255,0.5); font-size:10px; letter-spacing:0.4em; text-transform:uppercase;">CraftswomanAlley</p>
                  <h1 style="margin:4px 0 0; color:#fff; font-size:22px; font-weight:600;">🛍️ New Order Received!</h1>
                </td>
                <td style="text-align:right;">
                  <div style="background:#7c4dff; color:#fff; padding:8px 16px; border-radius:20px; font-size:11px; font-weight:700; letter-spacing:0.1em;">ORDER PLACED</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ORDER META -->
        <tr>
          <td style="padding:24px 40px; border-bottom:1px solid #f0f0f0; background:#fafafa;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:33%">
                  <p style="margin:0 0 4px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888;">Order ID</p>
                  <p style="margin:0; font-size:14px; font-weight:700; color:#1a1a1a;">${orderId}</p>
                </td>
                <td style="width:33%; text-align:center;">
                  <p style="margin:0 0 4px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888;">Order Time</p>
                  <p style="margin:0; font-size:13px; font-weight:600; color:#1a1a1a;">${orderDate}</p>
                </td>
                <td style="width:33%; text-align:right;">
                  <p style="margin:0 0 4px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888;">Total</p>
                  <p style="margin:0; font-size:20px; font-weight:700; color:#7c4dff;">₹${total.toLocaleString("en-IN")}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CUSTOMER DETAILS -->
        <tr>
          <td style="padding:24px 40px 0;">
            <p style="margin:0 0 16px; font-size:15px; font-weight:700; color:#1a1a1a; border-bottom:1px solid #f0f0f0; padding-bottom:8px;">👤 Customer Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="width:50%; vertical-align:top; padding-right:16px;">
                  <p style="margin:0 0 6px; font-size:13px; color:#555;"><strong>Name:</strong> ${customer.name}</p>
                  <p style="margin:0 0 6px; font-size:13px; color:#555;"><strong>Email:</strong> <a href="mailto:${customer.email}" style="color:#7c4dff;">${customer.email}</a></p>
                  <p style="margin:0; font-size:13px; color:#555;"><strong>Phone:</strong> ${customer.phone}</p>
                </td>
                <td style="width:50%; vertical-align:top; background:#f9f5f0; padding:12px 16px; border-radius:8px;">
                  <p style="margin:0 0 4px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888;">📦 Ship To</p>
                  <p style="margin:0; font-size:13px; color:#1a1a1a; line-height:1.8;">${customer.address}, ${customer.city} – ${customer.pincode}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ORDER ITEMS -->
        <tr>
          <td style="padding:24px 40px 0;">
            <p style="margin:0 0 16px; font-size:15px; font-weight:700; color:#1a1a1a; border-bottom:1px solid #f0f0f0; padding-bottom:8px;">🎁 Items Ordered</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
              <tr style="background:#f9f5f0;">
                <th style="padding:10px 8px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888; text-align:left;">Product</th>
                <th style="padding:10px 8px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888; text-align:center;">Qty</th>
                <th style="padding:10px 8px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888; text-align:right;">Price</th>
              </tr>
              ${itemsHtml}
              <tr>
                <td colspan="2" style="padding:16px 8px; font-size:15px; font-weight:700;">Total</td>
                <td style="padding:16px 8px; font-size:18px; font-weight:700; color:#7c4dff; text-align:right;">₹${total.toLocaleString("en-IN")}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:24px 40px; margin-top:16px; text-align:center; background:#fafafa; border-top:1px solid #f0f0f0;">
            <p style="margin:0 0 4px; font-size:13px; color:#555;">Reply to this email to contact the customer directly at <a href="mailto:${customer.email}" style="color:#7c4dff;">${customer.email}</a></p>
            <p style="margin:0; font-size:11px; color:#aaa; letter-spacing:0.15em; text-transform:uppercase;">CraftswomanAlley Admin Dashboard</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── API Handler ──────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, total } = body as {
      customer: Record<string, string>;
      items: OrderItem[];
      total: number;
    };

    const orderId = generateOrderId();
    const estimatedDelivery = getEstimatedDelivery();

    // Always log order server-side
    console.log("\n━━━━━━━━━━ NEW ORDER ━━━━━━━━━━");
    console.log("Order ID :", orderId);
    console.log("Customer :", customer.name, `<${customer.email}>`);
    console.log("Phone    :", customer.phone);
    console.log("Address  :", `${customer.address}, ${customer.city} - ${customer.pincode}`);
    console.log("Items    :", items.map((i) => `${i.name} x${i.quantity}`).join(", "));
    console.log("Total    : ₹" + total);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    if (resend) {
      // Send BOTH emails in parallel
      await Promise.all([
        // 1. Customer order confirmation
        resend.emails.send({
          from: "CraftswomanAlley <onboarding@resend.dev>",
          to: customer.email,
          subject: `✨ Order Confirmed! ${orderId} – CraftswomanAlley`,
          html: buildCustomerEmail(customer, items, total, orderId, estimatedDelivery),
          replyTo: ADMIN_EMAIL,
        }),
        // 2. Admin notification
        resend.emails.send({
          from: "CraftswomanAlley Orders <onboarding@resend.dev>",
          to: ADMIN_EMAIL,
          subject: `🛍️ New Order ${orderId} – ₹${total} from ${customer.name}`,
          html: buildAdminEmail(customer, items, total, orderId),
          replyTo: customer.email,
        }),
      ]);
      console.log("✅ Both emails sent via Resend.");
    } else {
      console.log("⚠️  RESEND_API_KEY not set — emails logged above only.");
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
