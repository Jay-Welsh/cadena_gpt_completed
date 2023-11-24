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
  const [activeButton, setActiveButton] = useState(null); // New state to track active button

  const prompts = {
    humorous: "Michael McIntyre style humor. #FunnyBusiness #WorkplaceLaughs",
    serious: "TripAdvisor underground expert tip. #IndustryInsights #ProfessionalAdvice"
  };

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
    const promptPrefix = prompts[buttonType];
    setPrompt(promptPrefix + " " + userInput); // Combining the predefined prompt with user input
  };

  const handleUserInputChange = (e) => {
    setUserInput(e.target.value);
    if(activeButton) {
      setPrompt(prompts[activeButton] + " " + e.target.value); // Update the prompt when user input changes
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
