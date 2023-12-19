
const { User } = require('@auth0/auth0-react');
const OpenAIAPI = require('openai');
const { response } = require('../server');
require('dotenv').config();
const axios = require('axios')
const qs = require('qs');

const spotifyKey = process.env.SPOTIFY_API_KEY

const openai = new OpenAIAPI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateImage = async (req, res) => {
    try{
        const imageResponse = await openai.images.generate({ 
            model: "dall-e-3",
            prompt: "sadness"
        });
            
    const imageUrl = image.data[0].url;
    res.json({imageUrl: imageUrl})
        
    }catch(e){
        console.error(e);
        res.status(500).send("error generating image")
    }
};

const generateImage2 = async () => {
    try{
        const image = await openai.images.generate({ 
            model: "dall-e-3",
            prompt: "happiness" });
        imageUrl = image.data[0].url
        return imageUrl
    }catch(e){
        console.error(e)
    }
};

const generateImage3 = async () => {
    try{
        const image = await openai.images.generate({ 
            model: "dall-e-3",
            prompt: "fear" });
        imageUrl = image.data[0].url
        return imageUrl
    }catch(e){
        console.error(e)
    }
};

const generateImage4 = async () => {
    try{
        const image = await openai.images.generate({ 
            model: "dall-e-3",
            prompt: "anger" });
        imageUrl = image.data[0].url
        return imageUrl
    }catch(e){
        console.error(e)
    }
};

const generateImage5 = async () => {
    try{
        const image = await openai.images.generate({ 
            model: "dall-e-3",
            prompt: "surprise" });
        imageUrl = image.data[0].url
        return imageUrl
    }catch(e){
        console.error(e)
    }

  console.log(image.data);
};

const generateImage6 = async () => {
    try{
        const image = await openai.images.generate({ 
            model: "dall-e-3",
            prompt: "disgust" });
        imageUrl = image.data[0].url
        return imageUrl
    }catch(e){
        console.error(e)
    }
};

const generateImage7 = async () => {
    try{
        const image = await openai.images.generate({ 
            model: "dall-e-3",
            prompt: "trust" });
        imageUrl = image.data[0].url
        return imageUrl
    }catch(e){
        console.error(e)
    }
};



//-------------- need onClick data back from front end

const getTrack = async () => {

    const track = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: "Recommend me a song based on these genres: pop, and the emotion: happiness. I only want the name of the track and artist."
        }]
    })
    const songRecommendation = track.choices[0].message.content
    console.log('Song Recommendation', songRecommendation);
    const [trackName, artist] = songRecommendation.split(' by ')
    const token = spotifyKey

    const response = await axios.get(`https://api.spotify.com/v1/search`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        params: {
            q: `${trackName} artist:${artist}`,
            type: 'track'
        }
    });

    const spotifyTracks = response.data.tracks.items;
    // console.log("Spotify Search Results:", spotifyTracks);

    return spotifyTracks;
}



module.exports = {generateImage, getTrack};