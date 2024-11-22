import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
  const { myInterests, userInterests } = await req.json();

  const response = await generateText({
    model: google('gemini-1.5-pro-002'),
    messages: [
      {
        role: 'user',
        content: `Calculate the matching percentage between my interests ${myInterests} and user interests ${userInterests}. Respond with just the percentage as a number between 0 and 100.`,
      },
    ],
    maxTokens: 3,
  });

  if (response) {
    // Try to parse the response as a number
    const percentage = parseFloat(response.text.trim());
    
    // Check if it's a valid percentage number
    if (!isNaN(percentage) && percentage >= 0 && percentage <= 100) {
      return NextResponse.json({ 'response': percentage });
    } else {
      return NextResponse.json({ 'response': 'Invalid percentage response' });
    }
  }
}
