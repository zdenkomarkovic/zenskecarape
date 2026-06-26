import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'shipping',
  title: 'Poštarina',
  type: 'document',
  fields: [
    defineField({
      name: 'priceRSD',
      title: 'Cena poštarine (RSD)',
      type: 'number',
      description: 'Unesite cenu poštarine u dinarima',
      validation: (rule) => rule.required().positive().integer(),
    }),
  ],
  preview: {
    select: {
      priceRSD: 'priceRSD',
    },
    prepare({ priceRSD }) {
      return {
        title: 'Poštarina',
        subtitle: priceRSD ? `${priceRSD} RSD` : 'Nije podešena',
      }
    },
  },
})
