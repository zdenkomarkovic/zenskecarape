import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Proizvod',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv proizvoda',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => {
          const name = doc.name || 'proizvod'
          const randomId = Math.random().toString(36).substring(2, 6)
          return `${name}-${randomId}`
        },
        maxLength: 96,
        slugify: (input: string) => {
          return input
            .toLowerCase()
            .replace(/ć/g, 'c')
            .replace(/č/g, 'c')
            .replace(/š/g, 's')
            .replace(/ž/g, 'z')
            .replace(/đ/g, 'dj')
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim()
        },
        isUnique: async (slug, context) => {
          const { document, getClient } = context
          const client = getClient({ apiVersion: '2024-01-01' })
          const id = document?._id?.replace(/^drafts\./, '')
          const params = {
            draft: `drafts.${id}`,
            published: id,
            slug,
          }
          const query = `!defined(*[_type == "product" && slug.current == $slug && !(_id in [$draft, $published])][0]._id)`
          const result = await client.fetch(query, params)
          return result
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Slike proizvoda',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
    }),
    defineField({
      name: 'priceRSD',
      title: 'Cena (RSD)',
      type: 'number',
      description: 'Cena u dinarima',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'priceEUR',
      title: 'Cena (EUR)',
      type: 'number',
      description: 'Cena u evrima',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Podkategorija',
      type: 'reference',
      to: [{ type: 'subcategory' }],
    }),
    defineField({
      name: 'colors',
      title: 'Boje',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'color' }],
        },
      ],
      description: 'Izaberite boje iz liste',
    }),
    defineField({
      name: 'sizes',
      title: 'Veličine',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'size' }],
        },
      ],
      description: 'Izaberite veličine iz liste',
    }),
    defineField({
      name: 'denier',
      title: 'Denier (debljina)',
      type: 'reference',
      to: [{ type: 'denier' }],
      description: 'Izaberite debljinu iz liste',
    }),
    defineField({
      name: 'composition',
      title: 'Sastav materijala',
      type: 'text',
      description: 'Npr. 90% Polyamide, 10% Elastane',
      rows: 3,
    }),
    defineField({
      name: 'careInstructions',
      title: 'Uputstvo za održavanje',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Izaberite simbole za održavanje',
      options: {
        list: [
          { title: 'Ručno prati hladno odvojeno', value: 'hand-wash-cold-separate' },
          { title: 'Ne beliti', value: 'no-bleach' },
          { title: 'Ne sušiti u mašini', value: 'no-tumble-dry' },
          { title: 'Sušiti na konopcu', value: 'line-dry' },
          { title: 'Ne peglati', value: 'no-iron' },
          { title: 'Ne čistiti hemijski', value: 'no-dry-clean' },
          { title: 'Veoma nežno mokro čišćenje', value: 'gentle-wet-clean' },
          { title: 'Sušiti na ravnoj površini', value: 'dry-flat' },
        ],
      },
    }),
    defineField({
      name: 'isNew',
      title: 'Novi proizvod',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'inStock',
      title: 'Na lageru',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'comingSoon',
      title: 'Uskoro',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'featured',
      title: 'Istaknuto',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      priceRSD: 'priceRSD',
      priceEUR: 'priceEUR',
    },
    prepare({ title, media, priceRSD, priceEUR }) {
      const priceDisplay = priceRSD
        ? `${priceRSD} RSD`
        : priceEUR
        ? `${priceEUR} EUR`
        : 'Bez cene'

      return {
        title,
        subtitle: priceDisplay,
        media,
      }
    },
  },
})
