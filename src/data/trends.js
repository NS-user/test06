// ============================================================
// サンプルの「世界の検索トレンド」データ
// ------------------------------------------------------------
// 本物の Google Trends API は公式提供がなく、実データ取得は
// レート制限・ネットワークの影響を受けやすいため、ここでは
// リアルなモックデータを内蔵しています。
// 後から実 API へ差し替えられるよう、データ形状を整理しています。
//
//   keyword = {
//     id, term, category, region,
//     volume,        // 推定検索ボリューム（直近の指標）
//     change,        // 前週比 (%)
//     interest: [],  // 過去12週の関心度 (0-100)
//   }
// ============================================================

export const REGIONS = [
  { code: 'WW', name: '世界全体', flag: '🌍' },
  { code: 'US', name: 'アメリカ', flag: '🇺🇸' },
  { code: 'JP', name: '日本', flag: '🇯🇵' },
  { code: 'IN', name: 'インド', flag: '🇮🇳' },
  { code: 'BR', name: 'ブラジル', flag: '🇧🇷' },
  { code: 'GB', name: 'イギリス', flag: '🇬🇧' },
  { code: 'DE', name: 'ドイツ', flag: '🇩🇪' },
  { code: 'KR', name: '韓国', flag: '🇰🇷' },
]

export const CATEGORIES = [
  { id: 'all', name: 'すべて', color: '#6366f1', icon: '🔎' },
  { id: 'tech', name: 'テクノロジー', color: '#06b6d4', icon: '💻' },
  { id: 'entertainment', name: 'エンタメ', color: '#ec4899', icon: '🎬' },
  { id: 'sports', name: 'スポーツ', color: '#22c55e', icon: '⚽' },
  { id: 'news', name: 'ニュース', color: '#f59e0b', icon: '📰' },
  { id: 'health', name: '健康', color: '#ef4444', icon: '🩺' },
  { id: 'finance', name: '金融', color: '#14b8a6', icon: '💹' },
  { id: 'gaming', name: 'ゲーム', color: '#a855f7', icon: '🎮' },
]

// 直近12週のラベル（古い→新しい）
export const WEEKS = Array.from({ length: 12 }, (_, i) => {
  const n = 12 - i
  return `${n}週前`
}).map((_, i) => `W${i + 1}`)

// ------------------------------------------------------------
// 地域 × カテゴリごとの代表的なキーワード（curated）
// ------------------------------------------------------------
const SEED_TERMS = {
  WW: {
    tech: ['ChatGPT', 'iPhone 16', 'Quantum Computing', 'Tesla', 'Starlink'],
    entertainment: ['Taylor Swift', 'Dune Part Two', 'Netflix', 'Oscars', 'BTS'],
    sports: ['Olympics 2026', 'Champions League', 'Formula 1', 'NBA Finals', 'World Cup'],
    news: ['Election 2026', 'Climate Summit', 'Stock Market', 'AI Regulation', 'Space Mission'],
    health: ['Ozempic', 'Mental Health', 'Vitamin D', 'Intermittent Fasting', 'Flu Season'],
    finance: ['Bitcoin', 'Interest Rates', 'Gold Price', 'NVIDIA Stock', 'Inflation'],
    gaming: ['GTA 6', 'Elden Ring', 'Minecraft', 'Fortnite', 'Steam Deck'],
  },
  US: {
    tech: ['Apple Vision Pro', 'OpenAI', 'Cybertruck', 'Wi-Fi 7', 'Meta Quest'],
    entertainment: ['Super Bowl', 'Marvel', 'Spotify Wrapped', 'TikTok', 'Grammys'],
    sports: ['NFL Playoffs', 'March Madness', 'MLB', 'LeBron James', 'Super Bowl'],
    news: ['US Election', 'Federal Reserve', 'Border Policy', 'Wildfires', 'Hurricane'],
    health: ['Weight Loss Drugs', 'COVID Variant', 'Therapy', 'Keto Diet', 'Sleep'],
    finance: ['S&P 500', '401k', 'Mortgage Rates', 'Tax Refund', 'Crypto'],
    gaming: ['Call of Duty', 'Roblox', 'PlayStation 5', 'Xbox', 'Helldivers 2'],
  },
  JP: {
    tech: ['生成AI', 'iPhone 16', 'PayPay', 'マイナンバー', 'EV車'],
    entertainment: ['紅白歌合戦', '推しの子', 'ジブリ', 'Snow Man', 'M-1グランプリ'],
    sports: ['大谷翔平', 'WBC', 'Jリーグ', '箱根駅伝', '甲子園'],
    news: ['地震情報', '為替 円安', '選挙', '台風', '物価高'],
    health: ['花粉症', 'インフルエンザ', 'ダイエット', '熱中症', '睡眠'],
    finance: ['新NISA', '日経平均', '円相場', 'ふるさと納税', '投資信託'],
    gaming: ['原神', 'ポケモン', 'スプラトゥーン', 'モンハン', 'Switch 2'],
  },
  IN: {
    tech: ['Jio', 'ChatGPT', 'Aadhaar', '5G India', 'UPI'],
    entertainment: ['Bollywood', 'IPL', 'Shah Rukh Khan', 'Bigg Boss', 'RRR'],
    sports: ['IPL 2026', 'Virat Kohli', 'Cricket World Cup', 'Kabaddi', 'Hockey'],
    news: ['Lok Sabha', 'Budget 2026', 'Monsoon', 'Petrol Price', 'ISRO'],
    health: ['Yoga', 'Dengue', 'Ayurveda', 'Diabetes', 'Air Quality'],
    finance: ['Sensex', 'Mutual Funds', 'Gold Rate', 'Rupee', 'SIP'],
    gaming: ['BGMI', 'Free Fire', 'Valorant', 'GTA 6', 'Ludo King'],
  },
  BR: {
    tech: ['Pix', 'ChatGPT', 'iPhone 16', 'Internet 5G', 'Notebook'],
    entertainment: ['Big Brother Brasil', 'Anitta', 'Novela', 'Carnaval', 'Netflix'],
    sports: ['Brasileirão', 'Neymar', 'Copa Libertadores', 'Fórmula 1', 'Vôlei'],
    news: ['Eleições', 'Dólar Hoje', 'Bolsa Família', 'Clima', 'Economia'],
    health: ['Dengue', 'Academia', 'Dieta', 'Saúde Mental', 'Vacina'],
    finance: ['Bovespa', 'Bitcoin', 'Tesouro Direto', 'Dólar', 'CDB'],
    gaming: ['Free Fire', 'EA FC', 'Valorant', 'GTA 6', 'Minecraft'],
  },
  GB: {
    tech: ['AI', 'iPhone 16', 'Broadband', 'EV Charging', 'Smart Home'],
    entertainment: ['BBC', 'Premier League', 'Eurovision', 'The Crown', 'Glastonbury'],
    sports: ['Premier League', 'Wimbledon', 'Six Nations', 'F1 British GP', 'Cricket'],
    news: ['UK Election', 'NHS', 'Cost of Living', 'Energy Bills', 'Weather'],
    health: ['NHS Waiting', 'Flu Jab', 'Mental Health', 'Diet', 'Sleep'],
    finance: ['FTSE 100', 'Mortgage', 'ISA', 'Pound', 'Interest Rate'],
    gaming: ['EA FC', 'Call of Duty', 'Fortnite', 'GTA 6', 'Xbox Game Pass'],
  },
  DE: {
    tech: ['Künstliche Intelligenz', 'iPhone 16', 'E-Auto', 'Glasfaser', 'Smart Home'],
    entertainment: ['Tatort', 'Bundesliga', 'Netflix', 'GZSZ', 'Eurovision'],
    sports: ['Bundesliga', 'Formel 1', 'Bayern München', 'Handball', 'Biathlon'],
    news: ['Bundestagswahl', 'Inflation', 'Energiepreise', 'Wetter', 'Streik'],
    health: ['Grippe', 'Abnehmen', 'Mentale Gesundheit', 'Ernährung', 'Schlaf'],
    finance: ['DAX', 'Bitcoin', 'Tagesgeld', 'Aktien', 'ETF'],
    gaming: ['EA FC', 'Counter-Strike', 'Minecraft', 'GTA 6', 'Anno'],
  },
  KR: {
    tech: ['생성형 AI', '갤럭시 S25', '아이폰 16', '카카오', '챗GPT'],
    entertainment: ['BTS', '오징어 게임', 'BLACKPINK', '넷플릭스', 'K-드라마'],
    sports: ['손흥민', 'KBO', 'K리그', '올림픽', 'LCK'],
    news: ['대통령 선거', '환율', '부동산', '날씨', '물가'],
    health: ['독감', '다이어트', '정신건강', '수면', '미세먼지'],
    finance: ['코스피', '비트코인', '삼성전자 주가', '환율', '적금'],
    gaming: ['리그 오브 레전드', '원신', '발로란트', '메이플스토리', '배틀그라운드'],
  },
}

// ------------------------------------------------------------
// 決定論的な疑似乱数（地域/語ごとに再現可能なデータを生成）
// ------------------------------------------------------------
function hashString(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function mulberry32(seed) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// 1キーワード分の時系列・指標を生成
function buildKeyword(term, category, region, rankInGroup) {
  const rand = mulberry32(hashString(`${region}|${term}`))
  const base = 30 + rand() * 50 // ベースの関心度
  const trendSlope = (rand() - 0.45) * 6 // 上昇/下降の傾き
  const interest = []
  let cur = base
  for (let w = 0; w < 12; w++) {
    cur += trendSlope * (rand() * 0.6 + 0.2)
    const noise = (rand() - 0.5) * 18
    let val = Math.round(cur + noise)
    val = Math.max(2, Math.min(100, val))
    interest.push(val)
  }
  // 直近の値を100に正規化しすぎないよう、最大を100にスケール
  const max = Math.max(...interest)
  const scaled = interest.map((v) => Math.round((v / max) * 100))

  const last = scaled[scaled.length - 1]
  const prev = scaled[scaled.length - 2] || last
  const change = prev === 0 ? 0 : Math.round(((last - prev) / prev) * 100)

  const volume = Math.round((scaled.reduce((a, b) => a + b, 0) / 12) * (8000 + rand() * 90000))

  return {
    id: `${region}-${category}-${rankInGroup}`,
    term,
    category,
    region,
    volume,
    change,
    interest: scaled,
  }
}

// 全キーワードを構築
function buildAllKeywords() {
  const out = []
  for (const region of Object.keys(SEED_TERMS)) {
    const byCat = SEED_TERMS[region]
    for (const category of Object.keys(byCat)) {
      byCat[category].forEach((term, i) => {
        out.push(buildKeyword(term, category, region, i))
      })
    }
  }
  return out
}

export const ALL_KEYWORDS = buildAllKeywords()

// 指定地域・カテゴリでフィルタし、ボリューム降順で返す
export function getTrends({ region = 'WW', category = 'all' } = {}) {
  return ALL_KEYWORDS.filter(
    (k) => k.region === region && (category === 'all' || k.category === category)
  ).sort((a, b) => b.volume - a.volume)
}

export function categoryMeta(id) {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[0]
}

export function regionMeta(code) {
  return REGIONS.find((r) => r.code === code) || REGIONS[0]
}
