const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou(
  { nomCom: "repo", categorie: "General", reaction: "📚" },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    const { cm } = require(__dirname + "/../framework/zokou");

    try {
      let coms = {};
      let mode = "public";

      // Check bot mode (public or private)
      if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
      }

      // Map commands by category (though not used in the reply for .repo)
      cm.map((com) => {
        if (!coms[com.categorie]) coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
      });

      // Set timezone and get current time/date
      moment.tz.setDefault('Etc/GMT');
      const time = moment().format('HH:mm:ss');
      const date = moment().format('DD/MM/YYYY');

      // Prepare the repo message with consistent styling
      const infoMsg = `╭───〔 *🤖 REPO INFO* 〕───◉
│✨ * Hey👋 ${nomAuteurMessage} Bot is Active & Online!*
│
│🧠 *Owner:* Black-Tappy 
│⚡ *Version:* 4.0.0
│📳 *Mode:* [${mode}]
│📅 *Date*: ${date}
│⏰ *Time (GMT)*: ${time}
│🔗 *Github*: https://github.com/xhclintohn/Toxic-MD/fork
│💾 *Ram Usage*: ${format(os.totalmem() - os.freemem())} / ${format(os.totalmem())}
╰────────────────────◉`;

      // Get the bot's profile picture URL
      const lien = mybotpic();

      // Send the message with a video if the URL is a video (mp4 or gif)
      if (lien.match(/\.(mp4|gif)$/i)) {
        try {
          await zk.sendMessage(
            dest,
            {
              video: { url: lien },
              caption: infoMsg,
              footer: `Hey ${nomAuteurMessage}! I'm Bumblebee-XMD created by Black-Tappy 😎`,
              gifPlayback: true,
            },
            { quoted: ms }
          );
        } catch (e) {
          console.error("Video sending error:", e);
          await repondre(`Hey ${nomAuteurMessage}, Bumblebee-XMD fumbled the video send: ${e.message} 😡 Here’s the repo info anyway! 😣`);
        }
      }
      // Send the message with an image if the URL is an image (jpeg, png, jpg)
      else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
          await zk.sendMessage(
            dest,
            {
              image: { url: lien },
              caption: infoMsg,
              footer: `Hey ${nomAuteurMessage}! I'm Bumblebee-XMD, created by Black-Tappy 😎`,
            },
            { quoted: ms }
          );
        } catch (e) {
          console.error("Image sending error:", e);
          await repondre(`Hey ${nomAuteurMessage}, Bumblebee-XMD botched the image send: ${e.message} 😡 Here’s the repo info anyway! 😣\n${infoMsg}`);
        }
      }
      // Fallback to text-only message if no valid media is provided
      else {
        await repondre(infoMsg);
      }
    } catch (e) {
      console.error("Error in repo command:", e);
      await repondre(`TOTAL BUST, ${nomAuteurMessage}! Bumblebee-XMD crashed while fetching repo info: ${e.message} 😡 Try again or flop! 😣`);
    }
  }
);