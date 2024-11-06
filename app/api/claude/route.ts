import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

export  async function GET() {
  
  try {
    const {text} = await generateText({
      model: google('gemini-1.5-flash'),
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: 'what you see',
            },
            {
              type: 'file',
              data: 'https://aostahub.vercel.app/ass/aosta.jpg',
              mimeType: 'image/*',
            },
          ],
        },
      ],
    });
    if (text) {
      return NextResponse.json({ 'response': text });
    }else{
      return NextResponse.json({'text':'error response due to high demand'})
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error generating text' });
  }

}
