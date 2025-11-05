import { GoogleGenerativeAI } from '@google/generative-ai';
import { VideoTemplate } from '@/lib/types/video';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');

interface GenerateScriptOptions {
  script: string;
  template: VideoTemplate;
  numberOfScenes: number;
}

export async function generateScriptWithGemini(
  options: GenerateScriptOptions
) {
  const { script, template, numberOfScenes } = options;

  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const templateInfo = {
    'youtube-shorts': '縦型・60秒以内のショート動画（インパクト重視、テンポ速め）',
    'standard': '横型・3分程度の標準動画（詳しい解説、落ち着いたペース）',
    'square': 'スクエア・90秒程度のSNS動画（SNS向け、共感重視）',
  };

  const prompt = `あなたはプロの動画クリエイターです。以下の台本を${numberOfScenes}個のシーンに分割してください。

【テンプレート】
${templateInfo[template]}

【元の台本】
${script}

【要件】
- 各シーンは明確で視覚的に魅力的な内容にすること
- 各シーンに適切な画像生成プロンプト（英語）を付けること
- 1シーン約6秒（180フレーム at 30fps）を想定
- テキストは短く、インパクトがあること

【出力形式】
以下のJSON形式で出力してください：

\`\`\`json
{
  "scenes": [
    {
      "text": "シーンに表示するテキスト（日本語、短く）",
      "imagePrompt": "Image generation prompt in English, detailed, professional",
      "duration": 180
    }
  ]
}
\`\`\``;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  // JSONを抽出
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);
  if (!jsonMatch) {
    throw new Error('Failed to parse Gemini response');
  }

  const parsed = JSON.parse(jsonMatch[1]);

  // シーンにIDを追加
  const scenes = parsed.scenes.map((scene: any, index: number) => ({
    id: index + 1,
    text: scene.text,
    imagePrompt: scene.imagePrompt,
    duration: scene.duration || 180,
    textStyle: {
      fontSize: template === 'youtube-shorts' ? 56 : 48,
      fontWeight: 'bold',
      color: '#ffffff',
      position: 'bottom' as const,
    },
  }));

  return scenes;
}
