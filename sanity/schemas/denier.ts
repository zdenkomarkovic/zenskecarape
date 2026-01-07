import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'denier',
  title: 'Denier (debljina)',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: 'Vrednost',
      type: 'string',
      description: 'Npr. 8 Den, 15 Den, 20 Den, 40 Den, 60 Den, 80 Den',
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
      title: 'value',
    },
  },
})
