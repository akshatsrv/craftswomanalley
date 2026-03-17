export type OrderItem = { name: string; quantity: number; price: string; image?: string };

const STATE_GST_CODES: Record<string, string> = {
  "jammu and kashmir": "01",
  "himachal pradesh": "02",
  "punjab": "03",
  "chandigarh": "04",
  "uttarakhand": "05",
  "haryana": "06",
  "delhi": "07",
  "rajasthan": "08",
  "uttar pradesh": "09",
  "bihar": "10",
  "sikkim": "11",
  "arunachal pradesh": "12",
  "nagaland": "13",
  "manipur": "14",
  "mizoram": "15",
  "tripura": "16",
  "meghalaya": "17",
  "assam": "18",
  "west bengal": "19",
  "jharkhand": "20",
  "odisha": "21",
  "chhattisgarh": "22",
  "madhya pradesh": "23",
  "gujarat": "24",
  "maharashtra": "27",
  "andhra pradesh": "37",
  "karnataka": "29",
  "goa": "30",
  "lakshadweep": "31",
  "kerala": "32",
  "tamil nadu": "33",
  "puducherry": "34",
  "andaman and nicobar islands": "35",
  "telangana": "36",
  "ladakh": "38",
  "dadra and nagar haveli and daman and diu": "26"
};

// ─── Generate unique order ID ─────────────────────────────────────────────────
export function generateOrderId(): string {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CWA-${ts}-${rand}`;
}

// ─── Estimated delivery date (12 business days from now) ─────────────────────
export function getEstimatedDelivery(): string {
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
export function buildCustomerEmail(
  customer: Record<string, string>, 
  items: OrderItem[], 
  total: number, 
  orderId: string, 
  estimatedDelivery: string,
  paymentMethod: string = "Prepaid",
  taxAmount: number = 0
): string {
  const subtotal = total - taxAmount;
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
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmed – CraftswomanAlley</title>
  <style>
    @media only screen and (max-width: 600px) {
      .main-content { padding: 20px 15px !important; }
      .header { padding: 24px 20px !important; }
      .section { padding: 24px 20px !important; }
      .status-text { font-size: 8px !important; }
      .footer { padding: 24px 20px !important; }
      h1 { font-size: 24px !important; }
      .order-box { padding: 16px !important; }
      .order-details td { display: block !important; width: 100% !important; text-align: left !important; padding-bottom: 10px; }
      .customer-info td { display: block !important; width: 100% !important; padding-right: 0 !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:#f5f0eb; font-family: 'Georgia', serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0eb;" class="main-content">
    <tr><td align="center" style="padding: 40px 10px;">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

        <!-- HEADER -->
        <tr>
          <td class="header" style="background: linear-gradient(135deg, #2d1b4e 0%, #7c4dff 100%); border-radius:16px 16px 0 0; padding: 32px 40px; text-align:center;">
            <p style="margin:0 0 4px; color:rgba(255,255,255,0.7); font-size:10px; letter-spacing:0.4em; text-transform:uppercase; font-family:sans-serif;">CraftswomanAlley</p>
            <h1 style="margin:0; color:#fff; font-size:32px; font-weight:400; letter-spacing:-1px;">Order Confirmed ✨</h1>
            <p style="margin:12px 0 0; color:rgba(255,255,255,0.8); font-size:14px; font-style:italic;">Your artisanal treasures are on their way</p>
          </td>
        </tr>

        <!-- ORDER STATUS BAR -->
        <tr>
          <td class="section" style="background:#fff; padding: 24px 40px; border-bottom: 1px solid #f0f0f0;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align:center; width:25%;">
                  <div style="width:32px; height:32px; background:#7c4dff; border-radius:50%; margin:0 auto 8px; display:flex; align-items:center; justify-content:center; font-size:14px; line-height:32px; text-align:center; color:#fff; font-family:sans-serif;">✓</div>
                  <p class="status-text" style="margin:0; font-size:10px; font-family:sans-serif; color:#7c4dff; font-weight:700; text-transform:uppercase; letter-spacing:0.1em;">Order Placed</p>
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
          <td class="section" style="background:#fff; padding: 32px 40px 0;">
            <p style="margin:0 0 4px; font-size:22px; color:#1a1a1a;">Hi ${customer.name},</p>
            <p style="margin:0; font-size:14px; color:#666; font-family:sans-serif; line-height:1.6;">Your order has been successfully placed. Our artisan will begin crafting your treasures with love and care.</p>
          </td>
        </tr>

        ${items.some(item => item.name.toLowerCase().includes('journal') || item.name.toLowerCase().includes('scrapbook')) ? `
        <!-- PERSONALIZATION CTA -->
        <tr>
          <td class="section" style="background:#fff; padding: 24px 40px 0;">
            <div style="background:#f0e6ff; border:2px solid #e0d5f5; border-radius:12px; padding:24px; text-align:center;">
              <p style="margin:0 0 8px; font-family:sans-serif; font-size:10px; font-weight:700; color:#7c4dff; text-transform:uppercase; letter-spacing:0.1em;">Action Required</p>
              <h2 style="margin:0 0 12px; font-size:20px; color:#1a1a1a; font-weight:600;">Complete Your Personalization</h2>
              <p style="margin:0 0 20px; font-size:13px; color:#666; font-family:sans-serif; line-height:1.5;">To create your bespoke journal, please share your cherished quotes, photos, and dates through our secure form.</p>
              <a href="https://forms.gle/CWA-Personalisation" style="background:#7c4dff; color:#fff; padding:14px 28px; border-radius:8px; text-decoration:none; font-family:sans-serif; font-size:14px; font-weight:700; display:inline-block; box-shadow:0 4px 12px rgba(124, 77, 255, 0.3);">Open Personalization Form</a>
              <p style="margin:16px 0 0; font-size:11px; color:#999; font-family:sans-serif;">🛡️ Your details are handled with utmost care and privacy.</p>
            </div>
          </td>
        </tr>
        ` : ""}

        <!-- ORDER DETAILS BOX -->
        <tr>
          <td class="section" style="background:#fff; padding: 24px 40px;">
            <div class="order-box" style="background:#f9f5f0; border-radius:12px; padding:24px; border-left:4px solid #7c4dff;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr class="order-details">
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
          <td class="section" style="background:#fff; padding: 0 40px;">
            <p style="margin:0 0 16px; font-size:16px; color:#1a1a1a; border-bottom:1px solid #f0f0f0; padding-bottom:12px;">Your Artisanal Selections</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${itemsHtml}
            </table>
          </td>
        </tr>

        <!-- TOTAL -->
        <tr>
          <td class="section" style="background:#fff; padding: 16px 40px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-family:sans-serif; font-size:12px; color:#888; padding:4px 0;">Subtotal</td>
                <td style="text-align:right; font-family:sans-serif; font-size:12px; color:#888;">₹${subtotal.toLocaleString("en-IN")}</td>
              </tr>
              ${customer.state?.toLowerCase().trim() === "rajasthan" ? `
                <tr>
                  <td style="font-family:sans-serif; font-size:12px; color:#888; padding:4px 0;">CGST (9%) - Code 08</td>
                  <td style="text-align:right; font-family:sans-serif; font-size:12px; color:#888;">₹${Math.floor(taxAmount / 2).toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td style="font-family:sans-serif; font-size:12px; color:#888; padding:4px 0;">SGST (9%) - Code 08</td>
                  <td style="text-align:right; font-family:sans-serif; font-size:12px; color:#888;">₹${(taxAmount - Math.floor(taxAmount / 2)).toLocaleString("en-IN")}</td>
                </tr>
              ` : `
                <tr>
                  <td style="font-family:sans-serif; font-size:12px; color:#888; padding:4px 0;">IGST (18%) ${STATE_GST_CODES[customer.state?.toLowerCase().trim() || ""] ? `- Code ${STATE_GST_CODES[customer.state?.toLowerCase().trim() || ""]}` : ''}</td>
                  <td style="text-align:right; font-family:sans-serif; font-size:12px; color:#888;">₹${taxAmount.toLocaleString("en-IN")}</td>
                </tr>
              `}
              <tr>
                <td style="font-family:sans-serif; font-size:12px; color:#888; padding:4px 0;">Shipping</td>
                <td style="text-align:right; font-family:sans-serif; font-size:12px; color:#2ecc71; font-weight:700;">FREE</td>
              </tr>
              <tr>
                <td colspan="2" style="border-top:1px solid #f0f0f0; padding-top:12px; margin-top:8px;"></td>
              </tr>
              <tr>
                <td style="font-size:18px; color:#1a1a1a; font-weight:600;">${paymentMethod === "COD" ? "To be Paid (COD)" : "Amount Paid"}</td>
                <td style="text-align:right; font-size:20px; color:#7c4dff; font-weight:700; font-family:sans-serif;">₹${total.toLocaleString("en-IN")}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- DELIVERY ADDRESS -->
        <tr>
          <td class="section" style="background:#fff; padding: 0 40px 32px;">
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
          <td class="footer" style="background: linear-gradient(135deg, #2d1b4e 0%, #7c4dff 100%); border-radius:0 0 16px 16px; padding: 32px 40px; text-align:center;">
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
export function buildAdminEmail(
  customer: Record<string, string>, 
  items: OrderItem[], 
  total: number, 
  orderId: string,
  paymentMethod: string = "Prepaid",
  taxAmount: number = 0
): string {
  const subtotal = total - taxAmount;
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
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order – ${orderId}</title>
  <style>
    @media only screen and (max-width: 600px) {
      .main-content { padding: 20px 10px !important; }
      .header { padding: 20px !important; }
      .section { padding: 20px !important; }
      .meta-td { display: block !important; width: 100% !important; text-align: left !important; padding: 10px 0 !important; }
      .customer-td { display: block !important; width: 100% !important; padding: 0 !important; margin-bottom: 20px !important; }
      .items-table th, .items-table td { font-size: 11px !important; padding: 8px 4px !important; }
    }
  </style>
</head>
<body style="margin:0; padding:0; background:#f0f0f0; font-family:sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;" class="main-content">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.08);">

        <!-- HEADER -->
        <tr>
          <td class="header" style="background:#1a1a1a; padding:28px 40px; border-bottom:3px solid #7c4dff;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <p style="margin:0; color:rgba(255,255,255,0.5); font-size:10px; letter-spacing:0.4em; text-transform:uppercase;">CraftswomanAlley</p>
                  <h1 style="margin:4px 0 0; color:#fff; font-size:22px; font-weight:600;">🛍️ New Order Received!</h1>
                </td>
                <td style="text-align:right;">
                  <div style="background:${paymentMethod === "COD" ? "#A0522D" : "#7c4dff"}; color:#fff; padding:8px 16px; border-radius:20px; font-size:11px; font-weight:700; letter-spacing:0.1em;">${paymentMethod === "COD" ? "COD ORDER" : "PAID PREPAID"}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ORDER META -->
        <tr>
          <td class="section" style="padding:24px 40px; border-bottom:1px solid #f0f0f0; background:#fafafa;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td class="meta-td" style="width:33%">
                  <p style="margin:0 0 4px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888;">Order ID</p>
                  <p style="margin:0; font-size:14px; font-weight:700; color:#1a1a1a;">${orderId}</p>
                </td>
                <td class="meta-td" style="width:33%; text-align:center;">
                  <p style="margin:0 0 4px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888;">Order Time</p>
                  <p style="margin:0; font-size:13px; font-weight:600; color:#1a1a1a;">${orderDate}</p>
                </td>
                <td class="meta-td" style="width:33%; text-align:right;">
                  <p style="margin:0 0 4px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888;">Total</p>
                  <p style="margin:0; font-size:20px; font-weight:700; color:#7c4dff;">₹${total.toLocaleString("en-IN")}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CUSTOMER DETAILS -->
        <tr>
          <td class="section" style="padding:24px 40px 0;">
            <p style="margin:0 0 16px; font-size:15px; font-weight:700; color:#1a1a1a; border-bottom:1px solid #f0f0f0; padding-bottom:8px;">👤 Customer Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td class="customer-td" style="width:50%; vertical-align:top; padding-right:16px;">
                  <p style="margin:0 0 6px; font-size:13px; color:#555;"><strong>Name:</strong> ${customer.name}</p>
                  <p style="margin:0 0 6px; font-size:13px; color:#555;"><strong>Email:</strong> <a href="mailto:${customer.email}" style="color:#7c4dff;">${customer.email}</a></p>
                  <p style="margin:0; font-size:13px; color:#555;"><strong>Phone:</strong> ${customer.phone}</p>
                </td>
                <td class="customer-td" style="width:50%; vertical-align:top; background:#f9f5f0; padding:12px 16px; border-radius:8px;">
                  <p style="margin:0 0 4px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888;">📦 Ship To</p>
                  <p style="margin:0; font-size:13px; color:#1a1a1a; line-height:1.8;">${customer.address}, ${customer.city} – ${customer.pincode}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ORDER ITEMS -->
        <tr>
          <td class="section" style="padding:24px 40px 0;">
            <p style="margin:0 0 16px; font-size:15px; font-weight:700; color:#1a1a1a; border-bottom:1px solid #f0f0f0; padding-bottom:8px;">🎁 Items Ordered</p>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;" class="items-table">
              <tr style="background:#f9f5f0;">
                <th style="padding:10px 8px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888; text-align:left;">Product</th>
                <th style="padding:10px 8px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888; text-align:center;">Qty</th>
                <th style="padding:10px 8px; font-size:10px; text-transform:uppercase; letter-spacing:0.2em; color:#888; text-align:right;">Price</th>
              </tr>
              ${itemsHtml}
              <tr style="border-top:1px solid #f0f0f0;">
                <td colspan="2" style="padding:8px 8px; font-size:13px; color:#888;">Subtotal</td>
                <td style="padding:8px 8px; font-size:13px; color:#1a1a1a; text-align:right;">₹${subtotal.toLocaleString("en-IN")}</td>
              </tr>
              ${customer.state?.toLowerCase().trim() === "rajasthan" ? `
                <tr>
                  <td colspan="2" style="padding:4px 8px; font-size:13px; color:#888;">CGST (9%) - Code 08</td>
                  <td style="padding:4px 8px; font-size:13px; color:#1a1a1a; text-align:right;">₹${Math.floor(taxAmount / 2).toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:4px 8px; font-size:13px; color:#888;">SGST (9%) - Code 08</td>
                  <td style="padding:4px 8px; font-size:13px; color:#1a1a1a; text-align:right;">₹${(taxAmount - Math.floor(taxAmount / 2)).toLocaleString("en-IN")}</td>
                </tr>
              ` : `
                <tr>
                  <td colspan="2" style="padding:4px 8px; font-size:13px; color:#888;">IGST (18%) ${STATE_GST_CODES[customer.state?.toLowerCase().trim() || ""] ? `- Code ${STATE_GST_CODES[customer.state?.toLowerCase().trim() || ""]}` : ''}</td>
                  <td style="padding:4px 8px; font-size:13px; color:#1a1a1a; text-align:right;">₹${taxAmount.toLocaleString("en-IN")}</td>
                </tr>
              `}
              <tr>
                <td colspan="2" style="padding:16px 8px; font-size:15px; font-weight:700;">Grand Total</td>
                <td style="padding:16px 8px; font-size:18px; font-weight:700; color:#7c4dff; text-align:right;">₹${total.toLocaleString("en-IN")}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td class="section" style="padding:24px 40px; margin-top:16px; text-align:center; background:#fafafa; border-top:1px solid #f0f0f0;">
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
