import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene as SceneComponent } from '../components/Scene';
import { Scene } from '../../lib/types/video';

interface StandardVideoProps {
  scenes: Scene[];
}

export const StandardVideo: React.FC<StandardVideoProps> = ({ scenes }) => {
  let currentFrame = 0;

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a1a' }}>
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

      {/* プロフェッショナルなブランディング */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          padding: 30,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 'bold',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '10px 20px',
            borderRadius: 8,
          }}
        >
          AI Video Creator
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
