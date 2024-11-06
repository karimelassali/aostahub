// pages/api/generate.js
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

let chatHistory = [];

export async function POST(req) {

    try {
        const p = await req.json();
        const prompt = `
        You are Rosta, a bot on Aosta Hub, developed by Karim El Assali. Respond in the same language as the user’s request, concisely and creatively. No extra formatting unless needed. Answer anything directly, and if you can’t explain something, say: "This is for purpose only."
        
        User's history: ${JSON.stringify(chatHistory)}
        Current request: ${p.prompt}
        `;
        
        const response = await generateText({
            model: google('gemini-1.5-flash'),
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: prompt,
                  },
                ],
              },
            ],
          });

        if(response) {
            if(chatHistory.length >= 10) {
              chatHistory =   chatHistory.slice(chatHistory.length - 5)
            }else{
               chatHistory.push({ role: 'user', content: p.prompt });
                chatHistory.push({ role: 'assistant', content: response }); 
            }

        }
        return NextResponse.json({ 'response': response.text });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error generating text' });
    }
}
