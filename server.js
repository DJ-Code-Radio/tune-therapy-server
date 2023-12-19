
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
const { generateImage, getTrack } = require('./controllers/openaiController')
app.use(cors());

//API calls for openai
app.post('/openai/image', generateImage)
// app.get('/openai/track', getTrack)


const getHomePage = (req, res) => {
  response.status(200).send('Welcome!')
}

app.get('/', getHomePage);
app.use(express.json());
app.use('*', (req, res) => {
  res.status(404).send('These are not the droids you are looking for.');
});

app.use((error, req, res, next) => {
  res.status(500).send(`My Bad ... ${error.message}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;