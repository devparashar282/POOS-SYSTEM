import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { email, customerName, items, total, orderId } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Configure the transporter with environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to another service or SMTP settings
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Create the items HTML list
    const itemsHtml = items.map((item: any) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name} x${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price * item.quantity}</td>
      </tr>
    `).join('');

    // Define the email content
    const mailOptions = {
      from: `"The Owl Cafe" <${process.env.EMAIL_USER}>`,
      to: email,
      bcc: process.env.EMAIL_USER, // Admin receives a copy of the invoice
      subject: `Your Receipt from The Owl Cafe (Order #${orderId || 'NEW'})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #f26b21; margin: 0;">The Owl Cafe</h1>
            <p style="color: #666;">Thank you for your visit, ${customerName || 'Customer'}!</p>
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
                <td style="padding: 10px; font-weight: bold; text-align: right;">₹${total}</td>
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

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error.message }, { status: 500 });
  }
}
