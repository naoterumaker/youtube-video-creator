import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { Scene as SceneType } from '../../lib/types/video';

interface SceneProps {
  scene: SceneType;
  startFrame: number;
}

export const Scene: React.FC<SceneProps> = ({ scene, startFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sceneFrame = frame - startFrame;

  // フェードインアニメーション
  const fadeIn = spring({
    frame: sceneFrame,
    fps,
    config: {
      damping: 200,
    },
  });

  const opacity = interpolate(fadeIn, [0, 1], [0, 1]);

  // テキストスライドアップアニメーション
  const slideUp = spring({
    frame: sceneFrame,
    fps,
    config: {
      damping: 100,
    },
  });

  const translateY = interpolate(slideUp, [0, 1], [50, 0]);

  // 画像のKen Burns効果（ズーム）
  const scale = interpolate(
    sceneFrame,
    [0, scene.duration],
    [1, 1.1],
    {
      extrapolateRight: 'clamp',
    }
  );

  return (
    <AbsoluteFill
      style={{
        opacity,
        backgroundColor: '#000',
      }}
    >
      {/* 背景画像 */}
      {scene.imageUrl && (
        <AbsoluteFill>
          <Img
            src={scene.imageUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: `scale(${scale})`,
            }}
          />
          {/* オーバーレイ（テキストを読みやすくする） */}
          <AbsoluteFill
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
            }}
          />
        </AbsoluteFill>
      )}

      {/* テキスト */}
      <AbsoluteFill
        style={{
          display: 'flex',
          alignItems: scene.textStyle?.position === 'top' ? 'flex-start' :
                      scene.textStyle?.position === 'bottom' ? 'flex-end' : 'center',
          justifyContent: 'center',
          padding: '60px 40px',
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div
          style={{
            fontSize: scene.textStyle?.fontSize || 48,
            fontWeight: scene.textStyle?.fontWeight || 'bold',
            color: scene.textStyle?.color || '#ffffff',
            textAlign: 'center',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            maxWidth: '90%',
            lineHeight: 1.4,
            ...(scene.textStyle?.backgroundColor && {
              backgroundColor: scene.textStyle.backgroundColor,
              padding: '20px 30px',
              borderRadius: '12px',
            }),
          }}
        >
          {scene.text}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
