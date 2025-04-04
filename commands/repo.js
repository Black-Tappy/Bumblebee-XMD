const { zokou } = require("../framework/zokou");
const { format } = require("../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require("../set");

zokou({ 
    nomCom: "repo", 
    categorie: "General", 
    reaction: "🌟" 
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, mybotpic } = commandeOptions;
    
    const mode = (s.MODE.toLowerCase() !== "yes") ? "private" : "public";
    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // Stylish ASCII Art Banner
    const banner = `
▓█████▄  ▒█████   ██▒   █▓ ▄▄▄       ███▄ ▄███▓
▒██▀ ██▌▒██▒  ██▒▓██░   █▒▒████▄    ▓██▒▀█▀ ██▒
░██   █▌▒██░  ██▒ ▓██  █▒░▒██  ▀█▄  ▓██    ▓██░
░▓█▄   ▌▒██   ██░  ▒██ █░░░██▄▄▄▄██ ▒██    ▒██ 
░▒████▓ ░ ████▓▒░   ▒▀█░   ▓█   ▓██▒▒██▒   ░██▒
 ▒▒▓  ▒ ░ ▒░▒░▒░    ░ ▐░   ▒▒   ▓▒█░░ ▒░   ░  ░
 ░ ▒  ▒   ░ ▒ ▒░    ░ ░░    ▒   ▒▒ ░░  ░      ░
 ░ ░  ░ ░ ░ ░ ▒       ░░    ░   ▒   ░      ░   
   ░        ░ ░        ░        ░  ░       ░   
 ░                  ░                          
    `;

    const infoMsg = `
╔══════════════════════════╗
  ${banner}
╠══════════════════════════╣
║  🚀 *𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 𝐑𝐄𝐏𝐎𝐒𝐈𝐓𝐎𝐑𝐘*  ║
╠══════════════════════════╣
║  🔗 *𝐆𝐢𝐭𝐇𝐮𝐛 𝐋𝐢𝐧𝐤*:        
║  https://github.com/Black-Tappy/Bumblebee-XMD/fork
║
╠══════════════════════════╣
║  💻 *𝐒𝐲𝐬𝐭𝐞𝐦 𝐈𝐧𝐟𝐨*        
║  🕒 ${temps} (GMT) • ${date}
║  🧠 RAM: ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
║  🔒 Mode: ${mode}
║
╠══════════════════════════╣
║  👑 *𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫𝐬*        
║  • @254759000340 (Ⴊl𐌀Ꮳk 𐌕𐌀ႲႲჄ)
║  • @254759000340 (🅑r̸𝐢𝖌𝖍t̸_×͜×)
╚══════════════════════════╝
    `;

    try {
        const lien = mybotpic();
        const mentionedJids = [
            '254759000340@s.whatsapp.net', 
            '254731316204@s.whatsapp.net'
        ];

        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(
                dest,
                { 
                    video: { url: lien }, 
                    caption: infoMsg,
                    footer: "🔥 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 - 𝐓𝐡𝐞 𝐔𝐥𝐭𝐢𝐦𝐚𝐭𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭",
                    mentions: mentionedJids,
                    gifPlayback: true
                },
                { quoted: ms }
            );
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(
                dest,
                { 
                    image: { url: lien }, 
                    caption: infoMsg,
                    footer: "🔥 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 - 𝐓𝐡𝐞 𝐔𝐥𝐭𝐢𝐦𝐚𝐭𝐞 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭",
                    mentions: mentionedJids
                },
                { quoted: ms }
            );
        } else {
            await repondre(infoMsg, { mentions: mentionedJids });
        }
    } catch (e) {
        console.error("❌ 𝐄𝐫𝐫𝐨𝐫:", e);
        await repondre("❌ 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐥𝐨𝐚𝐝 𝐫𝐞𝐩𝐨 𝐢𝐧𝐟𝐨. 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐥𝐚𝐭𝐞𝐫.");
    }
});