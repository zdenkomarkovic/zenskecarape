'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface ProductImageGalleryProps {
  images: any[]
  productName: string
}

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-gray-200">
        <div className="flex h-full items-center justify-center text-gray-400">
          Nema dostupnih slika
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white shadow-sm">
        <Image
          src={urlFor(images[selectedImage]).width(800).height(1000).url()}
          alt={`${productName} - slika ${selectedImage + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-[4/5] overflow-hidden rounded-lg transition-all ${
                selectedImage === index
                  ? 'ring-2 ring-red-500'
                  : 'ring-1 ring-gray-200 hover:ring-gray-300'
              }`}
            >
              <Image
                src={urlFor(image).width(200).height(250).url()}
                alt={`${productName} - thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
