import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  console.log(body); // Log the parsed body

  if (!body.userPrompt) {
    return NextResponse.json({ error: 'userPrompt is missing in the request body' }, { status: 400 });
  }

  let result = ''; // Define result
  let aiResponse = ''; // Define aiResponse

  // AI API call
  try {
    const url = `https://openai-gpt.remixproject.org/`; // Ensure this URL is correct
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Accept-Language": "en",
      "Connection": "keep-alive",
      "Origin": "https://remix.ethereum.org",
      "Referer": "https://remix.ethereum.org/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36 Edge/17.17134"
    };

    const data = {
      prompt: body.userPrompt
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    result = await res.json(); // Store the result from the AI API
    // console.log(result); // Log the result to check the API response structure

      aiResponse = result.choices[0].message.content; // Extract AI response content
   

  } catch (error) {
    console.error('Error generating content:', error);
    return NextResponse.json({ error: 'Failed to generate AI content' }, { status: 500 });
  }

  return NextResponse.json({
    aiResponse: aiResponse
  });
}
