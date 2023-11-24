import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import DallELogo from './assets/DallE Logo.png';
import './styles.css'; // Importing the styles.css

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const apiClient = new OpenAIApi(configuration);

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setPrompt(type === 'humorous' ? 'Write a humorous LinkedIn post about: ' : 'Write a serious LinkedIn post about: ');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const completions = await apiClient.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
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
          className={`button ${selectedType === 'humorous' ? 'humorous-button' : ''}`} 
          onClick={() => handleTypeChange('humorous')}
        >
          Humorous
        </button>
        <button 
          className={`button ${selectedType === 'serious' ? 'serious-button' : ''}`} 
          onClick={() => handleTypeChange('serious')}
        >
          Serious
        </button>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        {/* Rest of the form */}
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
