const { zokou } = require("../framework/zokou");
const { format } = require("../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require("../set");

zokou({ 
    nomCom: "sc", 
    categorie: "General",
    reaction: "📂" 
}, async (dest, zk, commandeOptions) => {
    const { ms, repondre, mybotpic } = commandeOptions;
    
    const mode = s.MODE.toLowerCase() === "yes" ? "public" : "private";
    moment.tz.setDefault('Etc/GMT');
    const time = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    const repoInfo = `
*BUMBLEBEE XMD REPOSITORY*

🔗 *GitHub Link:*
https://github.com/Black-Tappy/Bumblebee-XMD

📢 *WhatsApp Channel:*
https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10

🖥️ *System Info:*
- Time: ${time} (GMT)
- Date: ${date}
- RAM: ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
- Mode: ${mode}

👨‍💻 *Developers:*
- @254759000340 (🅑r̸𝐢𝖌𝖍t̸_×͜×)
- @254731316204 (Ⴊl𐌀Ꮳk 𐌕𐌀ႲႲჄ)
    `;

    try {
        const media = mybotpic();
        
        if (media.match(/\.(mp4|gif|jpeg|png|jpg)$/i)) {
            await zk.sendMessage(
                dest,
                { 
                    [media.match(/\.(mp4|gif)$/i) ? 'video' : 'image']: { url: media },
                    caption: repoInfo,
                    mentions: [
                        '254759000340@s.whatsapp.net',
                        '254731316204@s.whatsapp.net'
                    ]
                },
                { quoted: ms }
            );
        } else {
            await repondre(repoInfo);
        }
    } catch (error) {
        console.error("Error:", error);
        repondre("❌ Failed to load repository info");
    }
});