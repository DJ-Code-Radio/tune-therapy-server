const { User } = require("@auth0/auth0-react");
const axios = require("axios");

const OpenAIAPI = require("openai");
const { google } = require("googleapis");
require("dotenv").config();

const openai = new OpenAIAPI({
  apiKey: process.env.OPENAI_API_KEY,
});

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY, // Replace with your YouTube API key
});

const generateImage = async (req, res) => {
  try {
    const { emotion } = req.body;
    console.log(req.body);

    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: `Give me a movie theater that captures this emotion: ${emotion}`,
      n: 1,
    });

    const imageUrl = imageResponse.data[0].url;
    res.json({ imageUrl });
  } catch (e) {
    console.error(e);
    res.status(500).send("error generating image");
  }
};

async function searchYouTube(query) {
  try {
    const response = await youtube.search.list({
      part: "snippet",
      q: query,
      maxResults: 1,
      type: "video",
    });

    if (response.data.items.length === 0) {
      throw new Error("No results found");
    }

    const firstResult = response.data.items[0];
    return {
      videoId: firstResult.id.videoId,
      title: firstResult.snippet.title,
    };
  } catch (error) {
    console.error("Error searching YouTube:", error);
    throw error;
  }
}

const getMovie = async (req, res) => {
  try {
    const {genre, emotion} = req.body;
    console.log("Request:", req);
    console.log("Request body:", req.body);

    const movie = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `Recommend a movie based on this genre: ${genre} and this emotion: ${emotion}. Give me just the name of the movie and the year`,
        },
      ],
    });

    const movieRecommendation = movie.choices[0].message.content;
    console.log("Movie Recommendation:", movieRecommendation);

    // Search for the movie trailer on YouTube
    const youtubeResponse = await searchYouTube(
      movieRecommendation + " trailer"
    );
    const trailerUrl = `https://www.youtube.com/watch?v=${youtubeResponse.videoId}`;

    res.json({ movie: movieRecommendation, trailerUrl });
  } catch (error) {
    console.error("Error:", error);
  }
};
// getMovie();

module.exports = { generateImage, getMovie };
