
const OpenAIAPI = require('openai');
require('dotenv').config();

const openai = new OpenAIAPI({
    apiKey: process.env.OPENAI_API_KEY
});

const generateImage = async () => {
    const image = await openai.images.generate({ 
        model: "dall-e-3",
        prompt: "sadness" });

  console.log(image.data);
};

const generateImage2 = async () => {
    const image = await openai.images.generate({ 
        model: "dall-e-3",
        prompt: "happiness" });

  console.log(image.data);
};

const generateImage3 = async () => {
    const image = await openai.images.generate({ 
        model: "dall-e-3",
        prompt: "fear" });

  console.log(image.data);
};

const generateImage4 = async () => {
    const image = await openai.images.generate({ 
        model: "dall-e-3",
        prompt: "anger" });

  console.log(image.data);
};

const generateImage5 = async () => {
    const image = await openai.images.generate({ 
        model: "dall-e-3",
        prompt: "surprise" });

  console.log(image.data);
};

const generateImage6 = async () => {
    const image = await openai.images.generate({ 
        model: "dall-e-3",
        prompt: "disgust" });

  console.log(image.data);
};

const generateImage7 = async () => {
    const image = await openai.images.generate({ 
        model: "dall-e-3",
        prompt: "trust" });

  console.log(image.data);
};

generateImage();

//-------------- need onClick data back from front end

const getTrack = async () => {
    const track = await openai.chat.completions.create({
        messages: [
            {role: "system", content: `Recommend a song based on the emotion happiness`}, 
        ],
        model: "gpt-3.5-turbo", 
    });
    console.log(track.data)
}

getTrack();


module.exports = {generateImage, getTrack};