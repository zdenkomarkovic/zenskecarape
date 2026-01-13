import { createClient, type QueryParams } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Isključi CDN da bi se odmah videle promene
})

// Helper funkcija za fetch sa revalidacijom
export async function sanityFetch<T = any>({
  query,
  params = {},
  revalidate = 60, // Revalidacija na svakih 60 sekundi
}: {
  query: string
  params?: QueryParams
  revalidate?: number | false
}) {
  return client.fetch<T>(query, params, {
    next: {
      revalidate: revalidate,
    },
  })
}
