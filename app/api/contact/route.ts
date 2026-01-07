import { NextRequest, NextResponse } from "next/server";
import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY!,
  process.env.MAILJET_SECRET_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // Validacija
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Molimo popunite sva obavezna polja." },
        { status: 400 }
      );
    }

    // Email validacija
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Molimo unesite validnu email adresu." },
        { status: 400 }
      );
    }

    // Slanje emaila preko Mailjet-a
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.SITE_MAIL_SENDER!,
            Name: "Kontakt forma",
          },
          To: [
            {
              Email: process.env.SITE_MAIL_RECEIVER!,
              Name: "Admin",
            },
          ],
          Subject: `Nova poruka od ${name}`,
          TextPart: `
Ime: ${name}
Email: ${email}
${phone ? `Telefon: ${phone}` : ""}

Poruka:
${message}
          `,
          HTMLPart: `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #333;">Nova poruka sa kontakt forme</h2>
  <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px;">
    <p><strong>Ime:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ""}
    <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
    <p><strong>Poruka:</strong></p>
    <p style="white-space: pre-wrap;">${message}</p>
  </div>
</div>
          `,
        },
      ],
    });

    return NextResponse.json(
      { message: "Poruka je uspešno poslata!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Greška pri slanju emaila:", error);
    return NextResponse.json(
      { error: "Došlo je do greške pri slanju poruke. Pokušajte ponovo." },
      { status: 500 }
    );
  }
}
