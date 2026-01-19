import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Učitaj environment varijable iz .env.local
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function migrateProducts() {
  console.log('🔄 Započinjem migraciju proizvoda...\n')

  try {
    // Povuci sve proizvode
    const products = await client.fetch(`*[_type == "product"] {
      _id,
      _rev,
      name,
      colors,
      sizes,
      denier
    }`)

    console.log(`📦 Pronađeno ${products.length} proizvoda za migraciju\n`)

    let migrated = 0
    let skipped = 0

    for (const product of products) {
      const patches: any = {}
      let needsUpdate = false

      // Migracija boja (ako su stringovi)
      if (product.colors && Array.isArray(product.colors)) {
        const hasStringColors = product.colors.some((c: any) => typeof c === 'string')
        if (hasStringColors) {
          const colorRefs = product.colors
            .filter((c: any) => typeof c === 'string')
            .map((colorId: string) => ({
              _type: 'reference',
              _ref: `color-${colorId}`,
              _key: `color-${colorId}-${Date.now()}-${Math.random()}`,
            }))

          if (colorRefs.length > 0) {
            patches.colors = colorRefs
            needsUpdate = true
          }
        }
      }

      // Migracija veličina (ako su stringovi)
      if (product.sizes && Array.isArray(product.sizes)) {
        const hasStringSizes = product.sizes.some((s: any) => typeof s === 'string')
        if (hasStringSizes) {
          const sizeRefs = product.sizes
            .filter((s: any) => typeof s === 'string')
            .map((sizeId: string) => ({
              _type: 'reference',
              _ref: `size-${sizeId}`,
              _key: `size-${sizeId}-${Date.now()}-${Math.random()}`,
            }))

          if (sizeRefs.length > 0) {
            patches.sizes = sizeRefs
            needsUpdate = true
          }
        }
      }

      // Migracija denier-a (ako je string)
      if (product.denier && typeof product.denier === 'string') {
        patches.denier = {
          _type: 'reference',
          _ref: `denier-${product.denier}`,
        }
        needsUpdate = true
      }

      // Ažuriraj proizvod ako je potrebno
      if (needsUpdate) {
        try {
          await client.patch(product._id).set(patches).commit()
          console.log(`  ✓ Migriran: ${product.name}`)
          migrated++
        } catch (error) {
          console.error(`  ❌ Greška kod: ${product.name}`, error)
        }
      } else {
        console.log(`  ⊘ Preskočen (već migriran): ${product.name}`)
        skipped++
      }
    }

    console.log(`\n✅ Migracija završena!`)
    console.log(`   Migrirano: ${migrated}`)
    console.log(`   Preskočeno: ${skipped}`)
    console.log(`   Ukupno: ${products.length}\n`)
  } catch (error) {
    console.error('❌ Greška tokom migracije:', error)
    process.exit(1)
  }
}

migrateProducts()
