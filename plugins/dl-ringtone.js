import axios from 'axios';
import config from '../config.cjs';

const ringtone = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const args = m.body.slice(prefix.length + cmd.length).trim().split(/\s+/).filter(Boolean);
  const query = args.join(" ");

  if (!['ringtone', 'ringtones', 'ring'].includes(cmd)) return;

  if (!query) {
    return Matrix.sendMessage(m.from, { text: "❌ Please provide a search query!\nExample: *.ringtone Suna*" }, { quoted: m });
  }

  await m.React('🎵');
  await Matrix.sendMessage(m.from, { text: `🎵 Searching ringtone for: *${query}*...` }, { quoted: m });

  try {
    const { data } = await axios.get(`https://www.dark-yasiya-api.site/download/ringtone?text=${encodeURIComponent(query)}`);

    if (!data.status || !data.result || data.result.length === 0) {
      return Matrix.sendMessage(m.from, { text: "❌ No ringtones found for your query. Please try a different keyword." }, { quoted: m });
    }

    const randomRingtone = data.result[Math.floor(Math.random() * data.result.length)];

    await Matrix.sendMessage(m.from, {
      audio: { url: randomRingtone.dl_link },
      mimetype: "audio/mpeg",
      fileName: `${randomRingtone.title}.mp3`,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363290715861418@newsletter',
          newsletterName: "Ⴊl𐌀Ꮳk𐌕𐌀ႲႲჄ",
          serverMessageId: 143
        }
      }
    }, { quoted: m });

  } catch (error) {
    console.error("Error in ringtone command:", error);
    Matrix.sendMessage(m.from, { text: "❌ Something went wrong while fetching the ringtone. Please try again later." }, { quoted: m });
  }
};

export default ringtone;
