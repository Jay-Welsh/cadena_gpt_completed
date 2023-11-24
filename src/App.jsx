import React, { useState } from 'react';
import { Configuration, OpenAIApi } from "openai";
import DallELogo from './assets/DallE Logo.png';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const apiClient = new OpenAIApi(configuration);

const App = () => {
  // ... other state definitions

  const predefinedHashtags = "#BusinessInsights #LinkedInTips"; // Define your hashtags here

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

      const responseWithHashtags = completions.data.choices[0].text + "\n\n" + predefinedHashtags;
      setResponse(responseWithHashtags); // Append hashtags to the response
    } catch (error) {
      console.log(error);
    }
  };

  // ... rest of your existing handleSubmit function

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:p-0">
      <img src={DallELogo} alt="DallE Logo" style={{ borderRadius: '50%', transform: 'scale(0.6)' }} />
      <div>
        <button 
          onClick={() => handleButtonClick('humorous')} 
          style={{ backgroundColor: activeButton === 'humorous' ? 'green' : 'initial' }}
        >
          Humorous
        </button>
        <button 
          onClick={() => handleButtonClick('serious')} 
          style={{ backgroundColor: activeButton === 'serious' ? 'green' : 'initial' }}
        >
          Serious
        </button>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {/* ... rest of your form */}
        <input
          type="text"
          placeholder="Enter your topic"
          value={userInput}
          onChange={handleUserInputChange}
        />
        {/* ... rest of your form */}
      </form>
      {response && (
        <div className="w-full max-w-lg mt-4">
          {/* ... display the response */}
        </div>
      )}
    </div>
  );
};

export default App;
