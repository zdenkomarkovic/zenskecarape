"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KorpaPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPriceRSD,
    getTotalPriceEUR,
  } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              Vaša korpa je prazna
            </h1>
            <p className="mb-8 text-gray-600">
              Izgleda da još niste dodali ništa u korpu.
            </p>
            <Link href="/proizvodi">
              <Button className="bg-red-500 px-8 py-6 text-lg hover:bg-red-600">
                Počni sa kupovinom
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Korpa</h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Isprazni korpu
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.selectedColor?._id}-${item.selectedSize?._id}`}
                  className="rounded-lg bg-white p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link
                      href={`/proizvodi/${item.slug}`}
                      className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg"
                    >
                      {item.image ? (
                        <Image
                          src={urlFor(item.image).width(200).height(200).url()}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200" />
                      )}
                    </Link>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <Link
                          href={`/proizvodi/${item.slug}`}
                          className="text-lg font-semibold text-gray-900 hover:text-red-500"
                        >
                          {item.name}
                        </Link>

                        <div className="mt-1 space-y-1 text-sm text-gray-600">
                          {item.selectedColor && (
                            <div className="flex items-center gap-2">
                              <span>Boja:</span>
                              <div className="flex items-center gap-1">
                                <div
                                  className="h-4 w-4 rounded-full border border-gray-300"
                                  style={{
                                    backgroundColor: item.selectedColor.hexCode,
                                  }}
                                />
                                <span>{item.selectedColor.name}</span>
                              </div>
                            </div>
                          )}

                          {item.selectedSize && (
                            <div>
                              <span>Veličina: </span>
                              <span className="font-medium">
                                {item.selectedSize.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity - 1,
                                item.selectedColor?._id,
                                item.selectedSize?._id
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:border-gray-400"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-[2rem] text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                item.quantity + 1,
                                item.selectedColor?._id,
                                item.selectedSize?._id
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 hover:border-gray-400"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col items-end">
                          {item.priceRSD && (
                            <span className="text-lg font-bold text-gray-900">
                              {item.priceRSD * item.quantity} RSD
                            </span>
                          )}
                          {item.priceEUR && (
                            <span className="text-sm text-gray-600">
                              {item.priceEUR * item.quantity} EUR
                            </span>
                          )}
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() =>
                            removeFromCart(
                              item.productId,
                              item.selectedColor?._id,
                              item.selectedSize?._id
                            )
                          }
                          className="ml-4 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                Pregled porudžbine
              </h2>

              <div className="space-y-3 border-t border-gray-200 pt-4">
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

                <div className="flex justify-between text-gray-600"></div>

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
                  <span>Način plaćanja: pouzećem</span>
                </div>
              </div>

              <Link href="/narudzba">
                <Button className="mt-6 w-full bg-red-500 py-6 text-lg font-semibold hover:bg-red-600">
                  Poruči
                </Button>
              </Link>

              <Link href="/proizvodi">
                <Button variant="outline" className="mt-3 w-full py-6 text-lg">
                  Nastavi sa kupovinom
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
