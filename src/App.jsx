import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Filters from './components/Filters.jsx'
import StatsCards from './components/StatsCards.jsx'
import TrendsTable from './components/TrendsTable.jsx'
import InterestChart from './components/InterestChart.jsx'
import CategoryChart from './components/CategoryChart.jsx'
import { getTrends, regionMeta } from './data/trends.js'

export default function App() {
  const [region, setRegion] = useState('WW')
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState([]) // 比較対象キーワードの id 配列

  // 現在のフィルタに対応するトレンド一覧
  const trends = useMemo(() => getTrends({ region, category }), [region, category])

  // 検索フィルタ適用後の一覧
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return trends
    return trends.filter((t) => t.term.toLowerCase().includes(q))
  }, [trends, query])

  // 比較チャートで使うキーワード（選択がなければ上位3件）
  const compareItems = useMemo(() => {
    if (selected.length > 0) {
      return trends.filter((t) => selected.includes(t.id))
    }
    return trends.slice(0, 3)
  }, [trends, selected])

  function toggleSelect(id) {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= 4) return prev // 比較は最大4件
      return [...prev, id]
    })
  }

  return (
    <div className="app">
      <Header region={regionMeta(region)} totalKeywords={trends.length} />

      <main className="container">
        <Filters
          region={region}
          setRegion={setRegion}
          category={category}
          setCategory={setCategory}
          query={query}
          setQuery={setQuery}
        />

        <StatsCards trends={trends} />

        <section className="grid-2">
          <InterestChart items={compareItems} usingSelection={selected.length > 0} />
          <CategoryChart region={region} />
        </section>

        <TrendsTable
          items={filtered}
          selected={selected}
          onToggle={toggleSelect}
          onClearSelection={() => setSelected([])}
        />
      </main>

      <footer className="footer">
        <p>
          📊 Global Search Trends — サンプルデータによるデモ。実データは
          Google Trends 等の API に差し替え可能です。
        </p>
      </footer>
    </div>
  )
}
