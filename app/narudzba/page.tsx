"use client";

import { useCart } from "@/contexts/CartContext";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const orderFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "Ime mora imati najmanje 2 karaktera" }),
  lastName: z
    .string()
    .min(2, { message: "Prezime mora imati najmanje 2 karaktera" }),
  email: z.string().email({ message: "Unesite validnu email adresu" }),
  phone: z.string().min(9, { message: "Unesite validan broj telefona" }),
  address: z.string().min(5, { message: "Unesite vašu adresu" }),
  city: z.string().min(2, { message: "Unesite vaš grad" }),
  postalCode: z.string().min(4, { message: "Unesite poštanski broj" }),
  note: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderFormSchema>;

export default function NarudzbaPage() {
  const router = useRouter();
  const { items, getTotalPriceRSD, getTotalPriceEUR, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      note: "",
    },
  });

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Vaša korpa je prazna
            </h1>
            <p className="mb-8 text-gray-600">
              Morate dodati proizvode u korpu pre nego što nastavite sa
              porudžbinom.
            </p>
            <Link href="/proizvodi">
              <Button className="bg-red-500 px-8 py-6 text-lg hover:bg-red-600">
                Pogledaj proizvode
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = async (values: OrderFormData) => {
    setIsSubmitting(true);

    try {
      const orderData = {
        customer: values,
        items: items,
        totalRSD: getTotalPriceRSD(),
        totalEUR: getTotalPriceEUR(),
      };

      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(
          "Porudžbina je uspešno poslata! Uskoro ćemo vas kontaktirati."
        );
        clearCart();
        router.push("/uspesna-porudzba");
      } else {
        toast.error(data.error || "Greška pri slanju porudžbine.");
      }
    } catch (error) {
      console.error("Greška:", error);
      toast.error("Došlo je do greške. Pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Završite porudžbinu
        </h1>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Order Form */}
          <div className="lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">
                Podaci za dostavu
              </h2>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ime *</FormLabel>
                          <FormControl>
                            <Input placeholder="Marko" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prezime *</FormLabel>
                          <FormControl>
                            <Input placeholder="Marković" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="marko@example.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefon *</FormLabel>
                          <FormControl>
                            <Input placeholder="065 123 4567" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Adresa *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ulica i broj" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grad *</FormLabel>
                          <FormControl>
                            <Input placeholder="Beograd" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Poštanski broj *</FormLabel>
                          <FormControl>
                            <Input placeholder="11000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Napomena (opciono)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Dodatne informacije o porudžbini..."
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary py-6 text-lg font-semibold hover:bg-primary/80"
                  >
                    {isSubmitting
                      ? "Slanje porudžbine..."
                      : "Potvrdi porudžbinu"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Pregled porudžbine
              </h2>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.selectedColor?._id}-${item.selectedSize?._id}`}
                    className="flex gap-3 border-b border-gray-200 pb-4"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                      {item.image ? (
                        <Image
                          src={urlFor(item.image).width(100).height(100).url()}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h3>
                      {item.selectedColor && (
                        <p className="text-xs text-gray-600">
                          Boja: {item.selectedColor.name}
                        </p>
                      )}
                      {item.selectedSize && (
                        <p className="text-xs text-gray-600">
                          Veličina: {item.selectedSize.name}
                        </p>
                      )}
                      <p className="text-xs text-gray-600">
                        Količina: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>
                    Proizvodi (
                    {items.reduce((sum, item) => sum + item.quantity, 0)})
                  </span>
                  <div className="text-right">
                    {getTotalPriceRSD() > 0 && (
                      <div className="font-semibold text-gray-900">
                        {getTotalPriceRSD()} RSD
                      </div>
                    )}
                    {getTotalPriceEUR() > 0 && (
                      <div className="text-sm text-gray-600">
                        {getTotalPriceEUR()} EUR
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Ukupno</span>
                    <div className="text-right">
                      {getTotalPriceRSD() > 0 && (
                        <div>{getTotalPriceRSD()} RSD</div>
                      )}
                      {getTotalPriceEUR() > 0 && (
                        <div className="text-base text-gray-600">
                          {getTotalPriceEUR()} EUR
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
