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

// Definicije boja iz starih konstanti
const colors = [
  { _id: 'crna', name: 'Crna', hexCode: '#000000' },
  { _id: 'bela', name: 'Bela', hexCode: '#FFFFFF' },
  { _id: 'braon', name: 'Braon', hexCode: '#8B4513' },
  { _id: 'siva', name: 'Siva', hexCode: '#808080' },
  { _id: 'bez', name: 'Bež', hexCode: '#F5F5DC' },
  { _id: 'crvena', name: 'Crvena', hexCode: '#DC2626' },
  { _id: 'plava', name: 'Plava', hexCode: '#3B82F6' },
  { _id: 'roze', name: 'Roze', hexCode: '#EC4899' },
  { _id: 'ljubicasta', name: 'Ljubičasta', hexCode: '#A855F7' },
  { _id: 'zelena', name: 'Zelena', hexCode: '#22C55E' },
  { _id: 'narandzasta', name: 'Narandžasta', hexCode: '#F97316' },
  { _id: 'zuta', name: 'Žuta', hexCode: '#EAB308' },
  { _id: 'bordo', name: 'Bordo', hexCode: '#7F1D1D' },
  { _id: 'teget', name: 'Teget', hexCode: '#1E3A8A' },
  { _id: 'krem', name: 'Krem', hexCode: '#FFFDD0' },
]

// Definicije veličina
const sizes = [
  { _id: 'xs', name: 'XS', order: 1 },
  { _id: 's', name: 'S', order: 2 },
  { _id: 'm', name: 'M', order: 3 },
  { _id: 'l', name: 'L', order: 4 },
  { _id: 'xl', name: 'XL', order: 5 },
  { _id: 'xxl', name: 'XXL', order: 6 },
  { _id: 'one-size', name: 'One Size', order: 7 },
  { _id: '34-36', name: '34-36', order: 8 },
  { _id: '36-38', name: '36-38', order: 9 },
  { _id: '38-40', name: '38-40', order: 10 },
  { _id: '40-42', name: '40-42', order: 11 },
  { _id: '42-44', name: '42-44', order: 12 },
]

// Definicije debljina
const deniers = [
  { _id: '8', value: '8 Den', order: 1 },
  { _id: '10', value: '10 Den', order: 2 },
  { _id: '15', value: '15 Den', order: 3 },
  { _id: '20', value: '20 Den', order: 4 },
  { _id: '30', value: '30 Den', order: 5 },
  { _id: '40', value: '40 Den', order: 6 },
  { _id: '50', value: '50 Den', order: 7 },
  { _id: '60', value: '60 Den', order: 8 },
  { _id: '70', value: '70 Den', order: 9 },
  { _id: '80', value: '80 Den', order: 10 },
  { _id: '100', value: '100 Den', order: 11 },
  { _id: '120', value: '120 Den', order: 12 },
]

async function seedData() {
  console.log('🌱 Započinjem punjenje podataka...\n')

  try {
    // Kreiranje boja
    console.log('📦 Kreiram boje...')
    for (const color of colors) {
      try {
        await client.createIfNotExists({
          _id: `color-${color._id}`,
          _type: 'color',
          name: color.name,
          hexCode: color.hexCode,
        })
        console.log(`  ✓ ${color.name}`)
      } catch (error) {
        console.log(`  ⚠ ${color.name} već postoji`)
      }
    }

    // Kreiranje veličina
    console.log('\n📦 Kreiram veličine...')
    for (const size of sizes) {
      try {
        await client.createIfNotExists({
          _id: `size-${size._id}`,
          _type: 'size',
          name: size.name,
          order: size.order,
        })
        console.log(`  ✓ ${size.name}`)
      } catch (error) {
        console.log(`  ⚠ ${size.name} već postoji`)
      }
    }

    // Kreiranje debljina
    console.log('\n📦 Kreiram debljine...')
    for (const denier of deniers) {
      try {
        await client.createIfNotExists({
          _id: `denier-${denier._id}`,
          _type: 'denier',
          value: denier.value,
          order: denier.order,
        })
        console.log(`  ✓ ${denier.value}`)
      } catch (error) {
        console.log(`  ⚠ ${denier.value} već postoji`)
      }
    }

    console.log('\n✅ Uspešno kreirani svi dokumenti!\n')
  } catch (error) {
    console.error('❌ Greška:', error)
    process.exit(1)
  }
}

seedData()
