import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import DallELogo from './assets/DallE Logo.png';
import './styles.css'; // Ensure you have this line to include your CSS

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const apiClient = new OpenAIApi(configuration);

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [selectedButton, setSelectedButton] = useState('');

  const handleButtonClick = (buttonType, predefinedPrompt) => {
    setSelectedButton(buttonType);
    setPrompt(predefinedPrompt);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Example hashtags based on the selected button
    const hashtags = selectedButton === 'humorous' ? '#Funny #Humor #Laugh' : '#Serious #Expert #Advice';

    try {
      const completions = await apiClient.createCompletion({
        model: 'text-davinci-003',
        prompt: `${prompt} ${hashtags}`,
        max_tokens: 880,
        // other configurations...
      });
      setResponse(completions.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 sm:p-0">
      <img src={DallELogo} alt="DallE Logo" style={{ borderRadius: '50%', transform: 'scale(0.6)' }} />
      <div>
        <button 
          className={`button ${selectedButton === 'humorous' ? 'humorous-button' : ''}`} 
          onClick={() => handleButtonClick('humorous', 'Make a humorous LinkedIn Post about:')}
        >
          Humorous
        </button>
        <button 
          className={`button ${selectedButton === 'serious' ? 'serious-button' : ''}`} 
          onClick={() => handleButtonClick('serious', 'Give a serious expert tip about:')}
        >
          Serious
        </button>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center border-b-2 border-indigo-600 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter a topic for Linkedin Post"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
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
