import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ReceiptItem = {
  name: string;
  quantity: number;
  price: number;
};

type EmailRequestBody = {
  email?: string;
  customerName?: string;
  items?: ReceiptItem[];
  total?: number | string;
  orderId?: string;
};

export async function POST(req: Request) {
  try {
    const { email, customerName, items = [], total = 0, orderId } = (await req.json()) as EmailRequestBody;

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const itemsHtml = items
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name} x${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${Number(item.price) * Number(item.quantity)}</td>
      </tr>
    `
      )
      .join("");

    const mailOptions = {
      from: `"The Owl Cafe" <${process.env.EMAIL_USER}>`,
      to: email,
      bcc: process.env.EMAIL_USER,
      subject: `Your Receipt from The Owl Cafe (Order #${orderId || "NEW"})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #f26b21; margin: 0;">The Owl Cafe</h1>
            <p style="color: #666;">Thank you for your visit, ${customerName || "Customer"}!</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f9f9f9;">
                <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Item</th>
                <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
            <tfoot>
              <tr>
                <td style="padding: 10px; font-weight: bold; text-align: right;">Total</td>
                <td style="padding: 10px; font-weight: bold; text-align: right;">₹${Number(total).toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          
          <div style="text-align: center; color: #888; font-size: 12px; margin-top: 30px;">
            <p>We hope to see you again soon!</p>
            <p>The Owl Cafe Team</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send email", details: message }, { status: 500 });
  }
}
