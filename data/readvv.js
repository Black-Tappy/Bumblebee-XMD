import baileys from '@whiskeysockets/baileys';
const { downloadMediaMessage } = baileys;
import config from '../config.cjs';

const OwnerCmd = async (m, Matrix) => {
  const botNumberJid = Matrix.user.id.split(':')[0] + '@s.whatsapp.net';
  const ownerJid = config.OWNER_NUMBER + "@s.whatsapp.net";
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : '';
  const isOwner = m.sender === ownerJid;
  const isBot = m.sender === botNumberJid;

  if (!['vv', "vv2", 'vv3'].includes(cmd)) {
    return;
  }

  if (!m.quoted) {
    return m.reply("⚠️ *Reply to a View Once message!*");
  }

  let viewOnceMessage = m.quoted.message;
  if (viewOnceMessage.viewOnceMessageV2) {
    viewOnceMessage = viewOnceMessage.viewOnceMessageV2.message;
  } else if (viewOnceMessage.viewOnceMessage) {
    viewOnceMessage = viewOnceMessage.viewOnceMessage.message;
  }

  if (!viewOnceMessage) {
    return m.reply("*This is not a View Once message!*");
  }

  if (["vv2", "vv3"].includes(cmd) && !isOwner && !isBot) {
    return m.reply("*Only the owner or bot can use this command!*");
  }

  if (cmd === 'vv' && !isOwner && !isBot) {
    return m.reply("*Only the owner or bot can use this command to send media!*");
  }

  try {
    const mediaType = Object.keys(viewOnceMessage)[0];
    let mediaBuffer;

    if (mediaType === "audioMessage") {
      mediaBuffer = await downloadMediaMessage(m.quoted, "buffer", {}, {
        'type': "audio"
      });
    } else {
      mediaBuffer = await downloadMediaMessage(m.quoted, "buffer");
    }

    if (!mediaBuffer) {
      return m.reply("*Failed to retrieve media!*");
    }

    let mimeType = viewOnceMessage.audioMessage?.['mimetype'] || 'audio/ogg';
    let recipient;

    switch (cmd) {
      case 'vv':
        recipient = m.from;
        break;
      case 'vv2':
        recipient = botNumberJid;
        break;
      case 'vv3':
        recipient = ownerJid;
        break;
    }

    if (mediaType === "imageMessage") {
      await Matrix.sendMessage(recipient, {
        'image': mediaBuffer,
        'caption': "> *© Powered By Bᴜᴍʙʟᴇʙᴇᴇ-XᴍD 💸*"
      });
    } else if (mediaType === "videoMessage") {
      await Matrix.sendMessage(recipient, {
        'video': mediaBuffer,
        'caption': "> *© Powered By Bᴜᴍʙʟᴇʙᴇᴇ-XᴍD 💸*",
        'mimetype': "video/mp4"
      });
    } else if (mediaType === "audioMessage") {
      await Matrix.sendMessage(recipient, {
        'audio': mediaBuffer,
        'mimetype': mimeType,
        'ptt': true
      });
    } else {
      return m.reply("*Unsupported media type!*");
    }
  } catch (error) {
    console.error(error);
    await m.reply("*Failed to process View Once message!*");
  }
};

export default OwnerCmd;
