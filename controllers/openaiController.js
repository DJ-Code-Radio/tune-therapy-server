
const { User } = require('@auth0/auth0-react');
const OpenAIAPI = require('openai');
const { response } = require('../server');
require('dotenv').config();

const openai = new OpenAIAPI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateImage = async (req, res) => {
    try{
        const image = await openai.images.generate({ 
            model: "dall-e-3",
            prompt: "sadness" });
            console.log(image.data[0].url);
            imageUrl = image.data[0].url;
            res.status.json(imageUrl)
        return imageUrl
    }catch(e){
        console.error(e)
    }
};
generateImage()

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
    const song = []
    const track = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
            role: "user",
            content: "Recommend me a song based on these genres: pop, and the emotion: happiness. I only want the name of the track and artist."
        }]
    })
    
    song.push(track.choices[0].message.content);
    console.log(song)
    return song;
}
getTrack();

module.exports = {generateImage, getTrack};