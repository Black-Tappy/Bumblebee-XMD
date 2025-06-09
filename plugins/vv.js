const { zokou } = require("../framework/zokou");
const { downloadMediaMessage } = require('@whiskeysockets/baileys');

zokou(
  {
    nomCom: "vv",
    categorie: "General",
    reaction: "🎀",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, msgRepondu, repondre, nomAuteurMessage } = commandeOptions;

    try {
      if (!msgRepondu) {
        return repondre(`reply to a media message (image, video, or audio) first! 😡`);
      }

      // Extract the message content
      let msg = msgRepondu.message;

      // Handle view-once message structures
      if (msg?.viewOnceMessage) {
        msg = msg.viewOnceMessage.message;
      } else if (msg?.viewOnceMessageV2) {
        msg = msg.viewOnceMessageV2.message;
      } else if (msg?.viewOnceMessageV2Extension) {
        msg = msg.viewOnceMessageV2Extension.message;
      }

      if (!msg) {
        console.log("DEBUG - Available keys in msgRepondu:", Object.keys(msgRepondu));
        console.log("DEBUG - Available keys in msgRepondu.message:", Object.keys(msgRepondu.message || {}));
        return repondre(`Gaddemit! ${nomAuteurMessage}, this message has no media! 😕 Reply to an image, video, or audio! 🤦‍♂️`);
      }

      // Determine the message type
      const messageType = Object.keys(msg)[0];
      if (!['imageMessage', 'videoMessage', 'audioMessage'].includes(messageType)) {
        console.log("DEBUG - Message type:", messageType);
        return repondre(`Ghoosh!  ${nomAuteurMessage}, that’s not a supported media type (image, video, or audio)! 😣`);
      }

      // Notify the user that media is being processed
      await repondre(`Wait a moment ${nomAuteurMessage}, Bumblebee-XMD is cracking open this media! 📦 Hold tight! 🔍`);

      // Download the media
      const buffer = await downloadMediaMessage(msgRepondu, 'buffer', {});
      if (!buffer) {
        return repondre(`Oops! ${nomAuteurMessage}, 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇 couldn’t download the media! 😓 Try again or check the message! 🚨`);
      }

      // Prepare media details
      const caption = msg[messageType].caption || `! Retrieved by Bumblebee-XMD`;
      const mediaOptions = {
        caption,
        footer: `Hey ${nomAuteurMessage}! I'm Bumblebee-XMD, created by Black-Tappy 😎`,
        ...(messageType === 'audioMessage' ? { mimetype: msg.audioMessage.mimetype || 'audio/ogg', ptt: true } : {}),
        ...(messageType === 'videoMessage' ? { mimetype: msg.videoMessage.mimetype || 'video/mp4' } : {}),
        ...(messageType === 'imageMessage' ? { mimetype: msg.imageMessage.mimetype || 'image/jpeg' } : {}),
      };

      // Send media back to the same chat
      await zk.sendMessage(
        dest,
        {
          [messageType.replace('Message', '').toLowerCase()]: buffer,
          ...mediaOptions,
        },
        { quoted: ms }
      );

      // Notify success
      await repondre(` Boom💥, ${nomAuteurMessage}! Bumblebee-XMD decrypted and dropped the media right here! 🗿🔥`);

    } catch (error) {
      console.error("Error in vv command:", error.stack);
      await repondre(`TOTAL BUST, ${nomAuteurMessage}! Bumblebee-XMD tripped while decrypting the media: ${error.message} 😡 Try again or flop! 😣`);
    }
  }
);