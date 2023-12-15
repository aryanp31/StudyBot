import express from 'express'
import { config } from 'dotenv'
import { OpenAI } from 'openai'
import cors from 'cors';

// Load variables from the .env file
config()

const app = express()

// Set the port number for the server
const port = process.env.PORT || 3000;

const openai = new OpenAI( { apiKey: process.env.API_KEY } );

app.use(express.json());

// Middleware to parse incoming JSON requests
app.use(cors()); 

// Define a route for handling POST requests to /chat
app.post('/chat', async (req, res) => {
  const input = req.body.input;

  if (!input) {
    return res.status(400).json({ error: 'Input is required' });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: input }],
    });

    const output = response.choices[0].message.content;

    res.json({ output });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});