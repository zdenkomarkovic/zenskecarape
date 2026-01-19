# Uputstvo za migraciju podataka u Sanity

## Problem
Promenili smo strukturu podataka u Sanity šemi. Sada boje, veličine i debljine koriste reference umesto hardkodiranih stringova. Postojeći proizvodi treba da se migriraju na novu strukturu.

## Korak 1: Kreiranje Sanity API tokena

1. Idi na [Sanity.io](https://www.sanity.io/manage)
2. Izaberi svoj projekat (`zxlbaawh`)
3. Idi na **Settings** → **API** → **Tokens**
4. Klikni na **Add API Token**
5. Unesi naziv (npr. "Migration Token")
6. Postavi permissions na **Editor** (potrebno za kreiranje i ažuriranje dokumenata)
7. Kopiraj token (prikazan samo jednom!)

## Korak 2: Dodavanje tokena u .env.local

Otvori `.env.local` fajl i dodaj sledeću liniju:

```
SANITY_API_TOKEN=tvoj_token_ovde
```

## Korak 3: Pokretanje seed skripte

Ova skripta će kreirati sve boje, veličine i debljine u Sanity-u:

```bash
npm run sanity:seed
```

Očekivani output:
```
🌱 Započinjem punjenje podataka...

📦 Kreiram boje...
  ✓ Crna
  ✓ Bela
  ✓ Braon
  ...

📦 Kreiram veličine...
  ✓ XS
  ✓ S
  ✓ M
  ...

📦 Kreiram debljine...
  ✓ 8 Den
  ✓ 15 Den
  ✓ 20 Den
  ...

✅ Uspešno kreirani svi dokumenti!
```

## Korak 4: Pokretanje migracione skripte

Ova skripta će ažurirati sve postojeće proizvode da koriste nove reference:

```bash
npm run sanity:migrate
```

Očekivani output:
```
🔄 Započinjem migraciju proizvoda...

📦 Pronađeno X proizvoda za migraciju

  ✓ Migriran: Naziv proizvoda 1
  ✓ Migriran: Naziv proizvoda 2
  ...

✅ Migracija završena!
   Migrirano: X
   Preskočeno: Y
   Ukupno: Z
```

## Korak 5: Provera u Sanity Studio

1. Otvori Sanity Studio na `/studio`
2. Otvori bilo koji proizvod
3. Sada bi trebalo da vidiš dropdown/select liste za boje, veličine i debljine umesto hardkodiranih vrednosti

## Napomena

⚠️ **Nakon uspešne migracije, možeš obrisati SANITY_API_TOKEN iz `.env.local` fajla iz sigurnosnih razloga, ili ga zadržati ako planiraš buduće migracije.**

## Ako nešto pođe po zlu

- Proveri da li je token ispravan
- Proveri konzolu za greške
- Kontaktiraj developera
