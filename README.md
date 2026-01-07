# Ženske Čarape - E-commerce sajt

Moderan Next.js sajt za prodaju ženskih čarapa sa Sanity CMS integracijom.

## Tehnologije

- **Next.js 15** - React framework
- **React 19** - Latest React version
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Sanity CMS v5** - Content management
- **Radix UI** - UI komponente
- **Framer Motion** - Animacije

## Funkcionalnosti

- ✅ Sanity CMS integracija za upravljanje proizvodima
- ✅ Kategorije i podkategorije proizvoda
- ✅ Napredni filteri (veličina, boja, denier, tip)
- ✅ Stranica proizvoda sa galerijom slika
- ✅ Responsive dizajn
- ✅ SEO optimizacija
- ✅ Dinamičko rutiranje za kategorije i proizvode

## Pokretanje projekta

### 1. Instalacija zavisnosti

```bash
npm install
```

### 2. Podešavanje Sanity CMS-a

#### Kreiranje Sanity projekta

1. Posetite [sanity.io](https://www.sanity.io/) i kreirajte nalog
2. Kreirajte novi projekat
3. Kopirajte Project ID

#### Environment variables

Kopirajte `.env.local.example` u `.env.local`:

```bash
copy .env.local.example .env.local
```

Zatim uredite `.env.local` i unesite vaše vrednosti:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=vaš_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### 3. Pokretanje Sanity Studio-a

Sanity Studio je dostupan na ruti `/studio`.

1. Prvo pokrenite development server:

```bash
npm run dev
```

2. Posetite [http://localhost:3000/studio](http://localhost:3000/studio)

3. Prijavite se sa vašim Sanity nalogom

### 4. Dodavanje početnih podataka u Sanity

Nakon što se prijavite u Sanity Studio, dodajte:

#### 1. Boje (Colors)
- Crna (#000000)
- Bela (#FFFFFF)
- Bež (#F5F5DC)
- Braon (#8B4513)
- Nude (#E3BC9A)

#### 2. Veličine (Sizes)
- XS
- S
- M
- L
- XL
- XXL

#### 3. Denier (Thickness)
- 8 Den
- 15 Den
- 20 Den
- 40 Den
- 60 Den
- 80 Den

#### 4. Kategorije (Categories)
- Prozirne čarape (slug: prozirne-carape)
- Neprozirne čarape (slug: neprozirne-carape)
- Šarene čarape (slug: sarene-carape)
- Samostojeće čarape (slug: samostojece-carape)

#### 5. Proizvodi (Products)
Dodajte proizvode sa:
- Naziv
- Slike (minimum 1)
- Cena
- Kategorija
- Boje
- Veličine
- Denier
- Tip proizvoda
- Oznaka "Istaknuto" za proizvode koji će se prikazivati na početnoj strani

## Struktura projekta

```
├── app/
│   ├── kategorija/[slug]/   # Dinamičke stranice kategorija
│   ├── proizvodi/           # Stranica svih proizvoda
│   │   └── [slug]/         # Pojedinačna stranica proizvoda
│   ├── studio/             # Sanity Studio
│   ├── kontakt/            # Kontakt stranica
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Početna stranica
├── components/
│   ├── ProductCard.tsx     # Kartica proizvoda
│   ├── ProductFilter.tsx   # Sidebar sa filterima
│   ├── ProductImageGallery.tsx  # Galerija slika
│   ├── ProductsWithFilter.tsx   # Wrapper za proizvode sa filterima
│   ├── Header.tsx          # Navigacija
│   ├── Footer.tsx          # Footer
│   └── ui/                 # UI komponente (buttons, cards, etc.)
├── sanity/
│   ├── schemas/            # Sanity sheme
│   │   ├── category.ts
│   │   ├── subcategory.ts
│   │   ├── product.ts
│   │   ├── color.ts
│   │   ├── size.ts
│   │   └── denier.ts
│   └── lib/
│       ├── client.ts       # Sanity client
│       └── image.ts        # Image URL builder
├── constants/
│   └── index.ts            # Navigacione konstante
└── sanity.config.ts        # Sanity konfiguracija
```

## Sanity Sheme

### Product (Proizvod)
- name (string) - Naziv proizvoda
- slug (slug) - URL-friendly naziv
- images (array) - Slike proizvoda
- description (text) - Opis
- price (number) - Cena
- category (reference) - Kategorija
- subcategory (reference) - Podkategorija
- colors (array) - Reference na boje
- sizes (array) - Reference na veličine
- denier (reference) - Denier (debljina)
- productType (string) - Tip proizvoda
- features (array) - Osobine (termalne, oblikujuće, itd.)
- isNew (boolean) - Novi proizvod
- inStock (boolean) - Na lageru
- comingSoon (boolean) - Uskoro
- featured (boolean) - Istaknuto

### Category (Kategorija)
- name (string) - Naziv
- slug (slug) - URL-friendly naziv
- description (text) - Opis
- image (image) - Slika kategorije
- order (number) - Redosled prikaza

### Color (Boja)
- name (string) - Naziv boje
- hexCode (string) - HEX kod boje

### Size (Veličina)
- name (string) - Naziv veličine
- order (number) - Redosled prikaza

### Denier (Debljina)
- value (string) - Vrednost (npr. "20 Den")
- order (number) - Redosled prikaza

## Dostupne skripte

```bash
npm run dev          # Pokretanje development servera
npm run build        # Build za produkciju
npm run start        # Pokretanje production servera
npm run lint         # ESLint provera
```

## Deployment

### Vercel (preporučeno)

1. Push kod na GitHub
2. Import projekta na [Vercel](https://vercel.com)
3. Dodajte environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy

### Sanity Production Setup

1. U Sanity projektu, dodajte deployment URL u CORS origins
2. Idite na [manage.sanity.io](https://manage.sanity.io)
3. Settings > API > CORS Origins
4. Dodajte vaš production URL (npr. https://vasadomena.com)

## Potrebne izmene

Prilagodite sledeće:
- Telefon broj u `components/Header.tsx` (red 203)
- Logo sliku u `public/` direktorijumu
- Metadata u `app/layout.tsx` (canonical URL)

## Dodatne funkcionalnosti za implementaciju

- [ ] Shopping cart (korpa) funkcionalnost
- [ ] Checkout process
- [ ] Payment integration
- [ ] User authentication
- [ ] Order tracking
- [ ] Product reviews
- [ ] Wishlist
- [ ] Email notifications

## Podrška

Za pitanja i probleme:
- Instagram: [@zenske_carape_bg](https://www.instagram.com/zenske_carape_bg)

## Licenca

MIT License
