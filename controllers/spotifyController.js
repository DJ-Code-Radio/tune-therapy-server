const SPOTIFY_API = process.env.SPOTIFY_API_KEY;
const axios = require('axios');

require('dotenv').config();


async function searchSong(track) {
    //---------
    song = request.query
    const endpoint = `https://api.spotify.com/v1/search?${emotionChoice}&${genreChoice}`; 
}

async function createPlaylist(userId, token, playlistName) {
    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const headers = {
      Authorization: `Bearer ${SPOTIFY_API}`,
      'Content-Type': 'application/json',
    };
    const data = {
      name: playlistName,
      description: 'My Tune Therapy Playlist',
      public: false
    };
  
    try {
      const response = await axios.post(endpoint, data, { headers });
      return response.data; // Contains the playlist ID and other info
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  }

