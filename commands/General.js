const { zokou } = require("../framework/zokou");
const {getAllSudoNumbers,isSudoTableNotEmpty} = require("../bdd/sudo")
const conf = require("../set");

zokou({ nomCom: "owner", categorie: "General", reaction: "❣️" }, async (dest, zk, commandeOptions) => {
    const { ms , mybotpic, repondre } = commandeOptions;
    
    const thsudo = await isSudoTableNotEmpty()

    if (thsudo) {
        let msg = `╔════◇ *𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 𝐎𝐖𝐍𝐄𝐑𝐒* ◇════╗\n\n`
        
        // Primary owner (must be 254735342808)
        msg += `*👑 𝐌𝐚𝐢𝐧 𝐎𝐰𝐧𝐞𝐫:*\n• @254759000340\n\n`
        
        // Secondary owner (must be 254799283147)
        msg += `*🌟 𝐒𝐞𝐜𝐨𝐧𝐝𝐚𝐫𝐲 𝐎𝐰𝐧𝐞𝐫:*\n• @254731316204\n\n`
        
        // Other sudo users
        let sudos = await getAllSudoNumbers()
        if (sudos.length > 0) {
            msg += `───── *𝐎𝐭𝐡𝐞𝐫 𝐒𝐮𝐝𝐨𝐬* ─────\n`
            for (const sudo of sudos) {
                if (sudo) {
                    const sudonumero = sudo.replace(/[^0-9]/g, '');
                    // Skip if it's one of our required numbers
                    if (!['254759000340', '254732316204'].includes(sudonumero)) {
                        msg += `• @${sudonumero}\n`;
                    }
                }
            }
        }
        msg += `╚════◇ *𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃* ◇════╝`

        const mentionedJid = [
            '254759000340@s.whatsapp.net',
            '254731316204@s.whatsapp.net',
            ...sudos.map(num => num.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
        ].filter(num => !['254759000340', '254731316204'].includes(num.replace(/@s\.whatsapp\.net/, '')))

        zk.sendMessage(
            dest,
            {
                image: { url: mybotpic() },
                caption: msg,
                mentions: mentionedJid
            },
            { quoted: ms }
        )
    } else {
        // VCARD for primary owner
        const vcard = 
            'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + conf.OWNER_NAME + '\n' +
            'ORG:𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐦𝐞𝐧𝐭;\n' +
            'TEL;type=CELL;type=VOICE;waid=254759000340:+254759000340\n' +
            'END:VCARD';

        zk.sendMessage(
            dest,
            {
                contacts: {
                    displayName: "𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 𝐎𝐰𝐧𝐞𝐫",
                    contacts: [{ vcard }],
                },
            },
            { quoted: ms }
        );
    }
});

zokou({ nomCom: "dev", categorie: "General", reaction: "💘" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;

    const devs = [
        { nom: "Ⴊl𐌀Ꮳk 𐌕𐌀ႲႲჄ", numero: "254759000340" },
        { nom: "𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃-𝐌𝐃 𝐃𝐞𝐯", numero: "254759000340" }
    ];

    let message = `╔════◇ *𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐑𝐒* ◇════╗\n\n`;
    message += `*🚀 𝐂𝐨𝐧𝐭𝐚𝐜𝐭 𝐨𝐮𝐫 𝐝𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐫𝐬 𝐟𝐨𝐫 𝐬𝐮𝐩𝐩𝐨𝐫𝐭:*\n\n`;
    
    for (const dev of devs) {
        message += `• *${dev.nom}*: https://wa.me/${dev.numero}\n`;
    }
    
    message += `\n╚════◇ *𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃* ◇════╝`;

    try {
        const lien = mybotpic();
        if (lien.match(/\.(mp4|gif)$/i)) {
            await zk.sendMessage(
                dest,
                { 
                    video: { url: lien }, 
                    caption: message 
                },
                { quoted: ms }
            );
        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
            await zk.sendMessage(
                dest,
                { 
                    image: { url: lien }, 
                    caption: message 
                },
                { quoted: ms }
            );
        } else {
            await repondre(message);
        }
    } catch (e) {
        console.error("❌ 𝐄𝐫𝐫𝐨𝐫:", e);
        repondre("❌ 𝐅𝐚𝐢𝐥𝐞𝐝 𝐭𝐨 𝐬𝐞𝐧𝐝 𝐝𝐞𝐯 𝐥𝐢𝐬𝐭. 𝐏𝐥𝐞𝐚𝐬𝐞 𝐭𝐫𝐲 𝐚𝐠𝐚𝐢𝐧.");
    }
});

zokou({ nomCom: "support", categorie: "General", reaction: "🔗" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre, auteurMessage } = commandeOptions; 

    const supportMessage = `
╔════◇ *𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 𝐒𝐔𝐏𝐏𝐎𝐑𝐓* ◇════╗

*🌟 𝐓𝐡𝐚𝐧𝐤 𝐲𝐨𝐮 𝐟𝐨𝐫 𝐜𝐡𝐨𝐨𝐬𝐢𝐧𝐠 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃!*

*📢 𝐂𝐡𝐚𝐧𝐧𝐞𝐥:*
https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10

*👥 𝐒𝐮𝐩𝐩𝐨𝐫𝐭 𝐆𝐫𝐨𝐮𝐩:*
https://chat.whatsapp.com/JLVDDZLpcsk2byRMDWf0IR

*🎥 𝐘𝐨𝐮𝐓𝐮𝐛𝐞:*
https://youtube.com/@blacktappy?si=NjPSKshmC7SLil4-

╚════◇ *𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ* ◇════╝
    `;

    await repondre(supportMessage);
    await zk.sendMessage(
        auteurMessage,
        {
            text: `*📩 𝐒𝐮𝐩𝐩𝐨𝐫𝐭 𝐥𝐢𝐧𝐤𝐬 𝐬𝐞𝐧𝐭 𝐭𝐨 𝐲𝐨𝐮𝐫 𝐃𝐌!*\n\n𝐏𝐥𝐞𝐚𝐬𝐞 𝐣𝐨𝐢𝐧 𝐨𝐮𝐫 𝐜𝐨𝐦𝐦𝐮𝐧𝐢𝐭𝐲 𝐟𝐨𝐫 𝐮𝐩𝐝𝐚𝐭𝐞𝐬 𝐚𝐧𝐝 𝐬𝐮𝐩𝐩𝐨𝐫𝐭.`
        },
        { quoted: ms }
    );
});