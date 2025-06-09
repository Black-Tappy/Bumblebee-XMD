const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const path = require('path');
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou(
  { nomCom: "bot", categorie: "General" },
  async (dest, zk, commandeOptions) => {
    let { ms, repondre, mybotpic } = commandeOptions;
    var mode = "public";

    if (s.MODE.toLocaleLowerCase() !== "yes") {
      mode = "private";
    }

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
     𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍ𝐃

VERSION
> 𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍ𝐃 V8.0

STATUS
> ${mode.toUpperCase()} MODE

╭━━━━━━━━━━━━━━━━━┈⊷
│❒⁠⁠⁠⁠ RAM : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│❒⁠⁠⁠⁠ DEV : Ⴊl𐌀Ꮳk𐌕𐌀ႲႲჄ
╰━━━━━━━━━━━━━━━━━┈⊷
  `;

    let menuMsg = `
     𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍ𝐃 𝟐𝟎𝟐𝟓™

◈━━━━━━━━━━━━━━━━◈`;

    try {
      // Send bot info
      var lien = mybotpic();
      if (lien.match(/\.(mp4|gif)$/i)) {
        await zk.sendMessage(
          dest,
          {
            video: { url: lien },
            caption: infoMsg + menuMsg,
            footer: "Bumblebee-XMD WhatsApp Bot",
            gifPlayback: true,
          },
          { quoted: ms }
        );
      } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        await zk.sendMessage(
          dest,
          {
            image: { url: lien },
            caption: infoMsg + menuMsg,
            footer: "Bumblebee-XMD WhatsApp Bot",
          },
          { quoted: ms }
        );
      } else {
        await repondre(infoMsg + menuMsg);
      }

      // Send random audio as a voice note
      const audioFolder = __dirname + "/../black_tappy/";
      console.log("Audio folder path:", audioFolder);

      // Check if folder exists
      if (!fs.existsSync(audioFolder)) {
        console.log("Audio folder does not exist:", audioFolder);
        repondre(`Audio file not found: ${audioFolder}`);
        return;
      }

      // Get all MP3 files in the folder (e.g., bot1.mp3 to bot9.mp3)
      const audioFiles = fs.readdirSync(audioFolder).filter(f => f.endsWith(".mp3"));
      console.log("Available audio files:", audioFiles);

      if (audioFiles.length === 0) {
        console.log("No MP3 files found in folder");
        repondre(`No audio files found in black_tappy folder📁`);
        return;
      }

      // Randomly select an audio file
      const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
      const audioPath = audioFolder + randomAudio;

      console.log("Randomly selected audio:", randomAudio);
      console.log("Full audio path:", audioPath);

      // Verify file exists
      if (fs.existsSync(audioPath)) {
        console.log("Audio file exists, sending as voice note...");
        try {
          const audioMessage = await zk.sendMessage(
            dest,
            {
              audio: { url: audioPath },
              mimetype: "audio/mpeg", // MP3 files use audio/mpeg
              ptt: true, // Voice note appearance (waveform, duration)
              fileName: `𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍ𝐃 ✧`,
              caption: "𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍ𝐃",
            },
            { quoted: ms }
          );
          console.log("Audio sent successfully:", randomAudio);
          console.log("Audio message details:", audioMessage);
        } catch (audioError) {
          console.error("Error sending audio:", audioError);
          repondre(`Error sending voice note: ${audioError.message}`);
        }
      } else {
        console.log("Selected audio file not found at:", audioPath);
        repondre(`Audio file not found: ${randomAudio}\n in Available files: ${audioFiles.join(", ")}`);
      }

    } catch (e) {
      console.log("Bot command error:", e);
      repondre(`Bot command error: ${e.message}`);
    }
  }
);