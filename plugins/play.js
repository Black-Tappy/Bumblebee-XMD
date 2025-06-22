const { zokou } = require("../framework/zokou");
const yts = require("yt-search");
const axios = require("axios");

zokou({
  nomCom: "play",
  categorie: "Download",
  reaction: "🎧"
}, async (msg, sock, context) => {
  const { ms, repondre, arg, nomCom } = context;

  if (!arg[0]) {
    return repondre("🎧 *Please provide a song name to play!*\n\n_Example:_ `.play Alan Walker Faded`");
  }

  const query = arg.join(" ");
  repondre(`🔎 *Searching for:* _${query}_`);

  try {
    const searchResult = await yts(query);
    const videos = searchResult.videos;

    if (videos.length === 0) {
      return repondre("❌ *No results found!*\nTry another song title.");
    }

    const song = videos[0];
    const videoUrl = song.url;
    const apiUrl = `https://api.giftedtech.web.id/api/download/dlmp3?apikey=gifted&url=${encodeURIComponent(videoUrl)}`;
    const { data } = await axios.get(apiUrl);

    if (data.status === 200 && data.success) {
      const audioUrl = data.result.download_url;

      // Send audio with thumbnail and stylish caption
      await sock.sendMessage(msg, {
        image: { url: song.thumbnail },
        caption: `🎶 *${song.title}*\n\n📺 *Channel:* ${song.author.name}\n⏱ *Duration:* ${song.timestamp}\n🌐 *URL:* ${videoUrl}\n\n_📥 Downloading audio..._`,
      }, { quoted: ms });

      await sock.sendMessage(msg, {
        audio: { url: audioUrl },
        mimetype: "audio/mp4"
      }, { quoted: ms });

      // Send interactive buttons
      await sock.sendMessage(msg, {
        text: `✅ *Download Complete!*\n\n🎵 *${song.title}*\n🧠 Powered by *Bunblebee-XMD*\n\n💬 What would you like to do next?`,
        footer: "🎧 Music Downloader by Black-Tappy",
        buttons: [
          { buttonId: `${nomCom} ${query}`, buttonText: { displayText: "🔁 Download Again" }, type: 1 },
          { buttonId: "channel", buttonText: { displayText: "📢 Join Channel" }, type: 1 }
        ],
        headerType: 1
      }, { quoted: ms });

    } else {
      repondre("⚠️ *Failed to download audio.* Try again later.");
    }

  } catch (err) {
    console.error("Play Command Error:", err);
    repondre("❌ *Something went wrong!*\nPlease try again later.");
  }
});
