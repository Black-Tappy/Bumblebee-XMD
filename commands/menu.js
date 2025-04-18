const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ 
    nomCom: "menu", 
    categorie: "General", 
    reaction: "🔥" 
}, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    
    // Create loading message
    let loadingMsg = await zk.sendMessage(dest, { 
        text: "🔄 𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐌𝐞𝐧𝐮... 1%"
    }, { quoted: ms });

    // Update progress in 10% increments
    const updateProgress = async (percent) => {
        const progressBar = '█'.repeat(percent/10) + '░'.repeat(10 - percent/10);
        await zk.sendMessage(dest, {
            text: `🔄 𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐌𝐞𝐧𝐮... ${percent}%\n${progressBar}`,
            edit: loadingMsg.key
        });
    };

    // Simulate loading process
    for (let i = 10; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 300));
        await updateProgress(i);
    }

    // Prepare menu content
    var coms = {};
    var mode = "public";
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }

    cm.map(async (com, index) => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('EAT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    // ASCII Art Banner
    const banner = `
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
██░▄▄▀██░██░██░▄▀▄░██░▄▄▀██░█████░▄▄▄
██░▄▄▀██░██░██░█░█░██░▄▄▀██░█████░▄▄▄
██░▀▀░██▄▀▀▄██░███░██░▀▀░██░▀▀░██░▀▀▀
▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

    `;

    let infoMsg = `
╔═══◇ *𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃* ◇═══╗
${banner}
╠════◇ *𝐒𝐘𝐒𝐓𝐄𝐌 𝐈𝐍𝐅𝐎* ◇════╣
│🎭 *𝐎𝐰𝐧𝐞𝐫*: @254759000340
│⚡ *𝐌𝐨𝐝𝐞*: ${mode}
│⏰ *𝐓𝐢𝐦𝐞*: ${temps} (EAT)
│💾 *𝐑𝐀𝐌*: ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
╚════◇ *𝐒𝐓𝐀𝐓𝐔𝐒* ◇════╝
`;

    let menuMsg = `
╔═══◇ *𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐌𝐄𝐍𝐔* ◇═══╗
│
│ *𝐔𝐬𝐞 ${prefixe}help <command>*
│ *𝐟𝐨𝐫 𝐝𝐞𝐭𝐚𝐢𝐥𝐬*
│
╠════◇ *𝐂𝐀𝐓𝐄𝐆𝐎𝐑𝐈𝐄𝐒* ◇════╣
`;

    // Category colors and icons
    const categoryStyles = {
        "General": { icon: "🌟", color: "#FFD700" },
        "Group": { icon: "👥", color: "#00BFFF" },
        "Mods": { icon: "🛡️", color: "#FF4500" },
        "Fun": { icon: "🎭", color: "#9370DB" },
        "Search": { icon: "🔍", color: "#32CD32" }
    };

    for (const cat in coms) {
        const style = categoryStyles[cat] || { icon: "✨", color: "#FFFFFF" };
        menuMsg += `│\n│ ${style.icon} *${cat.toUpperCase()}* ${style.icon}\n│\n`;

        // Split commands into chunks of 3 for better layout
        const chunkSize = 3;
        for (let i = 0; i < coms[cat].length; i += chunkSize) {
            const chunk = coms[cat].slice(i, i + chunkSize);
            menuMsg += `│ ➤ ${chunk.join(" • ")}\n`;
        }
    }

    menuMsg += `
╠════◇ *𝐂𝐑𝐄𝐃𝐈𝐓𝐒* ◇════╣
│
│ *𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐝 𝐛𝐲:*
│ @254759000340 (🅑r̸𝐢𝖌𝖍t̸_×͜×)
│ @254731316204 (Ⴊl𐌀Ꮳk 𐌕𐌀ႲႲჄ)
│
╚════◇ *𝐄𝐍𝐃* ◇════╝
`;

    try {
        const lien = mybotpic();
        const mentionedJids = [
            '254759000340@s.whatsapp.net', 
            '254731316204@s.whatsapp.net'
        ];

        // Final loading update
        await zk.sendMessage(dest, {
            text: "✅ 𝐌𝐞𝐧𝐮 𝐑𝐞𝐚𝐝𝐲!",
            edit: loadingMsg.key
        });

        // Small delay before showing menu
        await new Promise(resolve => setTimeout(resolve, 500));

        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(
                dest,
                { 
                    video: { url: lien }, 
                    caption: infoMsg + menuMsg,
                    footer: "🔥 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 - 𝐓𝐡𝐞 𝐌𝐨𝐬𝐭 𝐏𝐨𝐰𝐞𝐫𝐟𝐮𝐥 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭",
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
                    caption: infoMsg + menuMsg,
                    footer: "🔥 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 - 𝐓𝐡𝐞 𝐌𝐨𝐬𝐭 𝐏𝐨𝐰𝐞𝐫𝐟𝐮𝐥 𝐖𝐡𝐚𝐭𝐬𝐀𝐩𝐩 𝐁𝐨𝐭",
                    mentions: mentionedJids
                },
                { quoted: ms }
            );
        } else {
            await zk.sendMessage(
                dest,
                { 
                    text: infoMsg + menuMsg,
                    mentions: mentionedJids
                },
                { quoted: ms }
            );
        }
    } catch (e) {
        console.error("❌ 𝐄𝐫𝐫𝐨𝐫:", e);
        await zk.sendMessage(dest, {
            text: "❌ 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐥𝐨𝐚𝐝 𝐦𝐞𝐧𝐮. 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧 𝐥𝐚𝐭𝐞𝐫.",
            edit: loadingMsg.key
        });
    }
});