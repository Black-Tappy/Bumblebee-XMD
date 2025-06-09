const { zokou } = require('../framework/zokou');
const axios = require('axios');

zokou({ nomCom: "youtube", categorie: "Download", reaction: "🎥" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  console.log(`[DEBUG] youtube command triggered by ${ms.key.participant || ms.key.remoteJid} in ${dest}`);

  // Handle null pushName
  const userName = ms.pushName || "User";

  // Check if URL is provided
  if (!arg || arg.length === 0) {
    console.log(`[DEBUG] youtube: No URL provided`);
    repondre(`HEY, ${userName}! 😤 What’s this nonsense? No YouTube URL? Stop wasting my time and give me a link, you clown! 🚫`);
    return;
  }

  // Join arguments to form URL
  const url = arg.join(" ").trim();
  console.log(`[DEBUG] youtube: Provided URL: ${url}`);

  // Validate URL format (basic check)
  if (!url.includes("youtu.be") && !url.includes("youtube.com")) {
    console.log(`[DEBUG] youtube: Invalid YouTube URL`);
    repondre(`YOU IDIOT, ${userName}! 😡 That’s not a YouTube link! Try again or get lost, moron! 🚫`);
    return;
  }

  // API request
  const apiUrl = `https://api.giftedtech.web.id/api/download/ytmp4?apikey=gifted&url=${encodeURIComponent(url)}`;
  console.log(`[DEBUG] youtube: Calling API: ${apiUrl}`);

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    console.log(`[DEBUG] youtube: API response:`, JSON.stringify(data, null, 2));

    // Check API success
    if (!data.success || data.status !== 200) {
      console.log(`[DEBUG] youtube: API failed, success=${data.success}, status=${data.status}`);
      repondre(`THIS IS GARBAGE, ${userName}! 😤 The API screwed up: ${data.message || "Unknown error"}! Try again, you fool! 🚫`);
      return;
    }

    const result = data.result;
    const { title, quality, thumbnail, download_url } = result;

    // Format response
    const message = `BOOM💥, ${userName}! 🎥 Got your video!\n👑 *Title*: ${title}\n🔎 *Quality*: ${quality}\n📁 *Thumbnail*: ${thumbnail}\n📥 *Download*: ${download_url}\n🤖 Grab it fast or I’ll yeet it! 😈\n🛠️ Powered by xh_clinton`;

    console.log(`[DEBUG] youtube: Sending video info for ${title}`);
    repondre(message);

  } catch (e) {
    console.log(`[DEBUG] youtube: Error fetching API: ${e.message}`);
    repondre(`DAMN IT, ${userName}! 😤 Something broke: ${e.message}! Fix your link or I’ll smash this system! 🚫`);
  }
});