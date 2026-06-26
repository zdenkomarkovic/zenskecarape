import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'Ženske Čarape',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Sadržaj')
          .items([
            // Singleton za početnu stranicu
            S.listItem()
              .title('Početna stranica')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
              ),
            // Singleton za poštarinu
            S.listItem()
              .title('Poštarina')
              .child(
                S.document()
                  .schemaType('shipping')
                  .documentId('shipping')
              ),
            S.divider(),
            // Ostali tipovi dokumenata
            ...S.documentTypeListItems().filter(
              (listItem) => !['homepage', 'shipping'].includes(listItem.getId() || '')
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
