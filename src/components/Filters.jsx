import { REGIONS, CATEGORIES } from '../data/trends.js'

export default function Filters({
  region,
  setRegion,
  category,
  setCategory,
  query,
  setQuery,
}) {
  return (
    <section className="filters">
      <div className="filter-row">
        <div className="filter-group">
          <label className="filter-label">地域</label>
          <div className="chips">
            {REGIONS.map((r) => (
              <button
                key={r.code}
                className={`chip ${region === r.code ? 'active' : ''}`}
                onClick={() => setRegion(r.code)}
              >
                <span>{r.flag}</span>
                {r.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label className="filter-label">カテゴリ</label>
          <div className="chips">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                className={`chip ${category === c.id ? 'active' : ''}`}
                style={category === c.id ? { borderColor: c.color, color: c.color } : undefined}
                onClick={() => setCategory(c.id)}
              >
                <span>{c.icon}</span>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="filter-row">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="キーワードを検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery('')}>
              ✕
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
