# 📈 Global Search Trends

世界でよく検索されているワードとトレンドを分析・可視化するダッシュボードアプリです。

![tech](https://img.shields.io/badge/React-18-61dafb) ![tech](https://img.shields.io/badge/Vite-5-646cff) ![tech](https://img.shields.io/badge/Recharts-2-ec4899)

## 機能

- 🌍 **地域フィルタ** — 世界全体・日本・アメリカ・インドなど 8 地域の検索トレンドを切り替え
- 🏷️ **カテゴリフィルタ** — テクノロジー / エンタメ / スポーツ / ニュース / 健康 / 金融 / ゲーム
- 📊 **サマリーカード** — トップ検索ワード・急上昇ワード・注目カテゴリ・総検索ボリューム
- 📈 **関心度の推移チャート** — 過去 12 週の関心度を折れ線で比較（最大 4 ワード）
- 🥧 **カテゴリ構成チャート** — 地域内の検索ボリュームのシェアを円グラフで表示
- 📋 **トレンドランキング表** — 検索量順 / 急上昇順の並べ替え、キーワード検索、行ごとのスパークライン
- 📱 **レスポンシブ対応** のモダンなダークテーマ UI

## セットアップ

```bash
npm install      # 依存パッケージのインストール
npm run dev      # 開発サーバー起動 (http://localhost:5173)
npm run build    # 本番ビルド (dist/)
npm run preview  # ビルド結果のプレビュー
```

## デプロイ（GitHub Pages）

`main` ブランチへ push すると、GitHub Actions
（`.github/workflows/deploy.yml`）が自動でビルドして GitHub Pages に公開します。
手動実行（Actions タブの「Run workflow」）にも対応しています。

公開 URL: `https://ns-user.github.io/test06/`

**初回のみ必要な設定**（リポジトリの Settings → Pages）:

- **Source** を **「GitHub Actions」** に設定してください。

> プロジェクトサイトは `/test06/` 配下で配信されるため、`vite.config.js` で
> 本番ビルド時のみ `base: '/test06/'` を付与しています。

## データについて

本アプリは**内蔵のサンプルデータ**で動作します。Google Trends には公式 API が
なく、実データ取得はレート制限やネットワーク環境の影響を受けやすいため、
リアルなモックデータを同梱しています。

データは決定論的な疑似乱数で生成され、再読み込みしても同じ結果になります。
実データへ差し替える場合は `src/data/trends.js` の `getTrends()` を
外部 API 呼び出しに置き換えてください。データ形状は以下の通りです。

```js
{
  id, term, category, region,
  volume,        // 推定検索ボリューム
  change,        // 前週比 (%)
  interest: [],  // 過去12週の関心度 (0-100)
}
```

## 構成

```
src/
  data/trends.js          # サンプルデータと取得ロジック
  utils/format.js         # 数値整形ユーティリティ
  components/
    Header.jsx
    Filters.jsx           # 地域・カテゴリ・検索フィルタ
    StatsCards.jsx        # サマリーカード
    InterestChart.jsx     # 関心度推移（折れ線）
    CategoryChart.jsx     # カテゴリ構成（円グラフ）
    TrendsTable.jsx       # トレンドランキング表
    Sparkline.jsx         # テーブル行のミニチャート
  App.jsx                 # 画面全体の状態管理・レイアウト
```
