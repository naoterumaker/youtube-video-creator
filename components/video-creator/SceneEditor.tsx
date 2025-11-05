'use client';

import React, { useState } from 'react';
import { useVideoCreatorStore } from '@/store/video-creator-store';
import { Scene } from '@/lib/types/video';

export function SceneEditor() {
  const { scenes, updateScene, setCurrentStep, setIsGenerating } =
    useVideoCreatorStore();

  const [selectedSceneId, setSelectedSceneId] = useState<number | null>(
    scenes[0]?.id || null
  );
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);

  const selectedScene = scenes.find((s) => s.id === selectedSceneId);

  const handleGenerateImages = async () => {
    setIsGeneratingImages(true);

    try {
      // TODO: 画像生成API呼び出し（Issue #4で実装）
      // 仮のデモ画像URL
      const demoImages = [
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
        'https://images.unsplash.com/photo-1677442136019-21780ecad995',
        'https://images.unsplash.com/photo-1686191128892-3b5e6c2fb958',
        'https://images.unsplash.com/photo-1677442135654-5ad1f2e0e90e',
      ];

      for (let i = 0; i < scenes.length; i++) {
        updateScene(scenes[i].id, {
          imageUrl: demoImages[i % demoImages.length] + '?w=1080&h=1920&fit=crop',
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (error) {
      console.error('Failed to generate images:', error);
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const allImagesGenerated = scenes.every((s) => s.imageUrl);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">シーンを編集</h2>
        <p className="text-gray-600">
          各シーンのテキストと画像プロンプトを調整してください
        </p>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleGenerateImages}
          disabled={isGeneratingImages || allImagesGenerated}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGeneratingImages
            ? '画像生成中...'
            : allImagesGenerated
            ? '✓ 画像生成済み'
            : '🎨 画像を一括生成'}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 左: シーンリスト */}
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">シーン一覧</h3>
          <div className="space-y-2">
            {scenes.map((scene, index) => (
              <button
                key={scene.id}
                onClick={() => setSelectedSceneId(scene.id)}
                className={`w-full p-4 rounded-lg border-2 transition text-left ${
                  selectedSceneId === scene.id
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded overflow-hidden">
                    {scene.imageUrl ? (
                      <img
                        src={scene.imageUrl}
                        alt={`Scene ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        画像なし
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        Scene {index + 1}
                      </span>
                      <span className="text-xs text-gray-500">
                        {(scene.duration / 30).toFixed(1)}秒
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {scene.text}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 右: シーン編集 */}
        <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          {selectedScene ? (
            <>
              <h3 className="font-semibold text-gray-900">
                Scene {scenes.findIndex((s) => s.id === selectedScene.id) + 1} を編集
              </h3>

              {/* テキスト編集 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  表示テキスト
                </label>
                <textarea
                  value={selectedScene.text}
                  onChange={(e) =>
                    updateScene(selectedScene.id, { text: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {/* 画像プロンプト編集 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  画像プロンプト
                </label>
                <textarea
                  value={selectedScene.imagePrompt}
                  onChange={(e) =>
                    updateScene(selectedScene.id, { imagePrompt: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={2}
                />
              </div>

              {/* 長さ調整 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  表示時間: {(selectedScene.duration / 30).toFixed(1)}秒
                </label>
                <input
                  type="range"
                  min={60}
                  max={300}
                  step={30}
                  value={selectedScene.duration}
                  onChange={(e) =>
                    updateScene(selectedScene.id, {
                      duration: Number(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2秒</span>
                  <span>10秒</span>
                </div>
              </div>

              {/* プレビュー画像 */}
              {selectedScene.imageUrl && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    画像プレビュー
                  </label>
                  <div className="rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={selectedScene.imageUrl}
                      alt="Scene preview"
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center text-gray-500 py-12">
              左からシーンを選択してください
            </div>
          )}
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep('script')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
        >
          ← 戻る
        </button>

        <button
          onClick={() => setCurrentStep('preview')}
          disabled={!allImagesGenerated}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          プレビュー →
        </button>
      </div>
    </div>
  );
}
