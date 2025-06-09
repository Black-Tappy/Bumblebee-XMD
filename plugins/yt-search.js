require('dotenv').config(); // Load environment variables
const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const axios = require('axios');

// Retrieve sensitive data from environment variables
const BaseUrl = process.env.GITHUB_GIT;
const adamsapikey = process.env.BOT_OWNER;

// Validate that the necessary environment variables are set
function validateConfig() {
  if (!BaseUrl || !adamsapikey) {
    throw new Error("Configuration error: Missing BaseUrl or API key.");
  }
}
validateConfig();

async function downloadMedia(url, type) {
  try {
    const endpoint = `${BaseUrl}/api/download/${type}?url=${encodeURIComponent(url)}&apikey=${adamsapikey}`;
    const { data } = await axios.get(endpoint);
    return data.status === 200 && data.success ? data.result.download_url : null;
  } catch (error) {
    console.error(`API Error (${type}):`, error);
    return null;
  }
}

// ytmp3 Command (YouTube to MP3)
zokou({
  nomCom: "ytmp3",
  categorie: "Download",
  reaction: "🎵"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  if (!arg[0]) return repondre("Please insert a YouTube link.");

  const audioDlUrl = await downloadMedia(arg[0], 'ytdl');
  if (!audioDlUrl) return repondre("Failed to download the audio.");

  await zk.sendMessage(dest, {
    audio: { url: audioDlUrl },
    mimetype: 'audio/mp4'
  }, { quoted: ms });
});

// ytmp4 Command (YouTube to MP4)
zokou({
  nomCom: "ytmp4",
  categorie: "Download",
  reaction: "📹"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  if (!arg[0]) return repondre("Please insert a YouTube link.");

  const videoDlUrl = await downloadMedia(arg[0], 'ytdl');
  if (!videoDlUrl) return repondre("Failed to download the video.");

  await zk.sendMessage(dest, {
    video: { url: videoDlUrl },
    mimetype: 'video/mp4'
  }, { quoted: ms });
});

// yts Command (YouTube Search)
zokou({
  nomCom: "yts",
  categorie: "Search",
  reaction: "🔎"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  if (!arg[0]) return repondre("Please insert a search term.");

  const search = await yts(arg.join(" "));
  if (!search.videos.length) return repondre("No results found.");

  const results = search.videos.slice(0, 5).map((video, index) => 
    `${index + 1}. *${video.title}* (${video.timestamp})\n🔗 ${video.url}\n👤 ${video.author.name}`
  ).join("\n\n");

  repondre(`*Search Results:*\n\n${results}`);
});

// TikTok Command
zokou({
  nomCom: "tiktok",
  categorie: "Download",
  reaction: "🎥"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
  if (!arg[0]) return repondre("Please insert a TikTok link.");

  const videoDlUrl = await downloadMedia(arg[0], 'tiktok');
  if (!videoDlUrl) return repondre("Failed to download the TikTok video.");

  await zk.sendMessage(dest, {
    video: { url: videoDlUrl },
    mimetype: 'video/mp4'
  }, { quoted: ms });
});
