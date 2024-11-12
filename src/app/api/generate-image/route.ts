// Move the file to correct Next.js API route location
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { haikuText } = await request.json();

    const prompt = `Create a serene and artistic image inspired by this haiku:
      "${haikuText}"
      Style: Atmospheric Japanese ink painting aesthetic
      Mood: Contemplative and peaceful
      Focus: Capture the essence and imagery of the haiku with subtle details`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return NextResponse.json({ imageUrl: response.data[0].url });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}