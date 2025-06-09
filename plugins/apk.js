const { zokou } = require("../framework/zokou");
const { default: axios } = require('axios');

const BUMBLEBEE_XMD = "𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍ𝐃"; // Fancy font

zokou({ nomCom: "apk", categorie: 'Download', reaction: "📱" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    const message = `
${BUMBLEBEE_XMD}

╭━━━━━━━━━━━━━━━━━┈⊷
│❒ Please provide an app name 🚫
│❒ *Example*: .apk Whatsapp
╰━━━━━━━━━━━━━━━━━┈⊷
    `;
    repondre(message);
    return;
  }

  const appName = arg.join(' ').trim();

  try {
    const apiUrl = `https://api.giftedtech.web.id/api/download/apkdl?apikey=gifted&appName=${encodeURIComponent(appName)}`;
    const response = await axios.get(apiUrl);

    if (!response.data.success || response.data.status !== 200) {
      const errorMessage = `
${BUMBLEBEE_XMD}

╭━━━━━━━━━━━━━━━━━┈⊷
│❒ 🚫 No app found with that name, 
│❒ please try again. ${response.data.message || 'Unknown ereor'}
╰━━━━━━━━━━━━━━━━━┈⊷
      `;
      repondre(errorMessage);
      return;
    }

    const app = response.data.result;
    const message = `
${BUMBLEBEE_XMD}

╭━━━〔 *APK Downloader* 〕━━━┈⊷
┃ 📦 *Name:* ${app.name}
┃ 🏋 *Size:* ${appSize} MB
┃ 📦 *Package:* ${app.package}
┃ 📅 *Updated On:* ${app.updated}
┃ 👨‍💻 *Developer:* ${app.developer.name}
┃ 🔗 *Download Link:* ${app.download_url}
╰━━━━━━━━━━━━━━━┈⊷
🔗 *Powered By Bumblebee-XMD-AI*
    `;
    await zk.sendMessage(dest, { text: message }, { quoted: ms });
  } catch (error) {
    const errorMessage = `
${BUMBLEBEE_XMD}

╭━━━━━━━━━━━━━━━━━┈⊷
│❒ Error fetching app: ${error.message} 😓
│❒ Please try again later or check the app name.
╰━━━━━━━━━━━━━━━━━┈⊷
    `;
    repondre(errorMessage);
  }
});