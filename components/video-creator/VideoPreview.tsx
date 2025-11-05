'use client';

import React from 'react';
import { Player } from '@remotion/player';
import { useVideoCreatorStore } from '@/store/video-creator-store';
import { YouTubeShorts } from '@/remotion/templates/YouTubeShorts';
import { StandardVideo } from '@/remotion/templates/StandardVideo';
import { SquareVideo } from '@/remotion/templates/SquareVideo';

export function VideoPreview() {
  const { template, scenes, setCurrentStep } = useVideoCreatorStore();

  const totalDuration = scenes.reduce((sum, scene) => sum + scene.duration, 0);

  const getComponent = () => {
    switch (template) {
      case 'youtube-shorts':
        return YouTubeShorts;
      case 'standard':
        return StandardVideo;
      case 'square':
        return SquareVideo;
      default:
        return YouTubeShorts;
    }
  };

  const getDimensions = () => {
    switch (template) {
      case 'youtube-shorts':
        return { width: 1080, height: 1920 };
      case 'standard':
        return { width: 1920, height: 1080 };
      case 'square':
        return { width: 1080, height: 1080 };
      default:
        return { width: 1080, height: 1920 };
    }
  };

  const dimensions = getDimensions();
  const Component = getComponent();

  // プレビュー用のスケール計算
  const maxHeight = 600;
  const scale = Math.min(maxHeight / dimensions.height, 1);
  const previewWidth = dimensions.width * scale;
  const previewHeight = dimensions.height * scale;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">動画プレビュー</h2>
        <p className="text-gray-600">
          作成した動画を確認してください
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex flex-col items-center gap-6">
          {/* プレビュー情報 */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="font-medium">テンプレート:</span>
              <span>
                {template === 'youtube-shorts'
                  ? 'YouTube Shorts'
                  : template === 'standard'
                  ? 'Standard Video'
                  : 'Square Video'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">解像度:</span>
              <span>
                {dimensions.width} × {dimensions.height}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">長さ:</span>
              <span>{(totalDuration / 30).toFixed(1)}秒</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">シーン数:</span>
              <span>{scenes.length}</span>
            </div>
          </div>

          {/* Remotion Player */}
          <div
            className="rounded-lg overflow-hidden shadow-2xl"
            style={{
              width: previewWidth,
              height: previewHeight,
            }}
          >
            <Player
              component={Component}
              inputProps={{ scenes }}
              durationInFrames={totalDuration}
              fps={30}
              compositionWidth={dimensions.width}
              compositionHeight={dimensions.height}
              style={{
                width: '100%',
                height: '100%',
              }}
              controls
              loop
            />
          </div>

          {/* 操作説明 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-xl">
            <div className="flex items-start gap-3">
              <div className="text-2xl">💡</div>
              <div className="flex-1 text-sm">
                <h4 className="font-semibold text-gray-900 mb-1">操作方法</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• 再生ボタンで動画を確認できます</li>
                  <li>• 気に入らない場合は「戻る」から編集できます</li>
                  <li>• 完成したら「ダウンロード」で保存できます</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* アクションボタン */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep('scenes')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
        >
          ← シーン編集に戻る
        </button>

        <div className="flex gap-3">
          <button
            onClick={() => {
              // TODO: レンダリング機能実装
              alert('レンダリング機能は開発中です');
            }}
            className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-lg"
          >
            📥 ダウンロード (MP4)
          </button>
        </div>
      </div>
    </div>
  );
}
