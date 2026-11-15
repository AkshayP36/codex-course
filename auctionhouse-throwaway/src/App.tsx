import { useEffect, useState } from 'react'
import { Link, Route, Routes, useParams } from 'react-router-dom'
import { auctions, formatCurrency } from './data/auctions'
import fallbackImage from './assets/auction-fallback.svg'

type Theme = 'gallery' | 'midnight' | 'sunroom'

const themes: { id: Theme; name: string; note: string }[] = [
  { id: 'gallery', name: 'Gallery', note: 'Editorial & warm' },
  { id: 'midnight', name: 'Midnight', note: 'Dark & dramatic' },
  { id: 'sunroom', name: 'Sunroom', note: 'Bright & playful' },
]

function Brand() {
  return <Link className="brand" to="/"><span>H</span><i>Hearth &amp; Hammer</i></Link>
}

function ThemePicker({ theme, onChange }: { theme: Theme; onChange: (theme: Theme) => void }) {
  return <div className="theme-picker" aria-label="Choose a visual theme">
    {themes.map((item) => <button key={item.id} className={theme === item.id ? 'theme-option active' : 'theme-option'} onClick={() => onChange(item.id)}>
      <span className={`theme-swatch ${item.id}`} />
      <span><b>{item.name}</b><small>{item.note}</small></span>
    </button>)}
  </div>
}

function Header() {
  return <header><Brand /><nav><a href="#auctions">Explore auctions</a><a href="#about">How it works</a><button className="account-button">Sign in <span>↗</span></button></nav></header>
}

function AuctionImage({ auction }: { auction: typeof auctions[number] }) {
  return <img src={auction.image} alt={auction.title} onError={({ currentTarget }) => {
    currentTarget.onerror = null
    currentTarget.src = fallbackImage
  }} />
}

function AuctionCard({ auction }: { auction: typeof auctions[number] }) {
  return <Link className="auction-card" to={`/auction/${auction.id}`}>
    <div className="card-image"><AuctionImage auction={auction} /><span>{auction.category}</span>{auction.featured && <em>Featured</em>}</div>
    <div className="card-details"><div className="card-topline"><span>Current bid</span><span>Ends in {auction.ends}</span></div><h3>{auction.title}</h3><div className="card-bid"><strong>{formatCurrency(auction.bid)}</strong><small>{auction.bidders} bidders</small></div></div>
  </Link>
}

function Home({ theme, setTheme }: { theme: Theme; setTheme: (theme: Theme) => void }) {
  const [category, setCategory] = useState('All categories')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const categories = ['All categories', ...new Set(auctions.map((auction) => auction.category))]
  const visibleAuctions = category === 'All categories' ? auctions : auctions.filter((auction) => auction.category === category)

  return <><Header /><main>
    <section className="hero"><div className="hero-copy"><p className="eyebrow">Curated objects, real stories</p><h1>Find the piece<br />that stays with you.</h1><p className="hero-text">Thoughtfully sourced design, art and objects—each with a past worth passing on.</p><a className="primary-button" href="#auctions">Browse live auctions <span>↓</span></a></div><div className="hero-art"><img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=85" alt="An inviting, art-filled living room" onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = fallbackImage }} /><div className="hero-caption"><span>01</span><p>Live now<br /><b>Modern living, quietly collected</b></p></div></div></section>
    <section className="theme-section"><div><p className="eyebrow">Make it yours</p><h2>Three ways to browse.</h2></div><ThemePicker theme={theme} onChange={setTheme} /></section>
    <section id="auctions" className="auction-section"><div className="section-heading"><div><p className="eyebrow">Closing soon</p><h2>Live auctions</h2></div><div className="filter-control"><button className="filter-button" type="button" aria-expanded={isFilterOpen} aria-controls="category-filter" onClick={() => setIsFilterOpen((open) => !open)}>{category} <span>⌄</span></button>{isFilterOpen && <div id="category-filter" className="filter-menu" aria-label="Auction categories">{categories.map((item) => <button type="button" key={item} className={category === item ? 'selected' : ''} onClick={() => { setCategory(item); setIsFilterOpen(false) }}>{item}</button>)}</div>}</div></div><p className="auction-count" aria-live="polite">{visibleAuctions.length} {visibleAuctions.length === 1 ? 'auction' : 'auctions'} available</p><div className="auction-grid">{visibleAuctions.map((auction) => <AuctionCard key={auction.id} auction={auction} />)}</div></section>
    <section id="about" className="about"><p className="eyebrow">The H&amp;H difference</p><h2>Every object deserves<br />a second act.</h2><p>We believe a home tells its best story when it is gathered slowly. Our specialists source pieces with soul, then make it simple to bring them home.</p><a href="#auctions">Meet our specialists <span>→</span></a></section>
  </main><footer><Brand /><span>© 2026 Hearth &amp; Hammer</span><span>Bid beautifully.</span></footer></>
}

function AuctionPage() {
  const { id } = useParams()
  const auction = auctions.find((item) => item.id === id)
  const [bid, setBid] = useState(auction ? auction.bid + 100 : 0)
  const [bidMessage, setBidMessage] = useState('')
  if (!auction) return <><Header /><main className="not-found"><h1>This lot has moved on.</h1><Link to="/">Back to live auctions</Link></main></>
  return <><Header /><main className="detail-page"><Link className="back-link" to="/">← All live auctions</Link><div className="detail-grid"><div className="detail-image"><AuctionImage auction={auction} /><span>{auction.category}</span></div><div className="detail-content"><p className="eyebrow">Lot {String(auctions.indexOf(auction) + 1).padStart(2, '0')} · {auction.category}</p><h1>{auction.title}</h1><p className="detail-description">{auction.description}</p><div className="bid-panel"><div><span>Current bid</span><strong>{formatCurrency(auction.bid)}</strong><small>{auction.bidders} bidders · Estimate {auction.estimate}</small></div><b>Ends in {auction.ends}</b></div><form className="bid-form" onSubmit={(event) => { event.preventDefault(); setBidMessage(bid >= auction.bid + 100 ? `Your maximum bid of ${formatCurrency(bid)} is ready to place.` : `Enter at least ${formatCurrency(auction.bid + 100)} to place a bid.`) }}><label htmlFor="bid">Your maximum bid</label><div><span>$</span><input id="bid" type="number" min={auction.bid + 100} value={bid} onChange={(event) => { setBid(Number(event.target.value)); setBidMessage('') }} /><button type="submit">Place bid</button></div><small>Bidding is binding. A 10% buyer’s premium applies.</small>{bidMessage && <p className="bid-message" role="status">{bidMessage}</p>}</form><dl><div><dt>Condition</dt><dd>{auction.condition}</dd></div><div><dt>Location</dt><dd>{auction.location}</dd></div><div><dt>Provenance</dt><dd>{auction.provenance}</dd></div></dl></div></div></main></>
}

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('auction-theme') as Theme) || 'gallery')
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('auction-theme', theme) }, [theme])
  return <Routes><Route path="/" element={<Home theme={theme} setTheme={setTheme} />} /><Route path="/auction/:id" element={<AuctionPage />} /><Route path="*" element={<AuctionPage />} /></Routes>
}
