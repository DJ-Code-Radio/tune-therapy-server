const { User } = require('@auth0/auth0-react');
const OpenAIAPI = require('openai');
require('dotenv').config();
const axios = require('axios');

const spotifyKey = process.env.SPOTIFY_API_KEY;

const openai = new OpenAIAPI({
  apiKey: process.env.OPENAI_API_KEY
});

// Move emotion and genre extraction inside the function parameters
const generateImage = async (req, res) => {
  try {
    const { emotion } = req.body; // Extract emotion from the request body
    console.log(req.body);

    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: emotion,
      n: 1,
    });

    const imageUrl = imageResponse.data[0].url;
    res.json({ imageUrl });
  } catch (e) {
    console.error(e);
    res.status(500).send("error generating image");
  }
};

// Move emotion and genre extraction inside the function parameters
const getTrack = async (req, res) => {
  console.log('hello');
  try {
    const { genre, emotion } = req.body; // Extract emotion and genre from the request body
    console.log(genre, emotion);
    const track = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Recommend a movie based on this genre: ${genre} and this emotion: ${emotion}. I only want the name of the track and artist.`,
        },
      ],
    });

    console.log('OpenAI API Response:', track);
    const songRecommendation = track.choices[0].message.content;
    console.log('Song Recommendation:', songRecommendation);
    

    // Further processing with Spotify API can be added here
    // ...

    res.json({ track });
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).send("error getting song recommendation");
  }
};

module.exports = { generateImage, getTrack };
