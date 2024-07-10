const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

// Replace with your Gemini AI API key
const GEMINI_API_KEY = 'AIzaSyAexgJenrJpWcBJVmLCeqT9nYKeoRVUILs';

app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle questions
app.post('/ask', async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    try {
        // Send the question to Gemini AI API
        const response = await axios.post('https://api.gemini-ai.com/v1/ask', {
            question: question
        }, {
            headers: {
                'Authorization': `Bearer ${GEMINI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Return the AI's response to the frontend
        return res.json(response.data);
    } catch (error) {
        console.error('Error communicating with Gemini AI API:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});