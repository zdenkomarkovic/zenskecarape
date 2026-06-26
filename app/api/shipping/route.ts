import { sanityFetch } from '@/sanity/lib/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const query = `*[_type == "shipping" && _id == "shipping"][0] { priceRSD }`
  const shipping = await sanityFetch({ query, revalidate: 300 })
  return NextResponse.json({ priceRSD: shipping?.priceRSD ?? 0 })
}
