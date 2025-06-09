const { adams } = require('../Ibrahim/adams');
//const { zokou } = require("../framework/zokou");
const axios = require('axios');

// Lyrics Command
adams({
  'nomCom': "lyrics2",
  'reaction': '🗞',
  'categorie': "Search"
}, async (_0x16b585, _0x24921b, _0x5047e1) => {
  const { repondre, arg, ms } = _0x5047e1;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide the song name.");
    }
    
    const songName = arg.join(" ");
    
    // Lyrics API (adjust to your desired service)
    const lyricsUrl = `https://api.giftedtech.web.id/api/search/lyrics?apikey=gifted&query=${encodeURIComponent(songName)}`;
    const response = await axios.get(lyricsUrl);
    
    // Log the response for debugging
    console.log("Lyrics API Response:", response.data);

    if (response.data && response.data.lyrics) {
      repondre(`Lyrics for "${songName}":\n\n${response.data.lyrics}`);
    } else {
      repondre(`I did not find any lyrics for "${songName}". Try searching a different song.`);
    }
  } catch (err) {
    repondre("An error occurred while fetching lyrics. Please try again.");
    console.log(err);
  }
});

// Weather Command
adams({
  'nomCom': "weather2",
  'reaction': "🌡️",
  'categorie': "Search"
}, async (_0x626df9, _0x17e5bb, _0x37baf6) => {
  const { repondre, arg, ms } = _0x37baf6;
  
  const location = arg.join(" ");
  if (!location) {
    return repondre("Please provide a location.");
  }

  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`;
    const response = await axios.get(weatherUrl);

    // Log the raw response to check the structure
    console.log("Weather API Response:", response.data);

    const weatherData = response.data;
    if (weatherData && weatherData.weather && weatherData.main) {
      const locationName = weatherData.name;
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const humidity = weatherData.main.humidity;
      const windSpeed = weatherData.wind.speed;
      const rainVolume = weatherData.rain ? weatherData.rain['1h'] : 0;
      const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();
      
      repondre(`*BUMBLEBEE-XMD WEATHER UPDATES* \n\n❄️ Weather in ${locationName}:\n🌡️ Temperature: ${temperature}°C\n📝 Description: ${description}\n❄️ Humidity: ${humidity}%\n🌀 Wind Speed: ${windSpeed} m/s\n🌧️ Rain Volume (last hour): ${rainVolume} mm\n🌄 Sunrise: ${sunrise}\n🌅 Sunset: ${sunset}\n`);
    } else {
      repondre("Could not retrieve weather data. Please try again.");
    }
  } catch (err) {
    repondre("An error occurred while fetching weather data. Please try again.");
    console.log(err);
  }
});

// Short URL Command (for link shortening)
adams({
  'nomCom': "shorturl",
  'reaction': '🔗',
  'categorie': "Tools"
}, async (_0x16b585, _0x24921b, _0x5047e1) => {
  const { repondre, arg, ms } = _0x5047e1;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide a URL to shorten.");
    }
    
    const urlToShorten = arg.join(" ");
    const shortUrlApiUrl = `https://api.giftedtech.web.id/api/tools/shorturl?apikey=gifted&url=${encodeURIComponent(urlToShorten)}`;
    const response = await axios.get(shortUrlApiUrl);
    
    // Log the short URL API response for debugging
    console.log("Short URL API Response:", response.data);

    if (response.data && response.data.result) {
      repondre(`Shortened URL: ${response.data.result}`);
    } else {
      repondre("Could not shorten the URL. Please try again.");
    }
  } catch (err) {
    repondre("An error occurred while shortening the URL. Please try again.");
    console.log(err);
  }
});

// XNXX Video Command (search by name, not URL)
adams({
  'nomCom': "xnxx",
  'reaction': '🎬',
  'categorie': "Download"
}, async (_0x16b585, _0x24921b, _0x5047e1) => {
  const { repondre, arg, ms } = _0x5047e1;

  try {
    if (!arg || arg.length === 0) {
      return repondre("Please provide a video name to search.");
    }
    
    const videoName = arg.join(" ");
    
    // XNXX API to search video by name
    const xnxxSearchUrl = `https://api.giftedtech.web.id/api/download/xnxxdl?apikey=gifted&url=https://www.xnxx.health/search/${encodeURIComponent(videoName)}`;
    const response = await axios.get(xnxxSearchUrl);

    // Log the video download API response for debugging
    console.log("XNXX Video API Response:", response.data);

    if (response.data && response.data.result) {
      repondre(`Video Download Link for "${videoName}": ${response.data.result}`);
    } else {
      repondre("Could not find a video for the given name. Please try a different one.");
    }
  } catch (err) {
    repondre("An error occurred while fetching the video. Please try again.");
    console.log(err);
  }
});
