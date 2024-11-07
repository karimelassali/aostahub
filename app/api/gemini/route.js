import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

let chatHistory = [];

async function updateChatHistory(role, content) {
    chatHistory.push({ role, content });
    if (chatHistory.length > 10) {
        chatHistory = chatHistory.slice(chatHistory.length - 10); // Keep last 10 messages
    }
}

export async function POST(req) {
    const { prompt, imgPrompt } = await req.json();

    try {
        const content = [
            {
                type: 'text',
                text: `
                    You are Rosta, a bot on Aosta Hub by Karim El Assali. Reply concisely and make the whole answer in the same language as the user's request.

                    History: ${JSON.stringify(chatHistory)}
                    Request: ${prompt}
                `,
            },
        ];

        if (imgPrompt !== '') {
            content.push({
                type: 'file',
                data: `https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/aiFiles/${imgPrompt}`,
                mimeType: 'image/*',
            });
        }

        const response = await generateText({
            model: google('gemini-1.5-flash'),
            messages: [
                {
                    role: 'user',
                    content,
                },
            ],
        });

        if (response) {
            // Update chat history with the user and assistant messages
            await updateChatHistory('user', prompt);
            await updateChatHistory('assistant', response.text);
        }

        return NextResponse.json({ response: response.text });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error generating text' });
    }
}