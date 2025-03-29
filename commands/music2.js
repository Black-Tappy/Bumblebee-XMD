const { cmd } = require("../command");
const yts = require("yt-search");
const axios = require("axios");

cmd({
  pattern: "playx",
  alias: ["yt", "song", "video", "audio"],
  desc: "Download YouTube videos",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, quoted, args, q, reply }) => {
  try {
    if (!q) return reply("*`Please provide a YouTube link or title!`*");

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    let videoUrl = q;
    let searchData = null;
    let videoID = null;

    // If the user provides a title instead of a link
    if (!q.startsWith("https://")) {
      const searchResults = await yts(q);
      if (!searchResults.videos.length) return reply("*No results found!*");

      searchData = searchResults.videos[0];
      videoUrl = searchData.url;
      videoID = searchData.videoId;
    } else {
      // Extract video ID from URL
      const match = q.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*vi?=))([^&?/\s]+)/);
      videoID = match ? match[1] : null;
    }

    // Fetch download link from API
    const { data } = await axios.get(`https://apis.davidcyriltech.my.id/download/ytmp4?url=${videoUrl}`);
    if (!data.status) return reply("*Failed to fetch video!*");

    const ytData = searchData || {
      title: data.data.title,
      thumbnail: videoID ? `https://i.ytimg.com/vi/${videoID}/maxresdefault.jpg` : null,
      timestamp: "Unknown",
      author: "Unknown",
      views: "Unknown",
      ago: "Unknown"
    };

    const caption = `╭━━━〔 *YT DOWNLOADER* 〕━━━⊷\n`
      + `┃ 📌 *Title:* ${ytData.title}\n`
      + `┃ 🎭 *Channel:* ${ytData.author.name || "Unknown"}\n`
      + `┃ 👁‍🗨 *Views:* ${ytData.views}\n`
      + `┃ 🕒 *Uploaded:* ${ytData.ago}\n`
      + `┃ ⏳ *Duration:* ${ytData.timestamp}\n`
      + `╰━━━━━━━━━━━━━━━⪼\n\n`
      + `🎬 *Download Options:*\n`
      + `1️⃣  *Video*\n`
      + `2️⃣  *Document*\n`
      + `3️⃣  *Audio*\n\n`
      + `📌 *Reply with the number to download in your choice.*`;

    const sentMsg = await conn.sendMessage(from, {
      image: { url: ytData.thumbnail || "https://i.ibb.co/TBpSgZjn/lordcasey.jpg" },
      caption: caption,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363302677217436@newsletter",
          newsletterName: "𝐒𝐇𝐀𝐃𝐎𝐖-𝐗𝐌𝐃",
          serverMessageId: 143
        }
      }
    }, { quoted: m });

    const messageID = sentMsg.key.id;

    conn.ev.on("messages.upsert", async (msgData) => {
      const receivedMsg = msgData.messages[0];
      if (!receivedMsg.message) return;

      const receivedText = receivedMsg.message.conversation || receivedMsg.message.extendedTextMessage?.text;
      const senderID = receivedMsg.key.remoteJid;
      const isReplyToBot = receivedMsg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

      if (isReplyToBot) {
        await conn.sendMessage(senderID, { react: { text: '⬇️', key: receivedMsg.key } });

        let downloadLink = data.data.url;

        switch (receivedText) {
          case "1":
            await conn.sendMessage(senderID, {
              video: { url: downloadLink },
              caption: "*𝐒𝐇𝐀𝐃𝐎𝐖-𝐗𝐌𝐃*"
            }, { quoted: receivedMsg });
            break;

          case "2":
            await conn.sendMessage(senderID, {
              document: { url: downloadLink },
              mimetype: "video/mp4",
              fileName: `${ytData.title}.mp4`,
              caption: "*𝐒𝐇𝐀𝐃𝐎𝐖-𝐗𝐌𝐃*"
            }, { quoted: receivedMsg });
            break;

          case "3":
            await conn.sendMessage(senderID, {
              audio: { url: downloadLink },
              mimetype: "audio/mpeg"
            }, { quoted: receivedMsg });
            break;

          default:
            reply("❌ Invalid option! Please reply with 1, 2, or 3.");
        }

        await conn.sendMessage(senderID, { react: { text: '✅', key: receivedMsg.key } });
      }
    });

  } catch (error) {
    console.log(error);
    reply("⚠️ *Error fetching video!*");
  }
});
