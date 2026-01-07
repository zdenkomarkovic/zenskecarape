import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'size',
  title: 'Veličina',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv veličine',
      type: 'string',
      description: 'Npr. XS, S, M, L, XL, XXL ili brojčane veličine',
      validation: (Rule) => Rule.required(),
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
    },
  },
})
