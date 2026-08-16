import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface CallbackNotificationInput {
  fullName: string;
  phone: string;
  email: string;
  customerType: string;
  insuranceCategory: string;
  insuranceProduct: string;
  callbackTime: string;
  message?: string;
}

// Sends the admin notification email. Never throws — a failed email must not
// block the callback request from being saved. Errors are logged for follow-up.
export async function sendCallbackNotification(data: CallbackNotificationInput) {
  if (!resend || !process.env.ADMIN_NOTIFICATION_EMAIL) {
    console.warn("Email notification skipped: RESEND_API_KEY or ADMIN_NOTIFICATION_EMAIL not set.");
    return { sent: false };
  }

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM_ADDRESS || "InsureLeague <onboarding@resend.dev>",
      to: process.env.ADMIN_NOTIFICATION_EMAIL,
      subject: `New callback request — ${data.fullName}`,
      html: `
        <h2>New callback request</h2>
        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><strong>Name</strong></td><td>${escapeHtml(data.fullName)}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${escapeHtml(data.phone)}</td></tr>
          <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
          <tr><td><strong>Customer type</strong></td><td>${escapeHtml(data.customerType)}</td></tr>
          <tr><td><strong>Category</strong></td><td>${escapeHtml(data.insuranceCategory)}</td></tr>
          <tr><td><strong>Product</strong></td><td>${escapeHtml(data.insuranceProduct)}</td></tr>
          <tr><td><strong>Preferred time</strong></td><td>${escapeHtml(data.callbackTime)}</td></tr>
          <tr><td><strong>Message</strong></td><td>${escapeHtml(data.message || "—")}</td></tr>
        </table>
        <p>View and manage this request in the <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin">admin portal</a>.</p>
      `,
    });
    return { sent: true };
  } catch (error) {
    console.error("Failed to send callback notification email:", error);
    return { sent: false };
  }
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
