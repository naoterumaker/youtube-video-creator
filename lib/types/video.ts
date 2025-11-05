/**
 * シーン情報の型定義
 */
export interface Scene {
  id: number;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
  duration: number; // フレーム数

  // テキストスタイル
  textStyle?: {
    fontSize: number;
    fontWeight: string;
    color: string;
    backgroundColor?: string;
    position: 'top' | 'center' | 'bottom';
  };

  // アニメーション設定
  animation?: {
    type: 'fadeIn' | 'slideUp' | 'bounce' | 'scaleIn';
    duration: number; // フレーム数
  };

  // トランジション
  transition?: {
    type: 'fade' | 'slide' | 'zoom' | 'none';
    duration: number;
  };
}

/**
 * 動画テンプレート種類
 */
export type VideoTemplate = 'youtube-shorts' | 'standard' | 'square';

/**
 * 台本生成リクエスト
 */
export interface ScriptGenerationRequest {
  template: VideoTemplate;
  topic?: string;
  keywords?: string[];
  numberOfScenes: number;
  duration: number; // 秒数
}

/**
 * 画像生成モデル
 */
export type ImageModel = 'imagen4' | 'gpt-image-1-mini' | 'nano-banana';

/**
 * 画像生成リクエスト
 */
export interface ImageGenerationRequest {
  prompt: string;
  model: ImageModel;
}

/**
 * プロジェクト状態
 */
export interface VideoProject {
  id: string;
  name: string;
  template: VideoTemplate;
  scenes: Scene[];
  createdAt: Date;
  updatedAt: Date;
}
