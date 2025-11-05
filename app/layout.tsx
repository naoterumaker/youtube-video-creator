import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'YouTube Video Creator - AI動画作成プラットフォーム',
  description: 'YouTubeチャンネル分析とAI駆動の動画作成を一つのダッシュボードで',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
