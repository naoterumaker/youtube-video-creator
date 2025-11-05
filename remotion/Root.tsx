import React from 'react';
import { Composition } from 'remotion';
import { YouTubeShorts } from './templates/YouTubeShorts';
import { StandardVideo } from './templates/StandardVideo';
import { SquareVideo } from './templates/SquareVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* YouTube Shorts (縦型) */}
      <Composition
        id="YouTubeShorts"
        component={YouTubeShorts}
        durationInFrames={1800} // 60秒 at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          scenes: [],
        }}
      />

      {/* 標準動画 (横型) */}
      <Composition
        id="StandardVideo"
        component={StandardVideo}
        durationInFrames={5400} // 180秒 at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          scenes: [],
        }}
      />

      {/* スクエア動画 */}
      <Composition
        id="SquareVideo"
        component={SquareVideo}
        durationInFrames={2700} // 90秒 at 30fps
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{
          scenes: [],
        }}
      />
    </>
  );
};
