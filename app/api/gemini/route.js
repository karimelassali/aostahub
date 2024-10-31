// pages/api/generate.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from "next/server";

export async function POST(req) {
    console.log(process.env.GEMINI_API_KEY);
    
    try {
        const genAI = new GoogleGenerativeAI('AIzaSyBdyp5tBWOWg4GmDOSOn8_V8Lf4rzVcJUY   ');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const p = await req.json();

        const prompt = `
        You are a bot in the Aosta Hub website, developed by Karim El Assali. Make sure to respond in the same language as the request. 
        Generate your response within a styled <div> element. Use the following styling for each response:
        - A main responsive container , rounded borders, and padding.
        - Use <p> tags for each text section with specific font sizes, and apply a unique color for emphasis where needed.
        - and if he ask for a code example use <pre> tag to display the code in a specific language.
        -Imporant: makse sure you response with same request laungage
        The user request is: ${p.prompt}`;

        const res = await model.generateContent(prompt);
        const out = await res.response;
        const response = await out.text();
        
        return NextResponse.json({ 'response': response });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error generating text' });
    }
}
