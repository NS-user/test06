import { useState } from 'react'
import Sparkline from './Sparkline.jsx'
import { categoryMeta } from '../data/trends.js'
import { formatVolume, formatChange, changeClass } from '../utils/format.js'

export default function TrendsTable({ items, selected, onToggle, onClearSelection }) {
  const [sortBy, setSortBy] = useState('volume') // 'volume' | 'change'

  const sorted = [...items].sort((a, b) =>
    sortBy === 'change' ? b.change - a.change : b.volume - a.volume
  )

  return (
    <section className="card table-card">
      <div className="card-head">
        <h2>トレンドランキング</h2>
        <div className="table-actions">
          {selected.length > 0 && (
            <button className="link-btn" onClick={onClearSelection}>
              選択を解除 ({selected.length})
            </button>
          )}
          <div className="sort-toggle">
            <button
              className={sortBy === 'volume' ? 'active' : ''}
              onClick={() => setSortBy('volume')}
            >
              検索量順
            </button>
            <button
              className={sortBy === 'change' ? 'active' : ''}
              onClick={() => setSortBy('change')}
            >
              急上昇順
            </button>
          </div>
        </div>
      </div>

      <div className="table-hint">
        行をクリックすると関心度チャートで比較できます（最大4件）
      </div>

      {sorted.length === 0 ? (
        <div className="empty">該当するキーワードがありません</div>
      ) : (
        <div className="table-wrap">
          <table className="trends-table">
            <thead>
              <tr>
                <th className="col-rank">#</th>
                <th>キーワード</th>
                <th className="col-cat">カテゴリ</th>
                <th className="col-vol">検索量/週</th>
                <th className="col-change">前週比</th>
                <th className="col-spark">推移</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((t, i) => {
                const cat = categoryMeta(t.category)
                const isSel = selected.includes(t.id)
                return (
                  <tr
                    key={t.id}
                    className={isSel ? 'selected' : ''}
                    onClick={() => onToggle(t.id)}
                  >
                    <td className="col-rank">{i + 1}</td>
                    <td className="col-term">
                      <span className="term-text">{t.term}</span>
                    </td>
                    <td className="col-cat">
                      <span className="cat-badge" style={{ '--cat-color': cat.color }}>
                        {cat.icon} {cat.name}
                      </span>
                    </td>
                    <td className="col-vol">{formatVolume(t.volume)}</td>
                    <td className={`col-change ${changeClass(t.change)}`}>
                      {t.change > 0 ? '▲' : t.change < 0 ? '▼' : '—'} {formatChange(t.change)}
                    </td>
                    <td className="col-spark">
                      <Sparkline
                        values={t.interest}
                        color={t.change >= 0 ? '#22c55e' : '#ef4444'}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
