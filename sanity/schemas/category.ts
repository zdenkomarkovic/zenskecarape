import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Kategorija',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv',
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
      name: 'description',
      title: 'Opis',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Slika kategorije',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Redosled prikaza',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
