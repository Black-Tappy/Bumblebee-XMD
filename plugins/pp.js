const { zokou } = require('../framework/zokou');
const s = require("../set");
const fs = require('fs');

zokou(
  {
    nomCom: 'pp',
    categorie: 'General',
    reaction: '📸'
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, msgRepondu, superUser, auteurMessage, idBot } = commandeOptions;

    // Identify the user and the bot's connected JID
    const userJid = auteurMessage; // The user sending the command
    const botJid = idBot; // The JID of the WhatsApp account hosting the bot
    const ownerNumber = s.OWNER_NUMBER || 'default_owner_number'; // Fallback if not set
    const isOwner = userJid === ownerNumber + '@s.whatsapp.net';
    const isConnectedUser = userJid === botJid; // Check if the user is the one hosting the bot

    // Restrict to the connected user (bot host) or owner
    if (!isConnectedUser && !isOwner && !superUser) {
      return repondre("Only owner can use the command!");
    }

    // Check if replying to a message and debug the structure
    if (!msgRepondu) {
      console.log("No replied message detected.");
      return repondre("Please reply with an image to set profile icture!");
    }

    console.log("DEBUG - msgRepondu structure:", JSON.stringify(msgRepondu, null, 2));

    // Broader check for image content
    const imageMessage = 
      msgRepondu.message?.imageMessage || 
      msgRepondu.message?.extendedTextMessage?.contextInfo?.quotedMessage?.imageMessage ||
      msgRepondu.imageMessage || null;

    if (!imageMessage) {
      console.log("No image found in replied message. Available keys:", Object.keys(msgRepondu.message || {}));
      return repondre("Reply to an image you want to set profile picture!");
    }

    try {
      // Download the image
      const mediaPath = await zk.downloadAndSaveMediaMessage(imageMessage);
      console.log("Image downloaded to:", mediaPath);

      // Update the connected user's profile picture
      await zk.updateProfilePicture(userJid, { url: mediaPath });
      console.log(`Profile picture updated for ${userJid}`);

      // Clean up the downloaded file
      fs.unlink(mediaPath, (err) => {
        if (err) console.error("Cleanup failed:", err);
        else console.log("Temporary file cleaned up.");
      });

      repondre("Your profile picture has been updated successful!");
    } catch (error) {
      console.error("Error updating profile picture:", error);
      repondre(`Failed to upload profile picture: ${error.message}`);
    }
  }
);