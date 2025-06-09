const { zokou } = require("../framework/zokou");
const fs = require("fs");
const { webp2mp4File } = require("../../lib/uploader");

//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//
//                   Utilities Modules             //
//               Powered by Black-Tappy                //
//             Owner: Black-Tappy                  //
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━//

// ToGIF Command
zokou(
  {
    nomCom: "togif",
    categorie: "Utilities",
    reaction: "🍁",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefixe, quoted } = commandeOptions;
    try {
      if (quoted && /webp/.test(quoted.mtype)) {
        repondre("🔄 Converting your sticker to GIF...");

        // Download and save the quoted sticker
        let mediaMess = await zk.downloadAndSaveMediaMessage(quoted);
        let webpToMp4 = await webp2mp4File(mediaMess);

        // Send the converted GIF
        await zk.sendMessage(
          dest,
          {
            video: { url: webpToMp4.result },
            caption: "🎞 Converted to GIF 🎞\n\nPowered by Black-Tappy\nOwner: Black-Tappy",
            gifPlayback: true,
          },
          { quoted: ms }
        );

        // Clean up the temporary file
        fs.unlinkSync(mediaMess);
      } else {
        repondre(
          `🔹 Example: ${prefixe}togif <Reply to animated GIF>\n\nPlease replt to an *animated* stivker to convert it to a GIF!`
        );
      }
    } catch (e) {
      repondre(`❌ Oops! Something went wrong: ${e.message}`);
    }
  }
);

module.exports = { zokou };