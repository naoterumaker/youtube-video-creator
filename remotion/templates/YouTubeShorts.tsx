import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene as SceneComponent } from '../components/Scene';
import { Scene } from '../../lib/types/video';

interface YouTubeShortsProps {
  scenes: Scene[];
}

export const YouTubeShorts: React.FC<YouTubeShortsProps> = ({ scenes }) => {
  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {scenes.map((scene) => {
        const startFrame = currentFrame;
        currentFrame += scene.duration;

        return (
          <Sequence
            key={scene.id}
            from={startFrame}
            durationInFrames={scene.duration}
          >
            <SceneComponent scene={scene} startFrame={startFrame} />
          </Sequence>
        );
      })}

      {/* ウォーターマーク（オプション） */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          padding: 20,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: 'rgba(255, 255, 255, 0.6)',
            fontWeight: '500',
          }}
        >
          Created with AI
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
