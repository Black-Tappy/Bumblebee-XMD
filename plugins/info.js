const { zokou } = require('../framework/zokou');

zokou(
  {
    nomCom: 'info',
    categorie: 'General',
    reaction: '🗿'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, prefix, nomAuteurMessage } = commandeOptions;

    try {
      // Group and Channel links
      const groupLink = 'https://chat.whatsapp.com/LTDjmUIvmqmEWYPkqbx4SN';
      const channelLink = 'https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10';

      // Prepare the info message content
      const infoMsg = `
╭──░░░░〔 *🤖 Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ* 〕░░░░
│  ╭─➤                                                      
├─ [🔗]*${nomAuteurMessage} ⭐:       
├─ 📩 𝐆𝐫𝐨𝐮𝐩*: ${groupLink}
│  ╰─➤
│  ╭─➤
├─ 📢 *Join Channel:*  
│  ╰─➤Click [**Here**](https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10) to join!
│ [⚙️]   ▲ SYSTEM STATUS: STABLE ░░░░░░░░░░░░░░░░░░░░░░░ 100%
│ [🛠️]   ▲ MONITORING █▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
├─ [🟢]𝐎𝐰𝐧𝐞𝐫: ${prefix}owner*! 😎
│  ╰─➤ Click [**Here**](https://wa.me/254735342808)!
│▒▒▒▒ [::] BOT READY FOR DEPLOYMENT — STAY HIDDEN
│▒▒▒▒ [::] RUNNING IN GHOST MODE ☠      
╰─🚀 *Powered by Black-Tappy*
      `;

      // Send the info message
      await zk.sendMessage(
        dest,
        {
          text: infoMsg,
          footer: `Hey ${nomAuteurMessage}! I'm Bumblebee-XMD, created by Black-Tappy 😎`
        },
        { quoted: ms }
      );

    } catch (error) {
      console.error("Error in info command:", error.stack);
      await repondre(`TOTAL BUST, ${nomAuteurMessage}! Bumblebee-XMD tripped while dropping the info: ${error.message} 😡 Try again or flop! 😣`);
    }
  }
);