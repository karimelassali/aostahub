'use client'
import { useState } from 'react';


export default function Page() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  // // Function to handle the API call
  // const generateContent = async () => {
  //   const url = 'https://deep-translate1.p.rapidapi.com/language/translate/v2';
  //   const options = {
  //     method: 'POST',
  //     headers: {
  //       'x-rapidapi-key': '7929e5ae3bmsh79dc022a998f301p1b95d5jsne3a4d8401441',
  //       'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
  //       'Content-Type': 'application/json'
  //     },
  //     body: {
  //       q: 'Hello, World!',
  //       source: 'en',
  //       target: 'ar'
  //     }
  //   };
    
  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.text();
  //     console.log(result);
  //     setResponse(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div>
      <h1>Content Generator</h1>
      <textarea
        value={prompt}
        onChange={(e) => {setPrompt(e.target.value)}}
        placeholder="Enter your prompt"
      />
      <br />
      <button onClick={generateContent}>Generate</button>
      <br />
      {response && (
        <div>
          <h2>Generated Content:</h2>
          <p>{response}</p>
          <img src={response ? response : ''} alt="" />
        </div>
      )}
    </div>
  );
}
