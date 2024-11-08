import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

// Define message interface to clarify expected structure
interface TextMessage {
  type: 'text';
  text: string;
}

interface FileMessage {
  type: 'file';
  data: string;
  mimeType: string;
}

type Message = {
  role: 'user' | 'assistant';
  content: TextMessage[] | FileMessage[];
};

// Initialize conversation history array
const conversationHistory: Message[] = [];

/**
 * Handles incoming POST requests to the /api/gemini endpoint.
 */
export async function POST(req: Request) {
  try {
    const { prompt, imgPrompt } = await req.json();

    // Prepare the user message content, with optional image
    const userMessageContent: (TextMessage | FileMessage)[] = [
      { type: 'text', text: prompt },
    ];

    if (imgPrompt) {
      userMessageContent.push({
        type: 'file',
        data: `https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/Aiimages/${imgPrompt}`,
        mimeType: 'image/*',
      });
    }

    // Add user message to conversation history
    const userMessage: Message = { role: 'user', content: userMessageContent };
    conversationHistory.push(userMessage);

    // Generate AI response using Vercel's AI SDK
    const { text } = await generateText({
      model: google('gemini-1.5-flash'),
      messages: conversationHistory,
    });

    if (!text) {
      console.error('Empty AI response received.');
      return NextResponse.json({ error: 'Error: AI response is empty' }, { status: 500 });
    }

    // Append AI response to conversation history
    const aiMessage: Message = { role: 'assistant', content: [{ type: 'text', text }] };
    conversationHistory.push(aiMessage);

    // Return the AI response
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error('Error generating text:', error);
    return NextResponse.json({ error: 'Error generating text' }, { status: 500 });
  }
}
        