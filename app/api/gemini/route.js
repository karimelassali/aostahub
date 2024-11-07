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
    const p = await req.json();
    const file = p.imgPrompt;

    try {
        const prompt = `
        You are Rosta, a bot on Aosta Hub by Karim El Assali. Reply concisely and make the whole anwser in the same in the user's language.

        History: ${JSON.stringify(chatHistory)}
        Request: ${p.prompt}
        `;

        const content = [
            {
                type: 'text',
                text: prompt,
            },
        ];

        if (p.imgPrompt !== '') {
            content.push({
                type: 'file',
                data: `https://giyrlrcehqsypefjoayv.supabase.co/storage/v1/object/public/aiFiles/${file}`,
                mimeType: 'image/*',
            });
        }

        const response = await generateText({
            model: google('gemini-1.5-flash'),
            messages: [
                {
                    role: 'user',
                    content: content,
                },
            ],
        });

        if (response) {
            // Update chat history with the user and assistant messages
            await updateChatHistory('user', p.prompt);
            await updateChatHistory('assistant', response.text);
        }

        return NextResponse.json({ response: response.text });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error generating text' });
    }
}
