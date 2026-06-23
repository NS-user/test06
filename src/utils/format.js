// 数値整形ユーティリティ

export function formatVolume(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export function formatChange(n) {
  const sign = n > 0 ? '+' : ''
  return `${sign}${n}%`
}

export function changeClass(n) {
  if (n > 0) return 'up'
  if (n < 0) return 'down'
  return 'flat'
}
