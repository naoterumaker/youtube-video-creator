'use client';

import React from 'react';
import { useVideoCreatorStore } from '@/store/video-creator-store';
import { TemplateSelector } from '@/components/video-creator/TemplateSelector';
import { ScriptInput } from '@/components/video-creator/ScriptInput';
import { SceneEditor } from '@/components/video-creator/SceneEditor';
import { VideoPreview } from '@/components/video-creator/VideoPreview';

export default function VideoCreatorPage() {
  const { currentStep } = useVideoCreatorStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            🎬 Video Creator
          </h1>
        </div>
      </header>

      {/* プログレスバー */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Step
              number={1}
              label="Template"
              active={currentStep === 'template'}
              completed={currentStep !== 'template'}
            />
            <Divider />
            <Step
              number={2}
              label="Script"
              active={currentStep === 'script'}
              completed={currentStep === 'scenes' || currentStep === 'preview'}
            />
            <Divider />
            <Step
              number={3}
              label="Scenes"
              active={currentStep === 'scenes'}
              completed={currentStep === 'preview'}
            />
            <Divider />
            <Step
              number={4}
              label="Preview"
              active={currentStep === 'preview'}
              completed={false}
            />
          </div>
        </div>
      </div>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentStep === 'template' && <TemplateSelector />}
        {currentStep === 'script' && <ScriptInput />}
        {currentStep === 'scenes' && <SceneEditor />}
        {currentStep === 'preview' && <VideoPreview />}
      </main>
    </div>
  );
}

function Step({
  number,
  label,
  active,
  completed,
}: {
  number: number;
  label: string;
  active: boolean;
  completed: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition ${
          active
            ? 'bg-blue-600 text-white'
            : completed
            ? 'bg-green-500 text-white'
            : 'bg-gray-200 text-gray-500'
        }`}
      >
        {completed ? '✓' : number}
      </div>
      <span
        className={`font-medium ${
          active ? 'text-blue-600' : completed ? 'text-green-600' : 'text-gray-500'
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function Divider() {
  return <div className="flex-1 h-0.5 bg-gray-200 mx-4" />;
}
