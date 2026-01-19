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

async function rollback() {
  console.log('🔙 Vraćam proizvode na stare vrednosti...\n')

  try {
    const products = await client.fetch(`*[_type == "product"] {
      _id,
      name,
      colors,
      sizes,
      denier
    }`)

    console.log(`📦 Pronađeno ${products.length} proizvoda\n`)

    let rolled = 0

    for (const product of products) {
      const patches: any = {}
      let needsUpdate = false

      // Vrati boje iz referenci u stringove
      if (product.colors && Array.isArray(product.colors)) {
        const hasReferences = product.colors.some((c: any) => c && typeof c === 'object' && c._ref)
        if (hasReferences) {
          const colorStrings = product.colors
            .filter((c: any) => c && c._ref)
            .map((c: any) => c._ref.replace('color-', ''))

          patches.colors = colorStrings
          needsUpdate = true
        }
      }

      // Vrati veličine iz referenci u stringove
      if (product.sizes && Array.isArray(product.sizes)) {
        const hasReferences = product.sizes.some((s: any) => s && typeof s === 'object' && s._ref)
        if (hasReferences) {
          const sizeStrings = product.sizes
            .filter((s: any) => s && s._ref)
            .map((s: any) => s._ref.replace('size-', ''))

          patches.sizes = sizeStrings
          needsUpdate = true
        }
      }

      // Vrati denier iz reference u string
      if (product.denier && typeof product.denier === 'object' && product.denier._ref) {
        patches.denier = product.denier._ref.replace('denier-', '')
        needsUpdate = true
      }

      if (needsUpdate) {
        try {
          await client.patch(product._id).set(patches).commit()
          console.log(`  ✓ Vraćen: ${product.name}`)
          rolled++
        } catch (error) {
          console.error(`  ❌ Greška kod: ${product.name}`, error)
        }
      } else {
        console.log(`  ⊘ Nije potrebno: ${product.name}`)
      }
    }

    console.log(`\n✅ Rollback završen!`)
    console.log(`   Vraćeno: ${rolled}`)
    console.log(`   Ukupno: ${products.length}\n`)
  } catch (error) {
    console.error('❌ Greška:', error)
    process.exit(1)
  }
}

rollback()
