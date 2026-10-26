/**
 * Cloudflare Pages Function: POST /api/contact
 * Required Cloudflare Pages secret: RESEND_API_KEY
 *
 * DEMO MODE: notification recipients are the two inboxes supplied by the site owner.
 * Before production, verify sender/domain in Resend and replace the sender below with an approved address.
 */
const DEMO_RECIPIENTS = [
  "amcoachsalini@gmail.com",
  "confidencecoachsalini@gmail.com"
];
const FROM_EMAIL = "THE MANOMANTRA Website <onboarding@resend.dev>";
const MAX_FIELD = 3000;

function clean(value, max = 500) {
  return String(value ?? "").trim().replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").slice(0, max);
}
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[ch]);
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("Origin");
  const allowedOrigins = [
    "https://themanomantra.com",
    "https://www.themanomantra.com",
    "https://themanomantra.mypresento.com"
  ];
  if (origin && !allowedOrigins.includes(origin)) {
    return Response.json({ success: false, error: "Origin not allowed." }, { status: 403 });
  }
  if (!env.RESEND_API_KEY) {
    return Response.json({ success: false, error: "Email service is not configured." }, { status: 503 });
  }
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return Response.json({ success: false, error: "Expected JSON." }, { status: 415 });
  }
  let body;
  try { body = await request.json(); } catch {
    return Response.json({ success: false, error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.fullName || body.name, 120);
  const email = clean(body.email, 200);
  const whatsapp = clean(body.whatsapp || body.phone, 80);
  const subject = clean(body.subject || body.topic || "Programme enquiry", 160);
  const programme = clean(body.programme, 160);
  const location = clean(body.location, 160);
  const message = clean(body.message, MAX_FIELD);
  const pageType = clean(body.pageType || "programme", 40);

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message) {
    return Response.json({ success: false, error: "Please provide a name, valid email and message." }, { status: 400 });
  }
  if (pageType === "contact" && (!whatsapp || body.consent !== "on" && body.consent !== true)) {
    return Response.json({ success: false, error: "WhatsApp number and consent are required." }, { status: 400 });
  }

  const safeSubject = `Website enquiry: ${subject}`.slice(0, 180);
  const rows = [
    ["Enquiry type", pageType],
    ["Name", name],
    ["Email", email],
    ["WhatsApp", whatsapp || "Not provided"],
    ["Subject", subject],
    ["Programme", programme || "Not specified"],
    ["Location", location || "Not provided"],
    ["Message", message]
  ];
  const htmlBody = `<h2>New THE MANOMANTRA website enquiry</h2><table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse">${rows.map(([k,v]) => `<tr><th align="left">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}</table><p>Reply directly to the visitor at ${escapeHtml(email)}.</p>`;
  const textBody = rows.map(([k,v]) => `${k}: ${v}`).join("\n");

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: DEMO_RECIPIENTS,
        reply_to: email,
        subject: safeSubject,
        html: htmlBody,
        text: textBody
      })
    });
    const responseBody = await resendResponse.json().catch(() => ({}));
    if (!resendResponse.ok) {
      return Response.json({
        success: false,
        error: "The email provider rejected the message. Check the Resend sender/domain setup and recipient permissions.",
        providerStatus: resendResponse.status
      }, { status: 502 });
    }
    return Response.json({ success: true, id: responseBody.id || null });
  } catch {
    return Response.json({ success: false, error: "Email service temporarily unavailable." }, { status: 502 });
  }
}

export async function onRequest({ request }) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: { "Allow": "POST, OPTIONS" } });
  }
  return new Response("Method not allowed", { status: 405, headers: { "Allow": "POST, OPTIONS" } });
}
