import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function UspesnaPorudzbinaPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle className="h-24 w-24 text-green-500" />
          </div>

          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Porudžbina uspešno poslata!
          </h1>

          <p className="mb-4 text-lg text-gray-600">
            Hvala vam na porudžbini. Vaša porudžbina je primljena i uskoro ćemo
            vas kontaktirati putem telefona ili emaila za potvrdu.
          </p>

          <p className="mb-8 text-gray-600">
            Očekujte naš poziv u najkraćem mogućem roku.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/proizvodi">
              <Button className="bg-primary px-8 py-6 text-lg hover:bg-primary/80">
                Nastavi sa kupovinom
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="px-8 py-6 text-lg">
                Početna stranica
              </Button>
            </Link>
          </div>

          <div className="mt-12 rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Kontakt informacije
            </h2>
            <p className="text-gray-600">
              Ukoliko imate bilo kakvih pitanja, možete nas kontaktirati:
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-700">
                <strong>Telefon:</strong>{" "}
                <a
                  href="tel:+381653232160"
                  className="text-red-500 hover:text-red-600"
                >
                  065 3232 160
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:zenskecarapebg@gmail.com"
                  className="text-red-500 hover:text-red-600"
                >
                  zenskecarapebg@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
