
require('dotenv').config();
const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
const { generateImage, getMovie } = require('./controllers/openaiController')
app.use(cors());
// needs to be up here
app.use(express.json());

//API calls for openai
app.post('/openai/image', generateImage)
app.post('/openai/movie', getMovie)


const getHomePage = (req, res) => {
  res.status(200).send('Welcome!')
}


app.get('/', getHomePage);

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