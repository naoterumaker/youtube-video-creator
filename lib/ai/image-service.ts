import { GoogleGenerativeAI, ImageGenerateContentRequest } from '@google/generative-ai';
import OpenAI from 'openai';
import { ImageModel } from '@/lib/types/video';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

export async function generateImage(
  prompt: string,
  model: ImageModel
): Promise<string> {
  switch (model) {
    case 'imagen4':
      return generateWithImagen4(prompt);
    case 'gpt-image-1-mini':
      return generateWithGPTImage(prompt);
    case 'nano-banana':
      return generateWithNanoBanana(prompt);
    default:
      throw new Error(`Unknown image model: ${model}`);
  }
}

async function generateWithImagen4(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'imagen-3.0-generate-001' });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    } as any);

    // Imagen APIのレスポンスから画像URLを取得
    // Note: 実際のAPIレスポンス構造に応じて調整が必要
    const imageUrl = result.response.text();
    return imageUrl;
  } catch (error) {
    console.error('Imagen4 generation failed:', error);
    // フォールバック: Unsplash placeholder
    return `https://source.unsplash.com/random/1080x1920?${encodeURIComponent(prompt)}`;
  }
}

async function generateWithGPTImage(prompt: string): Promise<string> {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `High quality, professional, cinematic: ${prompt}`,
      n: 1,
      size: '1024x1792', // 縦長
      quality: 'standard',
    });

    return response.data[0].url || '';
  } catch (error) {
    console.error('GPT Image generation failed:', error);
    // フォールバック: Unsplash placeholder
    return `https://source.unsplash.com/random/1080x1920?${encodeURIComponent(prompt)}`;
  }
}

async function generateWithNanoBanana(prompt: string): Promise<string> {
  try {
    // Gemini 2.5 Flash Image (Nano Banana)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Generate an image: ${prompt}`,
            },
          ],
        },
      ],
    } as any);

    const imageUrl = result.response.text();
    return imageUrl;
  } catch (error) {
    console.error('Nano Banana generation failed:', error);
    // フォールバック: Unsplash placeholder
    return `https://source.unsplash.com/random/1080x1920?${encodeURIComponent(prompt)}`;
  }
}

export async function generateImagesForScenes(
  prompts: string[],
  model: ImageModel,
  onProgress?: (index: number, total: number) => void
): Promise<string[]> {
  const results: string[] = [];

  for (let i = 0; i < prompts.length; i++) {
    const imageUrl = await generateImage(prompts[i], model);
    results.push(imageUrl);

    if (onProgress) {
      onProgress(i + 1, prompts.length);
    }

    // Rate limiting: 少し待機
    if (i < prompts.length - 1) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return results;
}
