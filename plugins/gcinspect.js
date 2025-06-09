const { zokou } = require("../framework/zokou");

// 𝐔𝐭𝐢𝐥𝐢𝐭𝐢𝐞𝐬 𝐌𝐨𝐝𝐮𝐥𝐞
// 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧

const linkRegex = /chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i;

zokou(
  {
    nomCom: "inspect",
    categorie: "Utilities",
    reaction: "🔍",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg, prefixe } = commandeOptions;

    // Check for link
    if (!arg || arg.length === 0) {
      return repondre(
        `𝐄𝐱𝐚𝐦𝐩𝐥𝐞: ${prefixe}inspect <chat.whatsappp.com/link>\n\nPlease probide a Whatsapp link to inspect!`
      );
    }

    const text = arg.join(" ");
    const [, code] = text.match(linkRegex) || [];
    if (!code) {
      return repondre(`Invalid link! Please provide a valid Whatsapp Link`);
    }

    try {
      repondre(`Inspecting group information ...`);

      // Fetch group info (assuming Zokou supports this; adjust if needed)
      const res = await zk.groupGetInviteInfo(code); // Hypothetical Zokou method
      if (!res) throw new Error("Failed to fetch group info");

      // Format group details
      const caption = `
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
  🔍 𝐆𝐫𝐨𝐮𝐩 𝐋𝐢𝐧𝐤 𝐈𝐧𝐬𝐩𝐞𝐜𝐭𝐨𝐫 ⚡️
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
${res.id}
▒▒▒▒*𝐓𝐢𝐭𝐥𝐞:* ${res.subject}
▒▒▒▒*𝐂𝐫𝐞𝐚𝐭𝐞𝐝* 𝐛𝐲 @${res.id.split('-')[0]} 𝐨𝐧 *${formatDate(res.creation * 1000)}*${res.subjectOwner ? `
▒▒▒▒*𝐓𝐢𝐭𝐥𝐞 𝐜𝐡𝐚𝐧𝐠𝐞𝐝* 𝐛𝐲 @${res.subjectOwner.split`@`[0]} 𝐨𝐧 *${formatDate(res.subjectTime * 1000)}*` : ""}${res.descOwner ? `
▒▒▒▒*𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧 𝐜𝐡𝐚𝐧𝐠𝐞𝐞𝐝* 𝐛𝐲 @${res.descOwner.split`@`[0]} 𝐨𝐧 *${formatDate(res.descTime * 1000)}*` : ""}
▒▒▒▒*𝐌𝐞𝐦𝐛𝐞𝐫 𝐂𝐨𝐮𝐧𝐭:* ${res.size}
▒▒▒▒*𝐊𝐧𝐨𝐰𝐧 𝐌𝐞𝐦𝐛𝐞𝐫'𝐬 𝐉𝐨𝐢𝐧𝐞𝐝*: ${res.participants ? "\n" + res.participants.map((user, i) => `${++i}. @${user.id.split`@`[0]}`).join("\n").trim() : "𝐍𝐨𝐧𝐞"}
${res.desc ? `*𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧:*\n${res.desc}` : "*𝐍𝐨 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧*"}

▒▒▒▒*𝐉𝐒𝐎𝐍 𝐕𝐞𝐫𝐬𝐢𝐨𝐧*
\`\`\`${JSON.stringify(res, null, 1)}\`\`\`

▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
`.trim();

      // Attempt to fetch profile picture
      let pp;
      try {
        pp = await zk.profilePictureUrl(res.id, "image"); // Zokou/Baileys method
        if (pp) {
          await zk.sendMessage(
            dest,
            { image: { url: pp }, caption: "𝐆𝐫𝐨𝐮𝐩 𝐏𝐫𝐨𝐟𝐢𝐥𝐞 𝐏𝐢𝐜𝐭𝐮𝐫𝐞" },
            { quoted: ms }
          );
        }
      } catch (e) {
        console.error("Error fetching profile picture:", e);
      }

      // Send group info
      await zk.sendMessage(
        dest,
        { text: caption },
        {
          quoted: ms,
          contextInfo: { mentionedJid: parseMention(caption) },
        }
      );
    } catch (error) {
      console.error("Error inspecting group link:", error);
      repondre(
        `Error inspecting group link: ${error.message}\n\nPlease provide a valid link and try again later!`
      );
    }
  }
);

module.exports = { zokou };

// Helper function to parse mentions
function parseMention(text) {
  return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map((v) => v[1] + "@s.whatsapp.net");
}

// Format date function (English)
function formatDate(n, locale = "en") {
  let d = new Date(n);
  return d.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
}