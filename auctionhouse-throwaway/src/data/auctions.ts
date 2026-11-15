export type Auction = {
  id: string
  title: string
  category: string
  description: string
  image: string
  bid: number
  estimate: string
  bidders: number
  ends: string
  location: string
  condition: string
  provenance: string
  featured?: boolean
}

export const auctions: Auction[] = [
  {
    id: 'solstice-chair',
    title: 'Solstice Lounge Chair',
    category: 'Design',
    description: 'A sculptural 1970s lounge chair with warm saddle leather and a quietly confident silhouette. The patina is entirely original.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=85',
    bid: 2400,
    estimate: '$2,800 – $3,400',
    bidders: 14,
    ends: '2h 18m',
    location: 'New York, NY',
    condition: 'Excellent',
    provenance: 'Private collection, Hudson Valley',
    featured: true,
  },
  {
    id: 'alpine-study',
    title: 'Alpine Study, 1966',
    category: 'Art',
    description: 'An atmospheric signed landscape in oil, notable for its layered palette and elegant restraint.',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=85',
    bid: 1250,
    estimate: '$1,500 – $2,000',
    bidders: 9,
    ends: '4h 42m',
    location: 'Boston, MA',
    condition: 'Very good',
    provenance: 'Estate of J. G. Harmon',
  },
  {
    id: 'zodiac-chronograph',
    title: 'Zodiac Chronograph',
    category: 'Watches',
    description: 'A precise, handsome mechanical chronograph with a sunburst dial and a recently serviced movement.',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85',
    bid: 3800,
    estimate: '$4,000 – $5,000',
    bidders: 21,
    ends: '6h 10m',
    location: 'Chicago, IL',
    condition: 'Excellent',
    provenance: 'Original box and service papers included',
  },
  {
    id: 'studio-ceramics',
    title: 'Pair of Studio Vessels',
    category: 'Objects',
    description: 'Two hand-thrown stoneware vessels with expressive ash glazes. Signed beneath each base.',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85',
    bid: 680,
    estimate: '$800 – $1,200',
    bidders: 7,
    ends: '8h 05m',
    location: 'Los Angeles, CA',
    condition: 'Excellent',
    provenance: 'Acquired directly from the artist',
  },
  {
    id: 'traveler-trunk',
    title: 'Grand Tour Traveler Trunk',
    category: 'Collectibles',
    description: 'A beautifully preserved late-19th-century travel trunk with original brass hardware and leather straps.',
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?auto=format&fit=crop&w=1200&q=85',
    bid: 1900,
    estimate: '$2,000 – $2,600',
    bidders: 11,
    ends: '1d 3h',
    location: 'Portland, OR',
    condition: 'Good, age-appropriate wear',
    provenance: 'Pacific Northwest private collection',
  },
  {
    id: 'filigree-necklace',
    title: 'Filigree & Pearl Necklace',
    category: 'Jewelry',
    description: 'A delicate 18k gold filigree necklace with graduated freshwater pearls and a floral clasp.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85',
    bid: 920,
    estimate: '$1,100 – $1,500',
    bidders: 18,
    ends: '1d 8h',
    location: 'Savannah, GA',
    condition: 'Excellent',
    provenance: 'Family descent, Georgia',
  },
]

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
