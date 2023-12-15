import express from 'express'
import { config } from 'dotenv'
import { OpenAI } from 'openai'
import cors from 'cors';


config()

const app = express()
const port = process.env.PORT || 3000;

const openai = new OpenAI( { apiKey: process.env.API_KEY } );

app.use(express.json());
app.use(cors());

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

app.listen(port, () => {
  console.log('Server is running on port ${port}');
});