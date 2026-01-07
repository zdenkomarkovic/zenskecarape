import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'color',
  title: 'Boja',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv boje',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hexCode',
      title: 'HEX kod boje',
      type: 'string',
      description: 'Npr. #000000 za crnu',
      validation: (Rule) => Rule.required().regex(/^#[0-9A-Fa-f]{6}$/),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      hexCode: 'hexCode',
    },
    prepare({ title, hexCode }) {
      return {
        title,
        subtitle: hexCode,
      }
    },
  },
})
