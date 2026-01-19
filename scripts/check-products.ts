import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function checkProducts() {
  console.log('🔍 Proveravamo stanje proizvoda...\n')

  try {
    const products = await client.fetch(`*[_type == "product"] {
      _id,
      name,
      colors,
      sizes,
      denier
    }`)

    console.log(`📦 Pronađeno ${products.length} proizvoda\n`)

    products.forEach((product: any, index: number) => {
      console.log(`\n${index + 1}. ${product.name}`)
      console.log(`   ID: ${product._id}`)
      console.log(`   Boje:`, JSON.stringify(product.colors, null, 2))
      console.log(`   Veličine:`, JSON.stringify(product.sizes, null, 2))
      console.log(`   Denier:`, JSON.stringify(product.denier, null, 2))
    })
  } catch (error) {
    console.error('❌ Greška:', error)
  }
}

checkProducts()
