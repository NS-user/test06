import { useMemo } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import { WEEKS } from '../data/trends.js'

const LINE_COLORS = ['#6366f1', '#ec4899', '#22c55e', '#f59e0b']

export default function InterestChart({ items, usingSelection }) {
  // recharts 用に [{ week, <term>: value, ... }] へ変換
  const data = useMemo(() => {
    return WEEKS.map((week, i) => {
      const row = { week }
      items.forEach((it) => {
        row[it.term] = it.interest[i]
      })
      return row
    })
  }, [items])

  return (
    <div className="card chart-card">
      <div className="card-head">
        <h2>関心度の推移</h2>
        <span className="card-hint">
          {usingSelection ? '選択中のワード' : '上位3ワード'}（過去12週・0-100）
        </span>
      </div>
      {items.length === 0 ? (
        <div className="empty">表示するデータがありません</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2f45" />
            <XAxis dataKey="week" stroke="#8b90a8" fontSize={12} />
            <YAxis stroke="#8b90a8" fontSize={12} domain={[0, 100]} />
            <Tooltip
              contentStyle={{
                background: '#1a1d2e',
                border: '1px solid #2a2f45',
                borderRadius: 8,
                color: '#e6e8f0',
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            {items.map((it, i) => (
              <Line
                key={it.id}
                type="monotone"
                dataKey={it.term}
                stroke={LINE_COLORS[i % LINE_COLORS.length]}
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
