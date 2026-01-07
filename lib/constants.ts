// Mapa boja sa hex kodovima
export const COLOR_MAP: Record<string, { _id: string; name: string; hexCode: string }> = {
  'crna': { _id: 'crna', name: 'Crna', hexCode: '#000000' },
  'bela': { _id: 'bela', name: 'Bela', hexCode: '#FFFFFF' },
  'braon': { _id: 'braon', name: 'Braon', hexCode: '#8B4513' },
  'siva': { _id: 'siva', name: 'Siva', hexCode: '#808080' },
  'bez': { _id: 'bez', name: 'Bež', hexCode: '#F5F5DC' },
  'crvena': { _id: 'crvena', name: 'Crvena', hexCode: '#DC2626' },
  'plava': { _id: 'plava', name: 'Plava', hexCode: '#3B82F6' },
  'roze': { _id: 'roze', name: 'Roze', hexCode: '#EC4899' },
  'ljubicasta': { _id: 'ljubicasta', name: 'Ljubičasta', hexCode: '#A855F7' },
  'zelena': { _id: 'zelena', name: 'Zelena', hexCode: '#22C55E' },
  'narandzasta': { _id: 'narandzasta', name: 'Narandžasta', hexCode: '#F97316' },
  'zuta': { _id: 'zuta', name: 'Žuta', hexCode: '#EAB308' },
  'bordo': { _id: 'bordo', name: 'Bordo', hexCode: '#7F1D1D' },
  'teget': { _id: 'teget', name: 'Teget', hexCode: '#1E3A8A' },
  'krem': { _id: 'krem', name: 'Krem', hexCode: '#FFFDD0' },
}

// Mapa veličina
export const SIZE_MAP: Record<string, { _id: string; name: string }> = {
  'xs': { _id: 'xs', name: 'XS' },
  's': { _id: 's', name: 'S' },
  'm': { _id: 'm', name: 'M' },
  'l': { _id: 'l', name: 'L' },
  'xl': { _id: 'xl', name: 'XL' },
  'xxl': { _id: 'xxl', name: 'XXL' },
  'one-size': { _id: 'one-size', name: 'One Size' },
  '34-36': { _id: '34-36', name: '34-36' },
  '36-38': { _id: '36-38', name: '36-38' },
  '38-40': { _id: '38-40', name: '38-40' },
  '40-42': { _id: '40-42', name: '40-42' },
  '42-44': { _id: '42-44', name: '42-44' },
}

// Helper funkcije za konverziju
export function mapColors(colorValues: string[] | undefined): Array<{ _id: string; name: string; hexCode: string }> {
  if (!colorValues) return []
  return colorValues.map(value => COLOR_MAP[value]).filter(Boolean)
}

export function mapSizes(sizeValues: string[] | undefined): Array<{ _id: string; name: string }> {
  if (!sizeValues) return []
  return sizeValues.map(value => SIZE_MAP[value]).filter(Boolean)
}

export function mapDenier(denierValue: string | undefined): { _id: string; value: string } | null {
  if (!denierValue) return null
  return { _id: denierValue, value: `${denierValue} Den` }
}
