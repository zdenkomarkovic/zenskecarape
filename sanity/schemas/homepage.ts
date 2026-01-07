import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Početna stranica',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      initialValue: 'Početna stranica',
      hidden: true,
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero naslov',
      type: 'string',
      description: 'Glavni naslov na početnoj stranici',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero opis',
      type: 'text',
      description: 'Opis ispod naslova (opciono)',
      rows: 3,
    }),
    defineField({
      name: 'heroImageDesktop',
      title: 'Hero slika (Desktop)',
      type: 'image',
      description: 'Slika za desktop verziju (preporučene dimenzije: 1920x600px)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImageMobile',
      title: 'Hero slika (Mobilni)',
      type: 'image',
      description: 'Slika za mobilnu verziju (preporučene dimenzije: 768x800px)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Početna stranica',
      }
    },
  },
})
