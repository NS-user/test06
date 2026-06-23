import { useMemo } from 'react'
import { categoryMeta } from '../data/trends.js'
import { formatVolume, formatChange, changeClass } from '../utils/format.js'

export default function StatsCards({ trends }) {
  const stats = useMemo(() => {
    if (trends.length === 0) {
      return null
    }
    const totalVolume = trends.reduce((a, t) => a + t.volume, 0)

    // 最も急上昇しているキーワード
    const rising = [...trends].sort((a, b) => b.change - a.change)[0]

    // 最も検索されているキーワード（ボリューム最大）
    const top = trends[0]

    // カテゴリ別の合計ボリューム → 最大カテゴリ
    const byCat = {}
    for (const t of trends) {
      byCat[t.category] = (byCat[t.category] || 0) + t.volume
    }
    const topCatId = Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a])[0]

    return { totalVolume, rising, top, topCat: categoryMeta(topCatId) }
  }, [trends])

  if (!stats) return null

  return (
    <section className="stats">
      <div className="stat-card">
        <div className="stat-icon">🔥</div>
        <div className="stat-body">
          <span className="stat-label">トップ検索ワード</span>
          <span className="stat-value">{stats.top.term}</span>
          <span className="stat-sub">{formatVolume(stats.top.volume)} 検索/週</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🚀</div>
        <div className="stat-body">
          <span className="stat-label">急上昇ワード</span>
          <span className="stat-value">{stats.rising.term}</span>
          <span className={`stat-sub ${changeClass(stats.rising.change)}`}>
            {formatChange(stats.rising.change)} 前週比
          </span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">{stats.topCat.icon}</div>
        <div className="stat-body">
          <span className="stat-label">注目カテゴリ</span>
          <span className="stat-value" style={{ color: stats.topCat.color }}>
            {stats.topCat.name}
          </span>
          <span className="stat-sub">最も検索量が多い分野</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">🌐</div>
        <div className="stat-body">
          <span className="stat-label">総検索ボリューム</span>
          <span className="stat-value">{formatVolume(stats.totalVolume)}</span>
          <span className="stat-sub">{trends.length} ワードの合計</span>
        </div>
      </div>
    </section>
  )
}
