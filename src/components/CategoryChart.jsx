import { useMemo } from 'react'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts'
import { getTrends, CATEGORIES, categoryMeta } from '../data/trends.js'
import { formatVolume } from '../utils/format.js'

export default function CategoryChart({ region }) {
  // 地域内の全カテゴリの検索ボリューム構成
  const data = useMemo(() => {
    const all = getTrends({ region, category: 'all' })
    const byCat = {}
    for (const t of all) {
      byCat[t.category] = (byCat[t.category] || 0) + t.volume
    }
    return CATEGORIES.filter((c) => c.id !== 'all')
      .map((c) => ({
        name: c.name,
        value: byCat[c.id] || 0,
        color: c.color,
      }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value)
  }, [region])

  return (
    <div className="card chart-card">
      <div className="card-head">
        <h2>カテゴリ別の構成</h2>
        <span className="card-hint">検索ボリュームのシェア</span>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={95}
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} stroke="#12152400" />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) => formatVolume(v)}
            contentStyle={{
              background: '#1a1d2e',
              border: '1px solid #2a2f45',
              borderRadius: 8,
              color: '#e6e8f0',
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
