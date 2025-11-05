import { NextRequest, NextResponse } from 'next/server';
import { generateImagesForScenes } from '@/lib/ai/image-service';
import { ImageModel } from '@/lib/types/video';

interface GenerateImagesRequest {
  prompts: string[];
  model: ImageModel;
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateImagesRequest = await request.json();

    const { prompts, model } = body;

    if (!prompts || prompts.length === 0) {
      return NextResponse.json(
        { error: 'Prompts are required' },
        { status: 400 }
      );
    }

    if (!model) {
      return NextResponse.json(
        { error: 'Model is required' },
        { status: 400 }
      );
    }

    // 画像生成
    const imageUrls = await generateImagesForScenes(prompts, model);

    return NextResponse.json({
      images: imageUrls,
      model,
      count: imageUrls.length,
    });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate images',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// ストリーミング対応版（プログレス表示用）
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const promptsParam = searchParams.get('prompts');
  const model = searchParams.get('model') as ImageModel;

  if (!promptsParam || !model) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  const prompts = JSON.parse(promptsParam);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < prompts.length; i++) {
        try {
          const { generateImage } = await import('@/lib/ai/image-service');
          const imageUrl = await generateImage(prompts[i], model);

          const data = JSON.stringify({
            index: i,
            total: prompts.length,
            imageUrl,
            prompt: prompts[i],
          });

          controller.enqueue(encoder.encode(`data: ${data}\n\n`));

          // 少し待機
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`Failed to generate image ${i}:`, error);
          const errorData = JSON.stringify({
            index: i,
            error: 'Failed to generate image',
          });
          controller.enqueue(encoder.encode(`data: ${errorData}\n\n`));
        }
      }

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
