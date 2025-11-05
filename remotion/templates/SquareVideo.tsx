import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Scene as SceneComponent } from '../components/Scene';
import { Scene } from '../../lib/types/video';

interface SquareVideoProps {
  scenes: Scene[];
}

export const SquareVideo: React.FC<SquareVideoProps> = ({ scenes }) => {
  let currentFrame = 0;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
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

      {/* Instagram/SNS向けの装飾 */}
      <AbsoluteFill
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: 24,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontSize: 12,
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: '8px 16px',
            borderRadius: 20,
          }}
        >
          #AIVideo #AutoCreated
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
