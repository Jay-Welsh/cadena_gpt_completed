import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import DallELogo from './assets/DallE Logo.png';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const apiClient = new OpenAIApi(configuration);

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const handleButtonClick = (tone) => {
    const fullPrompt = `${tone}: ${userInput}`;
    setPrompt(fullPrompt);
    handleSubmit(); // Call the submit function directly
  };

  const handleSubmit = async () => {
    try {
      const completions = await apiClient.createCompletion({
        model: "text-davinci-003",
        prompt: userInput,
        max_tokens: 880,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      setResponse(completions.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:p-0">
      <img src={DallELogo} alt="DallE Logo" style={{ borderRadius: '50%', transform: 'scale(0.5)' }} />
      <div>
        <button 
          onClick={() => handleButtonClick("Humorous Style")}
          style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold', fontSize: '1.5em', margin: '10px' }}
        >
          Humorous
        </button>
        <button 
          onClick={() => handleButtonClick("Serious Style")}
          style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold', fontSize: '1.5em', margin: '10px' }}
        >
          Serious
        </button>
      </div>
      <div style={{ margin: '10px 0', width: '100%', textAlign: 'center' }}>
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter your topic"
          className="appearance-none bg-transparent border-none w-full text-white py-1 px-2 leading-tight focus:outline-none"
          style={{ maxWidth: '300px', margin: '0 auto', display: 'inline-block' }} 
        />
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          style={{ marginLeft: '10px' }}
        >
          Generate
        </button>
      </div>
      {response && (
        <div className="w-full max-w-lg mt-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-gray-700 text-base">{response}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
