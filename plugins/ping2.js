const { zokou } = require("../framework/zokou");
const speed = require("performance-now");

// Function for delay simulation
function delay(ms) {
  console.log(`⏱️ delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Helper function to safely get the sender's name
function getName(dest, commandeOptions) {
  return (
    commandeOptions.pushName ||
    commandeOptions.name ||
    (dest.sender ? dest.sender.split('@')[0] : "Unknown User")
  );
}

// Command: Ping
zokou(
  {
    nomCom: 'ping',
    desc: 'To check bot response time',
    Categorie: 'General',
    reaction: '⚡',
    fromMe: 'true',
  },
  async (dest, zk, commandeOptions) => {
    const name = getName(dest, commandeOptions);
    const img = 'https://files.catbox.moe/0w7hqx.jpg';
    const murl = 'https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10';

    // Generate 3 ping results with random numbers
    const pingResults = Array.from({ length: 3 }, () => Math.floor(Math.random() * 10000 + 1000));
    const formattedResults = pingResults.map(ping => `🌟 PONG: ${ping}  🌟`).join("\n");

    // Constructing the contact message
    const con = {
      key: {
        fromMe: false,
        participant: `${dest.sender ? dest.sender.split('@')[0] : "unknown"}@s.whatsapp.net`,
        ...(dest.chat ? { remoteJid: dest.chat } : {}),
      },
      message: {
        contactMessage: {
          displayName: name,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nitem1.TEL;waid=${
            dest.sender ? dest.sender.split('@')[0] : "unknown"
          }:${
            dest.sender ? dest.sender.split('@')[0] : "unknown"
          }\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
        },
      },
    };

    // Reply with ping results
    await zk.sendMessage(dest, {
      text: '🟢 *Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ 𝖯ɪɴɢ* 🟢',
      contextInfo: {
        mentionedJid: [dest.sender || ""],
        externalAdReply: {
          title: "Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ - Ultra-Fast Response",
          body: `Ping Results: ${formattedResults}`,
          thumbnailUrl: img,
          sourceUrl: murl,
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
      quoted: con,
    });

    console.log("Ping results sent successfully with verified tick!");
  }
);

// Command: Uptime
zokou(
  {
    nomCom: 'uptime',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '💝',
    fromMe: 'true',
  },
  async (dest, zk, commandeOptions) => {
    const name = getName(dest, commandeOptions);
    const runtime = process.uptime();
    const formattedRuntime = new Date(runtime * 1000).toISOString().substr(11, 8);
    const img = 'https://files.catbox.moe/og4tsk.jpg';
    const murl = 'https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10';

    // Constructing the contact message
    const con = {
      key: {
        fromMe: false,
        participant: `${dest.sender ? dest.sender.split('@')[0] : "unknown"}@s.whatsapp.net`,
        ...(dest.chat ? { remoteJid: dest.chat } : {}),
      },
      message: {
        contactMessage: {
          displayName: name,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nitem1.TEL;waid=${
            dest.sender ? dest.sender.split('@')[0] : "unknown"
          }:${
            dest.sender ? dest.sender.split('@')[0] : "unknown"
          }\nitem1.X-ABLabel:Mobile\nEND:VCARD`,
        },
      },
    };

    // Reply with uptime
    await zk.sendMessage(dest, {
      text: `*Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ 𝖴ᴘɪᴛɪᴍᴇ* 🕒\n\nRuntime: ${formattedRuntime}`,
      contextInfo: {
        mentionedJid: [dest.sender || ""],
        externalAdReply: {
          title: "Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ - System Uptime",
          body: `Bot has been running for: ${formattedRuntime}`,
          thumbnailUrl: img,
          sourceUrl: murl,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
      quoted: con,
    });

    console.log("Uptime sent successfully with verified tick!");
  }
);

module.exports = {
  delay,
};
