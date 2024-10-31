// pages/api/generate.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from "next/server";

export async function POST(req) {
    console.log(process.env.GEMINI_API_KEY);
    
    try {
        const genAI = new GoogleGenerativeAI('AIzaSyBdyp5tBWOWg4GmDOSOn8_V8Lf4rzVcJUY   ');
        const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
        const p = await req.json();

       const prompt = `
        You are a bot on the Aosta Hub website, developed by Karim El Assali. Respond in the same language as the user's request.

        Structure your response with the following guidelines:
        -be creative , and mind blower
        IMPORTANT: Respond concisely in the same language as the request and avoid any extra formatting unless absolutely necessary.

        My  request is: ${p.prompt}
        `;



        const res = await model.generateContent(prompt);
        const out = await res.response;
        const response = await out.text();
        
        return NextResponse.json({ 'response': response });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error generating text' });
    }
}
