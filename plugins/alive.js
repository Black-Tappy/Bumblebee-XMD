const { zokou } = require('../framework/zokou');
const { addOrUpdateDataInAlive, getDataFromAlive } = require('../bdd/alive');
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou(
    {
        nomCom: 'alive2',
        categorie: 'General',
        reaction: "⚡"
    },
    async (dest, zk, { ms, arg, repondre, superUser }) => {
        const data = await getDataFromAlive();
        const time = moment().tz('Etc/GMT').format('HH:mm:ss');
        const date = moment().format('DD/MM/YYYY');
        const mode = (s.MODE.toLowerCase() === "yes") ? "public" : "private";

        if (!arg || !arg[0]) {
            let aliveMsg;

            if (data) {
                const { message, lien } = data;
                aliveMsg = `╭───〔 *🤖 BOT STATUS* 〕───◉
│✨ *Bot is Active & Online!*
│
│🧠 *Owner:* ${s.OWNER_NAME}
│🌐 *Mode:* [${mode}]
│⚡ *Version:* 4.0.0
│📅 *Date*: ${date}
│⏰ *Time (GMT)*: ${time}
│💬 *Message*: ${message}
│⌛ *Uptime:* Alive and Active
╰────────────────────◉`;
                try {
                    if (lien) {
                        if (lien.match(/\.(mp4|gif)$/i)) {
                            await zk.sendMessage(dest, { 
                                video: { url: lien }, 
                                caption: aliveMsg 
                            }, { quoted: ms });
                        } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
                            await zk.sendMessage(dest, { 
                                image: { url: lien }, 
                                caption: aliveMsg 
                            }, { quoted: ms });
                        } else {
                            repondre(aliveMsg);
                        }
                    } else {
                        repondre(aliveMsg);
                    }
                } catch (e) {
                    console.error("Error:", e);
                    repondre(`Oooh No!! Bumblebee-XMD failed to show off: ${e.message} 🥲 Try again! 😣`);
                }
            } else {
                aliveMsg = `╭───〔 *🤖 BOT STATUS* 〕───◉
│✨ *Bot is Active & Online!*
│
│🧠 *Owner:* ${s.OWNER_NAME}
│🌐 *Mode:* [${mode}]
│⚡ *Version:* 4.0.0
│📅 *Date*: ${date}
│⏰ *Time (GMT)*: ${time}
│💬 *Message*: ${message}
│⌛ *Uptime:* Alive and Active
╰────────────────────◉`;
                repondre(aliveMsg);
            }
        } else {
            if (!superUser) { 
                repondre(`🚫 Yooh!, only Black-Tappy can mess with the bot commands! 💀`); 
                return;
            }

            const [texte, tlien] = arg.join(' ').split(';');
            await addOrUpdateDataInAlive(texte, tlien);
            repondre(`✅ alive message updated! Successful! 🔥`);
        }
    }
);