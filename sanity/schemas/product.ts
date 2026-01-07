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
        source: 'name',
        maxLength: 96,
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
      of: [{ type: 'string' }],
      description: 'Izaberite boje',
      options: {
        list: [
          { title: 'Crna', value: 'crna' },
          { title: 'Bela', value: 'bela' },
          { title: 'Braon', value: 'braon' },
          { title: 'Siva', value: 'siva' },
          { title: 'Bež', value: 'bez' },
          { title: 'Crvena', value: 'crvena' },
          { title: 'Plava', value: 'plava' },
          { title: 'Roze', value: 'roze' },
          { title: 'Ljubičasta', value: 'ljubicasta' },
          { title: 'Zelena', value: 'zelena' },
          { title: 'Narandžasta', value: 'narandzasta' },
          { title: 'Žuta', value: 'zuta' },
          { title: 'Bordo', value: 'bordo' },
          { title: 'Teget', value: 'teget' },
          { title: 'Krem', value: 'krem' },
        ],
      },
    }),
    defineField({
      name: 'sizes',
      title: 'Veličine',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Izaberite veličine',
      options: {
        list: [
          { title: 'XS', value: 'xs' },
          { title: 'S', value: 's' },
          { title: 'M', value: 'm' },
          { title: 'L', value: 'l' },
          { title: 'XL', value: 'xl' },
          { title: 'XXL', value: 'xxl' },
          { title: 'One Size', value: 'one-size' },
          { title: '34-36', value: '34-36' },
          { title: '36-38', value: '36-38' },
          { title: '38-40', value: '38-40' },
          { title: '40-42', value: '40-42' },
          { title: '42-44', value: '42-44' },
        ],
      },
    }),
    defineField({
      name: 'denier',
      title: 'Denier (debljina)',
      type: 'string',
      description: 'Izaberite debljinu',
      options: {
        list: [
          { title: '8 Den', value: '8' },
          { title: '10 Den', value: '10' },
          { title: '15 Den', value: '15' },
          { title: '20 Den', value: '20' },
          { title: '30 Den', value: '30' },
          { title: '40 Den', value: '40' },
          { title: '50 Den', value: '50' },
          { title: '60 Den', value: '60' },
          { title: '70 Den', value: '70' },
          { title: '80 Den', value: '80' },
          { title: '100 Den', value: '100' },
          { title: '120 Den', value: '120' },
        ],
      },
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
