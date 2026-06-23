export default function Header({ region, totalKeywords }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <div className="brand">
          <span className="brand-logo">📈</span>
          <div>
            <h1>Global Search Trends</h1>
            <p className="brand-sub">世界の検索トレンド分析ダッシュボード</p>
          </div>
        </div>
        <div className="header-meta">
          <span className="header-region">
            {region.flag} {region.name}
          </span>
          <span className="header-count">{totalKeywords} キーワードを追跡中</span>
        </div>
      </div>
    </header>
  )
}
