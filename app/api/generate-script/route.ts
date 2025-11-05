import { NextRequest, NextResponse } from 'next/server';
import { generateScriptWithGemini } from '@/lib/ai/gemini-service';
import { ScriptGenerationRequest } from '@/lib/types/video';

export async function POST(request: NextRequest) {
  try {
    const body: ScriptGenerationRequest = await request.json();

    const { template, topic, numberOfScenes, duration } = body;

    if (!topic) {
      return NextResponse.json(
        { error: 'Topic is required' },
        { status: 400 }
      );
    }

    // Gemini 2.5 Flashで台本生成
    const scenes = await generateScriptWithGemini({
      script: topic,
      template,
      numberOfScenes,
    });

    return NextResponse.json({
      scenes,
      template,
      totalDuration: scenes.reduce((sum: number, scene: any) => sum + scene.duration, 0),
    });
  } catch (error) {
    console.error('Script generation error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate script',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
