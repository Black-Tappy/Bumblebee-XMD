"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

zokou({ 
    nomCom: "test2", 
    reaction: "⚡", 
    nomFichier: __filename 
}, async (dest, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;

    console.log("Command recieved!");

    // Create initial loading message
    let loadingMsg = await zk.sendMessage(dest, { 
        text: "🔄 Initializing system... 0%"
    }, { quoted: ms });

    // Realistic loading simulation
    const steps = [
        { percent: 25, text: "🔍 𝐋𝐨𝐚𝐝𝐢𝐧𝐠 𝐜𝐨𝐦𝐩𝐨𝐧𝐞𝐧𝐭𝐬..." },
        { percent: 50, text: "⚙️ 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐧𝐠 𝐭𝐨 𝐬𝐞𝐫𝐯𝐞𝐫𝐬..." },
        { percent: 75, text: "📡 𝐄𝐬𝐭𝐚𝐛𝐥𝐢𝐬𝐡𝐢𝐧𝐠 𝐬𝐞𝐜𝐮𝐫𝐞 𝐥𝐢𝐧𝐤..." },
        { percent: 100, text: "✅ 𝐒𝐲𝐬𝐭𝐞𝐦 𝐫𝐞𝐚𝐝𝐲!" }
    ];

    for (const step of steps) {
        await sleep(800); // Realistic delay between steps
        await zk.sendMessage(dest, {
            text: `${step.text} ${step.percent}%\n` +
                  `[${'█'.repeat(step.percent/5)}${'░'.repeat(20 - step.percent/5)}]`,
            edit: loadingMsg.key
        });
    }

    // Final output with your requested font style
    const statusMessage = `
╭───── • ─────╮
   𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄-𝐗𝐌𝐃 𝐒𝐓𝐀𝐓𝐔𝐒
╰───── • ─────╯

⭕ 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄-𝐗𝐌𝐃 𝐈𝐒 𝐎𝐍𝐋𝐈𝐍𝐄 ⭕

╭───── • ─────╮
   𝐒𝐘𝐒𝐓𝐄𝐌 𝐇𝐄𝐀𝐋𝐓𝐇
╰───── • ─────╯
✅ 𝐀𝐥𝐥 𝐬𝐲𝐬𝐭𝐞𝐦𝐬 𝐧𝐨𝐦𝐢𝐧𝐚𝐥
🔋 𝐏𝐨𝐰𝐞𝐫: 𝟏𝟎𝟎%
📶 𝐂𝐨𝐧𝐧𝐞𝐜𝐭𝐢𝐨𝐧: 𝐒𝐭𝐚𝐛𝐥𝐞

👑 𝐎𝐰𝐧𝐞𝐫: 𝐁𝐥𝐚𝐜𝐤-𝐓𝐚𝐩𝐩𝐲
    `;

    const mp4 = 'https://telegra.ph/file/ce58cf8c538b1496fda33.mp4';

    // Send final message with video
    await zk.sendMessage(dest, { 
        video: { url: mp4 }, 
        caption: statusMessage,
        gifPlayback: true
    });

    console.log("𝐓𝐞𝐬𝐭 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐜𝐨𝐦𝐩𝐥𝐞𝐭𝐞𝐝 𝐬𝐮𝐜𝐜𝐞𝐬𝐬𝐟𝐮𝐥𝐥𝐲");
});

console.log("𝐓𝐞𝐬𝐭 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐫𝐞𝐠𝐢𝐬𝐭𝐞𝐫𝐞𝐝");