"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
const axios = require("axios");

const githubRawBaseUrl =
  "https://raw.githubusercontent.com/ibrahimaitech/bwm-xmd-music/master/tiktokmusic";

const audioFiles = Array.from({ length: 161 }, (_, i) => `sound${i + 1}.mp3`);
const images = [
  "https://files.catbox.moe/9pawjj.jpg",
  "https://files.catbox.moe/95n1x6.jpg",
  "https://files.catbox.moe/0w7hqx.jpg",
  "https://files.catbox.moe/bddwnw.jpeg",
  "https://files.catbox.moe/f6zee8.jpeg",
  "https://files.catbox.moe/rfysfu.jpg",
  "https://files.catbox.moe/omgszj.jpg",
  "https://files.catbox.moe/9ntbi7.webp",
  "https://files.catbox.moe/nwvoq3.jpg",
  "https://files.catbox.moe/040de7.jpeg",
  "https://files.catbox.moe/3qkejj.jpeg",
];

// List of motivational quotes or facts
const factsOrQuotes = [
  "✨ Did you know? The first computer programmer was Ada Lovelace in 1843!",
  "💡 Success is not final; failure is not fatal: It is the courage to continue that counts.",
  "🌟 Keep going, you're closer to your goals than you think!",
  "🔥 Tip: Automate the boring stuff to focus on the creative!",
  "🌐 Fun Fact: The first email was sent in 1971 by Ray Tomlinson.",
];

adams(
  { nomCom: "alive", reaction: "🪄", nomFichier: __filename },
  async (dest, zk, commandeOptions) => {
    console.log("Alive command triggered!");

    const contactName = commandeOptions?.ms?.pushName || "Unknown Contact"; // Sender's name or "Unknown Contact"
    const hour = new Date().getHours();

    // Dynamic greeting based on time
    const greeting =
      hour < 12
        ? "Good Morning 🌅"
        : hour < 18
        ? "Good Afternoon ☀️"
        : "Good Evening 🌠";

    try {
      // Randomly pick an audio file and image
      const randomAudioFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];
      const randomImage = images[Math.floor(Math.random() * images.length)];
      const randomFactOrQuote = factsOrQuotes[Math.floor(Math.random() * factsOrQuotes.length)];

      const audioUrl = `${githubRawBaseUrl}/${randomAudioFile}`;

      // Verify if the audio file exists
      const audioResponse = await axios.head(audioUrl);
      if (audioResponse.status !== 200) {
        throw new Error("Audio file not found!");
      }

      // Generate dynamic emojis based on contact name
      const emojis = contactName
        .split("")
        .map((char) => String.fromCodePoint(0x1f600 + (char.charCodeAt(0) % 80)))
        .join("");

      // Randomized external ad reply content
      const externalAdReply = {
        title: `🙋 ${greeting} ${contactName} 🙋 `,
        body: "Tap here to join our official channel!",
        thumbnailUrl: randomImage,
        sourceUrl: "https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10",
        showAdAttribution: true,
        mediaType: 1,
        renderLargerThumbnail: true,
      };

      // Send the custom message
      await zk.sendMessage(dest, {
        image: { url: randomImage },
        caption: `${greeting} ${contactName}\n\n${randomFactOrQuote}\n\n🙋 Always Active 🙋\n🌟 Contact: ${contactName}\n🌐 [Visit Channel](${externalAdReply.sourceUrl})\n\n${emojis}`,
        audio: { url: audioUrl },
        mimetype: "audio/mpeg",
        ptt: true,
        contextInfo: {
          quotedMessage: {
            conversation: "Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ",
          },
          externalAdReply,
        },
      });

      console.log("Alive message sent successfully with dynamic features.");
    } catch (error) {
      console.error("Error sending Alive message:", error.message);
    }
  }
);

console.log("WhatsApp bot is ready!");




zokou(
  { nomCom: "test", reaction: "👇", nomFichier: __filename },
  async (dest, zk, commandeOptions) => {
    console.log("Alive command triggered!");

    const contactName = commandeOptions?.ms?.pushName || "Unknown Contact"; // Sender's name or "Unknown Contact"
    const hour = new Date().getHours();

    // Dynamic greeting based on time
    const greeting =
      hour < 12
        ? "Good Morning 🌤"
        : hour < 18
        ? "Good Afternoon 🌞"
        : "Good Evening 🌠";

    try {
      // Randomly pick an audio file and image
      const randomAudioFile = audioFiles[Math.floor(Math.random() * audioFiles.length)];
      const randomImage = images[Math.floor(Math.random() * images.length)];
      const randomFactOrQuote = factsOrQuotes[Math.floor(Math.random() * factsOrQuotes.length)];

      const audioUrl = `${githubRawBaseUrl}/${randomAudioFile}`;

      // Verify if the audio file exists
      const audioResponse = await axios.head(audioUrl);
      if (audioResponse.status !== 200) {
        throw new Error("Audio file not found!");
      }

      // Generate dynamic emojis based on contact name
      const emojis = contactName
        .split("")
        .map((char) => String.fromCodePoint(0x1f600 + (char.charCodeAt(0) % 80)))
        .join("");

      // Randomized external ad reply content
      const externalAdReply = {
        title: `🙋 ${greeting}, ${contactName} 🙋 `,
        body: "Tap here to join our official channel!",
        thumbnailUrl: randomImage,
        sourceUrl: "https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10",
        showAdAttribution: true,
        mediaType: 1,
        renderLargerThumbnail: true,
      };

      // Send the custom message
      await zk.sendMessage(dest, {
        image: { url: randomImage },
        caption: `${greeting}, ${contactName}!\n\n${randomFactOrQuote}\n\n🙋 Always Active 🙋\n🌟 Contact: ${contactName}\n🌐 [Visit Channel](${externalAdReply.sourceUrl})\n\n${emojis}`,
        audio: { url: audioUrl },
        mimetype: "audio/mpeg",
        ptt: true,
        contextInfo: {
          quotedMessage: {
            conversation: "฿ᴜᴍʙʟᴇʙᴇᴇ-ӾᴍĐ",
          },
          externalAdReply,
        },
      });

      console.log("Alive message sent successfully with dynamic features.");
    } catch (error) {
      console.error("Error sending Alive message:", error.message);
    }
  }
);

console.log("WhatsApp bot is ready!");
