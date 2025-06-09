const {
  zokou
} = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "getcmd",
  categorie: "Utilities",
  reaction: "🛠"
}, async (dest, zk, commandeOptions) => {
  const {
    repondre,
    ms,
    arg,
    prefixe,
    nomAuteurMessage,
    auteurMessage
  } = commandeOptions;
  
  // Aggressive owner verification
  const OWNER_JID = "254759000340@s.whatsapp.net";
  const senderJid = auteurMessage || ms.key.participant || ms.key.remoteJid;
  
  // Strict owner check - works in both groups and DMs
  if (senderJid !== OWNER_JID) {
    return repondre(`Owner Only!\n\nThis command is restricted to the bot owner (@${OWNER_JID.split("@")[0]}).`);
  }

  if (!arg || arg.length === 0) {
    return repondre(`Example: ${prefixe}getcmd logo.js\n\nPlease provide a filename to retrieve from the plugins repo!`);
  }

  const filename = arg.join(" ").trim();
  if (!filename.endsWith(".js")) {
    return repondre("Invalid Filename!\n\nPlease use a .js file name (e.g., logo.js).");
  }

  const repoOwner = "Black-Tappy";
  const repoName = "Bumblebee-XMD";
  const folder = "plugins";
  const fileUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${folder}/${filename}`;

  try {
    repondre(`Fetching contents of "${filename}"...`);
    const response = await axios.get(fileUrl);
    const fileContent = response.data;
    
    const resultMessage = `
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
│▒▒▒▒  🛠 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐅𝐢𝐥𝐞 𝐑𝐞𝐭𝐫𝐢𝐞𝐯𝐚𝐥 ⚡️
│▒▒▒▒
> 𝐅𝐢𝐥𝐞𝐧𝐚𝐦𝐞: *${filename}*
> 𝐒𝐨𝐮𝐫𝐜𝐞: 𝐆𝐢𝐭𝐇𝐮𝐛 𝐑𝐞𝐩𝐨
│▒▒▒▒
\`\`\`javascript
${fileContent}
\`\`\`
│▒▒▒▒
> P𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐁𝐥𝐚𝐜𝐤-𝐓𝐚𝐩𝐩𝐲
> O𝐰𝐧𝐞r: 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭o𝐧
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
`;
    await zk.sendMessage(dest, {
      text: resultMessage
    }, {
      quoted: ms
    });
  } catch (error) {
    console.error("Error retrieving file:", error);
    let errorMessage = "E𝐫𝐫o𝐫 r𝐞𝐭r𝐢𝐞v𝐢ng f𝐢𝐥e!";
    if (error.response && error.response.status === 404) {
      errorMessage = `F𝐢𝐥e "${filename}" no𝐭 fo𝐮nd in the repo!`;
    } else {
      errorMessage += `\nD.e𝐭.a𝐢.l.s: ${error.message}`;
    }
    repondre(errorMessage);
  }
});

module.exports = {
  zokou: zokou
};