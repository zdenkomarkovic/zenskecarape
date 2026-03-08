'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import { notFound } from 'next/navigation'

export default function StudioPage() {
  if (process.env.NODE_ENV === 'production' && process.env.STUDIO_ENABLED !== 'true') {
    notFound()
  }
  return <NextStudio config={config} />
}
