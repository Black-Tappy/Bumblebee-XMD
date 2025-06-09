const { zokou } = require("../framework/zokou");

// 𝐔𝐭𝐢𝐥𝐢𝐭𝐢𝐞𝐻 𝐌𝐨𝐝𝐮𝐥𝐞
// 𝐏�(o𝐰𝐞𝐫�(e𝐝 𝐛𝐲 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧

// Store bot message keys for the current chat
let botMessages = {};

zokou(
  {
    nomCom: "clear",
    categorie: "Utilities",
    reaction: "⚡",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;

    // Initialize message tracking for this chat if not already
    if (!botMessages[dest]) {
      botMessages[dest] = [];
    }

    try {
      // Send initial message and store its key
      const message = await zk.sendMessage(
        dest,
        { text: "Clearing bot message in the chat..." },
        { quoted: ms }
      );
      botMessages[dest].push(message.key);

      // Delete all tracked bot messages in this chat
      let deletedCount = 0;
      for (const key of botMessages[dest]) {
        try {
          await zk.sendMessage(dest, { delete: key });
          deletedCount++;
          // Small delay to avoid rate limits
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (e) {
          console.error("Failed to delete message:", e);
        }
      }

      // Clear the tracked messages after deletion
      botMessages[dest] = [];

      // Send confirmation (won't be tracked to avoid infinite loop)
      await zk.sendMessage(
        dest,
        {
          text: `Succefully cleared ${deletedCount} bot message${deletedCount}!`,
        },
        { quoted: ms }
      );
    } catch (error) {
      console.error("Error clearing messages:", error);
      repondre(
        `Am wrror occured while clearing the chat...: ${error.message}`
      );
    }
  }
);

module.exports = { zokou };