'use client';

import React from 'react';
import { useVideoCreatorStore } from '@/store/video-creator-store';
import { VideoTemplate } from '@/lib/types/video';

const templates: Array<{
  id: VideoTemplate;
  name: string;
  icon: string;
  dimensions: string;
  duration: string;
  description: string;
  platform: string;
}> = [
  {
    id: 'youtube-shorts',
    name: 'YouTube Shorts',
    icon: '📱',
    dimensions: '1080 × 1920',
    duration: '最大60秒',
    description: 'ダイナミックな縦型動画。TikTok、Instagram Reelsにも対応',
    platform: 'YouTube, TikTok, Instagram',
  },
  {
    id: 'standard',
    name: 'Standard Video',
    icon: '🎥',
    dimensions: '1920 × 1080',
    duration: '最大3分',
    description: 'プロフェッショナルな横型動画。YouTube通常動画に最適',
    platform: 'YouTube, Vimeo',
  },
  {
    id: 'square',
    name: 'Square Video',
    icon: '⬜',
    dimensions: '1080 × 1080',
    duration: '最大90秒',
    description: 'SNS投稿に最適なスクエア動画',
    platform: 'Instagram, Facebook, Twitter',
  },
];

export function TemplateSelector() {
  const { template, setTemplate, setCurrentStep } = useVideoCreatorStore();

  const handleNext = () => {
    setCurrentStep('script');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          動画テンプレートを選択
        </h2>
        <p className="text-gray-600">
          プラットフォームに最適なテンプレートを選んでください
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {templates.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`relative p-6 rounded-xl border-2 transition text-left ${
              template === t.id
                ? 'border-blue-600 bg-blue-50 shadow-lg'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
          >
            {template === t.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}

            <div className="text-5xl mb-4">{t.icon}</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{t.name}</h3>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">サイズ:</span>
                <span>{t.dimensions}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">長さ:</span>
                <span>{t.duration}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{t.description}</p>
            <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full inline-block">
              {t.platform}
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-center pt-6">
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          次へ: 台本作成 →
        </button>
      </div>
    </div>
  );
}
