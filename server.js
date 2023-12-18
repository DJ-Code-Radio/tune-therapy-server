
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const OpenAI = require('openai');
const app = express();
const port = 3000; // or any other port you prefer
app.use(cors());

const openai = new OpenAI(process.env.OPENAI_API_KEY);
//open ai api test for proof of life

app.get('/openai', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: 'You are a helpful assistant.' }],
      model: 'gpt-3.5-turbo',
    });

    res.json(completion.choices[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use('*', (req,res) => {
    res.status(404).send('These are not the droids you are looking for.');
  });
  
  app.use( (error,req,res,next) => {
    res.status(500).send(`My Bad ... ${error.message}`);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});