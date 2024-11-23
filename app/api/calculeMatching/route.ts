import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
  const { myInterests, meAge, meDesc, userInterests, userAge, userDesc } = await req.json();

  if (!myInterests || !meAge || !meDesc || !userInterests || !userAge || !userDesc) {
    return NextResponse.json({ 'response': 1 });
  }

  const response = await generateText({
    model: google('gemini-1.5-pro-002'),
    messages: [
      {
        role: 'user',
        content: `Calculate the matching percentage between my interests: ${myInterests}, age: ${meAge}, description: ${meDesc} and user interests: ${userInterests}, age: ${userAge}, description: ${userDesc}. Respond with just the percentage as a number between 0 and 100.`,
      },
    ],
    maxTokens: 3,
  });

  if (response) {
    // Try to parse the response as a number
    const percentage = Number(response.text);
    
    // Check if it's a valid percentage number
    if (percentage !== NaN && percentage >= 0 && percentage <= 100) {
      return NextResponse.json({ 'response': percentage });
    } else {
      return NextResponse.json({ 'response': 1 });
    }
  } else {
    return NextResponse.json({ 'response': 1 });
  }
}


