'use client';

import React, { useState } from 'react';
import { useVideoCreatorStore } from '@/store/video-creator-store';

export function ScriptInput() {
  const { template, setScenes, setCurrentStep, setIsGenerating } =
    useVideoCreatorStore();

  const [script, setScript] = useState('');
  const [numberOfScenes, setNumberOfScenes] = useState(5);

  const maxScenes = template === 'youtube-shorts' ? 6 : template === 'square' ? 8 : 10;

  const handleGenerate = async () => {
    if (!script.trim()) return;

    setIsGenerating(true);

    try {
      // Gemini 2.5 Flash APIを呼び出し
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: script,
          template,
          numberOfScenes,
          duration: numberOfScenes * 6, // 1シーン6秒
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const data = await response.json();
      setScenes(data.scenes);
      setCurrentStep('scenes');
    } catch (error) {
      console.error('Failed to generate scenes:', error);
      alert('台本生成に失敗しました。もう一度お試しください。');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">台本を入力</h2>
        <p className="text-gray-600">
          動画にしたい内容を入力してください。AIが自動的にシーンに分割します
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        {/* 台本入力 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            台本・ストーリー
          </label>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            placeholder={`例:\nAI技術の進化が止まらない。\n画像生成AIが新しい時代を切り開く。\nRemotionで簡単に動画作成。\n未来はあなたの手の中に。`}
            className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="mt-2 text-sm text-gray-500">
            {script.length} 文字
          </div>
        </div>

        {/* シーン数設定 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            シーン数: {numberOfScenes}
          </label>
          <input
            type="range"
            min={2}
            max={maxScenes}
            value={numberOfScenes}
            onChange={(e) => setNumberOfScenes(Number(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>2シーン</span>
            <span>{maxScenes}シーン</span>
          </div>
        </div>

        {/* テンプレート情報 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">
              {template === 'youtube-shorts' ? '📱' : template === 'standard' ? '🎥' : '⬜'}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">
                {template === 'youtube-shorts'
                  ? 'YouTube Shorts'
                  : template === 'standard'
                  ? 'Standard Video'
                  : 'Square Video'}
              </h4>
              <p className="text-sm text-gray-600">
                約 {numberOfScenes * 6}秒の動画 (1シーン約6秒)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep('template')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
        >
          ← 戻る
        </button>

        <button
          onClick={handleGenerate}
          disabled={!script.trim()}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          シーンを生成 →
        </button>
      </div>
    </div>
  );
}
