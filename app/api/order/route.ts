import { NextRequest, NextResponse } from "next/server";
import Mailjet from "node-mailjet";

const mailjet = Mailjet.apiConnect(
  process.env.MAILJET_API_KEY!,
  process.env.MAILJET_SECRET_KEY!
);

interface OrderItem {
  productId: string;
  name: string;
  slug: string;
  image: any;
  priceRSD?: number;
  priceEUR?: number;
  selectedColor?: {
    _id: string;
    name: string;
    hexCode: string;
  };
  selectedSize?: {
    _id: string;
    name: string;
  };
  quantity: number;
}

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  note?: string;
}

interface OrderData {
  customer: CustomerData;
  items: OrderItem[];
  totalRSD: number;
  totalEUR: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderData = await request.json();
    const { customer, items, totalRSD, totalEUR } = body;

    // Validacija
    if (!customer || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Nedostaju podaci o porudžbini." },
        { status: 400 }
      );
    }

    // Generisanje HTML-a za proizvode
    const itemsHTML = items
      .map(
        (item) => `
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 15px;">
          <strong>${item.name}</strong><br/>
          ${item.selectedColor ? `Boja: ${item.selectedColor.name}<br/>` : ""}
          ${item.selectedSize ? `Veličina: ${item.selectedSize.name}<br/>` : ""}
          Količina: ${item.quantity}
        </td>
        <td style="padding: 15px; text-align: right;">
          ${item.priceRSD ? `${item.priceRSD * item.quantity} RSD` : ""}
          ${item.priceEUR ? `<br/>${item.priceEUR * item.quantity} EUR` : ""}
        </td>
      </tr>
    `
      )
      .join("");

    // Generisanje tekst verzije
    const itemsText = items
      .map(
        (item) => `
${item.name}
${item.selectedColor ? `Boja: ${item.selectedColor.name}` : ""}
${item.selectedSize ? `Veličina: ${item.selectedSize.name}` : ""}
Količina: ${item.quantity}
Cena: ${item.priceRSD ? `${item.priceRSD * item.quantity} RSD` : ""} ${item.priceEUR ? `/ ${item.priceEUR * item.quantity} EUR` : ""}
---
    `
      )
      .join("");

    // Slanje emaila preko Mailjet-a
    await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.SITE_MAIL_SENDER!,
            Name: "Ženske čarape - Porudžbine",
          },
          To: [
            {
              Email: process.env.SITE_MAIL_RECEIVER!,
              Name: "Admin",
            },
          ],
          Subject: `Nova porudžbina od ${customer.firstName} ${customer.lastName}`,
          TextPart: `
NOVA PORUDŽBINA

PODACI O KUPCU:
Ime i prezime: ${customer.firstName} ${customer.lastName}
Email: ${customer.email}
Telefon: ${customer.phone}
Adresa: ${customer.address}
Grad: ${customer.city}
Poštanski broj: ${customer.postalCode}
${customer.note ? `Napomena: ${customer.note}` : ""}

PROIZVODI:
${itemsText}

UKUPNO: ${totalRSD > 0 ? `${totalRSD} RSD` : ""} ${totalEUR > 0 ? `/ ${totalEUR} EUR` : ""}
Dostava: Besplatna
          `,
          HTMLPart: `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0;">
    <h1 style="margin: 0; font-size: 24px;">Nova Porudžbina</h1>
  </div>

  <div style="background-color: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
    <div style="background-color: white; padding: 20px; border-radius: 5px; margin-bottom: 20px;">
      <h2 style="color: #dc2626; margin-top: 0;">Podaci o kupcu</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0;"><strong>Ime i prezime:</strong></td>
          <td style="padding: 8px 0;">${customer.firstName} ${customer.lastName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>Email:</strong></td>
          <td style="padding: 8px 0;"><a href="mailto:${customer.email}" style="color: #dc2626;">${customer.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>Telefon:</strong></td>
          <td style="padding: 8px 0;"><a href="tel:${customer.phone}" style="color: #dc2626;">${customer.phone}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>Adresa:</strong></td>
          <td style="padding: 8px 0;">${customer.address}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>Grad:</strong></td>
          <td style="padding: 8px 0;">${customer.city}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0;"><strong>Poštanski broj:</strong></td>
          <td style="padding: 8px 0;">${customer.postalCode}</td>
        </tr>
        ${
          customer.note
            ? `
        <tr>
          <td style="padding: 8px 0; vertical-align: top;"><strong>Napomena:</strong></td>
          <td style="padding: 8px 0;">${customer.note}</td>
        </tr>
        `
            : ""
        }
      </table>
    </div>

    <div style="background-color: white; padding: 20px; border-radius: 5px;">
      <h2 style="color: #dc2626; margin-top: 0;">Poručeni proizvodi</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f3f4f6; border-bottom: 2px solid #dc2626;">
            <th style="padding: 12px; text-align: left;">Proizvod</th>
            <th style="padding: 12px; text-align: right;">Cena</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <div style="margin-top: 20px; padding-top: 20px; border-top: 2px solid #e5e7eb;">
        <table style="width: 100%; max-width: 300px; margin-left: auto;">
          <tr>
            <td style="padding: 8px 0;"><strong>Proizvodi (${items.reduce((sum, item) => sum + item.quantity, 0)}):</strong></td>
            <td style="padding: 8px 0; text-align: right;">
              ${totalRSD > 0 ? `${totalRSD} RSD` : ""}
              ${totalEUR > 0 ? `<br/><span style="color: #6b7280; font-size: 14px;">${totalEUR} EUR</span>` : ""}
            </td>
          </tr>
         
          <tr style="border-top: 2px solid #dc2626;">
            <td style="padding: 12px 0; font-size: 18px;"><strong>UKUPNO:</strong></td>
            <td style="padding: 12px 0; text-align: right; font-size: 18px; font-weight: bold; color: #dc2626;">
              ${totalRSD > 0 ? `${totalRSD} RSD` : ""}
              ${totalEUR > 0 ? `<br/>${totalEUR} EUR` : ""}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>

  <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
    <p>Ova poruka je automatski generisana sa sajta Ženske Čarape</p>
  </div>
</div>
          `,
        },
      ],
    });

    return NextResponse.json(
      { message: "Porudžbina je uspešno poslata!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Greška pri slanju porudžbine:", error);
    return NextResponse.json(
      { error: "Došlo je do greške pri slanju porudžbine. Pokušajte ponovo." },
      { status: 500 }
    );
  }
}
