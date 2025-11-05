export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-5xl font-bold text-gray-900">
          🎬 YouTube Video Creator
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          YouTubeチャンネル分析とAI駆動の動画作成を一つのダッシュボードで
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <a
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            ダッシュボードを開く
          </a>
          <a
            href="/video-creator"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            動画を作成
          </a>
        </div>
        <div className="pt-8 grid grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold">チャンネル分析</h3>
            <p className="text-sm text-gray-600">
              最大5チャンネルの同時分析
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl mb-2">🤖</div>
            <h3 className="font-semibold">AI動画生成</h3>
            <p className="text-sm text-gray-600">
              台本からワンクリックで動画作成
            </p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold">Remotion統合</h3>
            <p className="text-sm text-gray-600">
              プログラマブルな動画編集
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
