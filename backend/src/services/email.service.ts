import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_ADDRESS = "MonoShare <noreply@monoshare.site>";

const sendEmail = async (
  to: string,
  subject: string,
  html: string,
  text: string,
) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[Email Dev] To: ${to} | Subject: ${subject}`);
    console.log(`[Email Dev] Text: ${text}`);
    // return;
  }

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
};

export const EmailService = {
  async sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #06141f; color: #eef2f6;">
        <h1 style="color: #76c4ff;">Verify your MonoShare email</h1>
        <p>Thanks for registering. Click the button below to verify your email address.</p>
        <p>This link expires in <strong>24 hours</strong>.</p>
        <a href="${verifyUrl}" 
           style="display: inline-block; padding: 12px 24px; background: #76c4ff; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 16px 0;">
          Verify Email
        </a>
        <p style="color: #a9b2ba; font-size: 14px;">If you didn't create a MonoShare account, ignore this email.</p>
        <p style="color: #a9b2ba; font-size: 12px;">Or copy this link: ${verifyUrl}</p>
      </body>
      </html>
    `;

    const text = `Verify your MonoShare email\n\nClick this link to verify: ${verifyUrl}\n\nExpires in 24 hours. If you didn't register, ignore this email.`;

    await sendEmail(email, "Verify your MonoShare email", html, text);
  },

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #06141f; color: #eef2f6;">
        <h1 style="color: #76c4ff;">Reset your MonoShare password</h1>
        <p>We received a request to reset your password. Click below to set a new one.</p>
        <p>This link expires in <strong>1 hour</strong>.</p>
        <a href="${resetUrl}"
           style="display: inline-block; padding: 12px 24px; background: #76c4ff; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 16px 0;">
          Reset Password
        </a>
        <p style="color: #a9b2ba; font-size: 14px;">If you didn't request a password reset, ignore this email. Your password won't change.</p>
        <p style="color: #a9b2ba; font-size: 12px;">Or copy this link: ${resetUrl}</p>
      </body>
      </html>
    `;

    const text = `Reset your MonoShare password\n\nClick this link to reset: ${resetUrl}\n\nExpires in 1 hour. If you didn't request this, ignore this email.`;

    await sendEmail(email, "Reset your MonoShare password", html, text);
  },

  async sendSecretNotificationEmail(
    recipientEmail: string,
    senderEmail: string,
    shareUrl: string,
  ) {
    const html = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #06141f; color: #eef2f6;">
        <h1 style="color: #76c4ff;">Someone shared a secret with you</h1>
        <p><strong>${senderEmail}</strong> has shared an encrypted secret with you on MonoShare.</p>
        <p>This is a one-time link — once viewed the secret is permanently erased.</p>
        <a href="${shareUrl}"
           style="display: inline-block; padding: 12px 24px; background: #76c4ff; color: #000; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 16px 0;">
          View Secret
        </a>
        <p style="color: #a9b2ba; font-size: 14px;">You must be signed in as ${recipientEmail} to view this secret.</p>
        <p style="color: #a9b2ba; font-size: 12px;">Or copy this link: ${shareUrl}</p>
      </body>
      </html>
    `;

    const text = `${senderEmail} shared an encrypted secret with you.\n\nView it here (one-time link): ${shareUrl}\n\nYou must be signed in as ${recipientEmail} to view it.`;

    await sendEmail(
      recipientEmail,
      `${senderEmail} shared a secret with you`,
      html,
      text,
    );
  },
};
