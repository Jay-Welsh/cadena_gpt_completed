import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import DallELogo from './assets/DallE Logo.png';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const apiClient = new OpenAIApi(configuration);

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [userInput, setUserInput] = useState("");
  const [response, setResponse] = useState("");

  const handleButtonClick = (tone) => {
    const fullPrompt = `${tone}: ${userInput}`;
    setPrompt(fullPrompt);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const completions = await apiClient.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
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
      <img src={DallELogo} alt="DallE Logo" style={{ borderRadius: '50%', transform: 'scale(0.6)' }} />
      <div style={{ margin: '10px 0' }}>
        <button 
          onClick={() => handleButtonClick("Act as a comedian to write this post and add emoticons and hashtags in a humorous though business kind of way")}
          style={{ backgroundColor: 'red', color: 'white', fontWeight: 'bold', fontSize: '1.5em', marginRight: '0.5cm' }}
        >
          Humorous
        </button>
        <button 
          onClick={() => handleButtonClick("Act as a very serious and knowledgeable expert on the topic and as hashtags that will be on point in a business style")}
          style={{ backgroundColor: 'blue', color: 'white', fontWeight: 'bold', fontSize: '1.5em' }}
        >
          Serious
        </button>
      </div>
      <input
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter your topic"
        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
        style={{ maxWidth: '300px', margin: '0 auto' }} // Adjust width and center alignment
      />
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center border-b-2 border-indigo-600 py-2">
          <button
            className="flex-shrink-0 bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Generate
          </button>
        </div>
      </form>
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
