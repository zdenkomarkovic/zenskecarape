export const CareSymbols = {
  'hand-wash-cold-separate': (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
      {/* Hand wash basin */}
      <path d="M20 60 L80 60 L75 80 L25 80 Z" />
      {/* Water waves */}
      <path d="M30 70 Q35 65 40 70 T50 70 T60 70 T70 70" />
      {/* Hand */}
      <path d="M40 35 L40 55 M35 40 L35 50 M45 40 L45 50 M50 42 L50 52" />
      <circle cx="42.5" cy="32" r="3" fill="currentColor" />
      {/* 30° temperature mark */}
      <text x="50" y="50" fontSize="12" textAnchor="middle" fill="currentColor">30°</text>
    </svg>
  ),
  'no-bleach': (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      {/* Triangle (bleach symbol) */}
      <path d="M50 20 L80 80 L20 80 Z" />
      {/* X (prohibition) */}
      <line x1="25" y1="25" x2="75" y2="75" strokeWidth="3" />
      <line x1="75" y1="25" x2="25" y2="75" strokeWidth="3" />
    </svg>
  ),
  'no-tumble-dry': (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      {/* Square (dryer) */}
      <rect x="20" y="20" width="60" height="60" rx="5" />
      {/* Circle inside */}
      <circle cx="50" cy="50" r="20" />
      {/* X (prohibition) */}
      <line x1="25" y1="25" x2="75" y2="75" strokeWidth="3" />
      <line x1="75" y1="25" x2="25" y2="75" strokeWidth="3" />
    </svg>
  ),
  'line-dry': (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      {/* Square */}
      <rect x="20" y="20" width="60" height="60" rx="5" />
      {/* Vertical line (hanging) */}
      <line x1="50" y1="20" x2="50" y2="80" strokeWidth="3" />
    </svg>
  ),
  'no-iron': (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      {/* Iron shape */}
      <path d="M25 45 L75 45 L75 65 Q75 75 65 75 L35 75 Q25 75 25 65 Z" />
      <path d="M30 45 L30 35 L70 35 L70 45" />
      {/* X (prohibition) */}
      <line x1="25" y1="30" x2="75" y2="80" strokeWidth="3" />
      <line x1="75" y1="30" x2="25" y2="80" strokeWidth="3" />
    </svg>
  ),
  'no-dry-clean': (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      {/* Circle (dry clean symbol) */}
      <circle cx="50" cy="50" r="30" />
      {/* X (prohibition) */}
      <line x1="25" y1="25" x2="75" y2="75" strokeWidth="3" />
      <line x1="75" y1="25" x2="25" y2="75" strokeWidth="3" />
    </svg>
  ),
  'gentle-wet-clean': (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      {/* Circle */}
      <circle cx="50" cy="50" r="30" />
      {/* W for wet cleaning */}
      <text x="50" y="60" fontSize="28" fontWeight="bold" textAnchor="middle" fill="currentColor">W</text>
      {/* Underline for gentle */}
      <line x1="30" y1="85" x2="70" y2="85" strokeWidth="2" />
    </svg>
  ),
  'dry-flat': (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
      {/* Square */}
      <rect x="20" y="20" width="60" height="60" rx="5" />
      {/* Horizontal line (flat surface) */}
      <line x1="30" y1="50" x2="70" y2="50" strokeWidth="3" />
    </svg>
  ),
}

export const careLabelsData: Record<string, { label: string }> = {
  'hand-wash-cold-separate': { label: 'Ručno prati hladno odvojeno' },
  'no-bleach': { label: 'Ne beliti' },
  'no-tumble-dry': { label: 'Ne sušiti u mašini' },
  'line-dry': { label: 'Sušiti na konopcu' },
  'no-iron': { label: 'Ne peglati' },
  'no-dry-clean': { label: 'Ne čistiti hemijski' },
  'gentle-wet-clean': { label: 'Veoma nežno mokro čišćenje' },
  'dry-flat': { label: 'Sušiti na ravnoj površini' },
}
