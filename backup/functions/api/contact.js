const DEMO_RECIPIENTS = [
  "amcoachsalini@gmail.com",
  "confidencecoachsalini@gmail.com",
];

const FROM_EMAIL = "THE MANOMANTRA Website <onboarding@resend.dev>";

function clean(value, max = 500) {
  return String(value ?? "")
    .trim()
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .slice(0, max);
}

function escapeHtml(value) {
  return value.replace(
    /[&<>"']/g,
    (ch) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[ch],
  );
}

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("Origin");

  const allowedOrigins = [
    "https://themanomantra.com",
    "https://www.themanomantra.com",
    "https://themanomantra.mypresento.com",
  ];

  if (origin && !allowedOrigins.includes(origin)) {
    return Response.json(
      { success: false, error: "Origin not allowed." },
      { status: 403 },
    );
  }

  if (!env.RESEND_API_KEY) {
    return Response.json(
      { success: false, error: "Email service is not configured." },
      { status: 503 },
    );
  }

  if (
    !(request.headers.get("content-type") || "").includes("application/json")
  ) {
    return Response.json(
      { success: false, error: "Expected JSON." },
      { status: 415 },
    );
  }

  let data;

  try {
    data = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const name = clean(data.fullName || data.name, 120);
  const email = clean(data.email, 200);
  const whatsapp = clean(data.whatsapp || data.phone, 80);
  const subject = clean(data.subject || data.topic || "Website enquiry", 160);
  const programme = clean(data.programme, 160);
  const location = clean(data.location, 160);
  const message = clean(data.message, 3000);
  const pageType = clean(data.pageType || "programme", 40);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !emailPattern.test(email) || !message) {
    return Response.json(
      {
        success: false,
        error: "Please provide a name, valid email and message.",
      },
      { status: 400 },
    );
  }

  if (
    pageType === "contact" &&
    (!whatsapp || !(data.consent === "on" || data.consent === true))
  ) {
    return Response.json(
      { success: false, error: "WhatsApp number and consent are required." },
      { status: 400 },
    );
  }

  const rows = [
    ["Enquiry type", pageType],
    ["Name", name],
    ["Email", email],
    ["WhatsApp", whatsapp || "Not provided"],
    ["Subject", subject],
    ["Programme", programme || "Not specified"],
    ["Location", location || "Not provided"],
    ["Message", message],
  ];

  const htmlBody = `
    <h2>New THE MANOMANTRA Website Enquiry</h2>
    <table cellpadding="8" cellspacing="0" border="1"
      style="border-collapse:collapse">
      ${rows
        .map(
          ([key, value]) => `
        <tr>
          <th align="left">${escapeHtml(key)}</th>
          <td>${escapeHtml(value)}</td>
        </tr>
      `,
        )
        .join("")}
    </table>
  `;

  const textBody = rows.map(([key, value]) => `${key}: ${value}`).join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: DEMO_RECIPIENTS,
        reply_to: email,
        subject: `Website Enquiry: ${subject}`.slice(0, 180),
        html: htmlBody,
        text: textBody,
      }),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("Resend error:", response.status, result);

      return Response.json(
        {
          success: false,
          error: "Email delivery failed. Check Resend configuration.",
          providerStatus: response.status,
        },
        { status: 502 },
      );
    }

    return Response.json({
      success: true,
      id: result.id || null,
    });
  } catch (error) {
    console.error("Email request failed:", error);

    return Response.json(
      { success: false, error: "Email service temporarily unavailable." },
      { status: 502 },
    );
  }
}

export async function onRequest({ request }) {
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: { Allow: "POST, OPTIONS" },
    });
  }

  return new Response("Method not allowed", {
    status: 405,
    headers: { Allow: "POST, OPTIONS" },
  });
}
