import React, { useState } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './App.css';

function App() {
    const [answer, setAnswer] = useState('');
    const { transcript, resetTranscript } = useSpeechRecognition();

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return <div>Your browser does not support speech recognition software! Try Chrome desktop, maybe?</div>;
    }

    const handleAskQuestion = async () => {
        try {
            const response = await axios.post('http://localhost:3000/ask', { question: transcript });
            setAnswer(response.data.answer);
            resetTranscript();
        } catch (error) {
            console.error('Error asking question:', error);
            setAnswer('Sorry, something went wrong.');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Ask Gemini AI</h1>
                <button onClick={SpeechRecognition.startListening}>Start Listening</button>
                <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
                <button onClick={resetTranscript}>Reset</button>
                <p>Transcript: {transcript}</p>
                <button onClick={handleAskQuestion}>Ask</button>
                <p>Answer: {answer}</p>
            </header>
        </div>
    );
}

export default App;
