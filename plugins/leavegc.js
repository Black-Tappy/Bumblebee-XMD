const { zokou } = require("../framework/zokou");

//Black-Tappy

zokou(
  {
    nomCom: "leave",
    categorie: "Group",
    reaction: "👋",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg, prefixe, isOwner } = commandeOptions;

    // Owner-only check for leaving all groups
    const ownerNumber = "254759000340@s.whatsapp.net";
    const sender = ms.key.participant || ms.key.remoteJid;

    // Handle .leaveall
    if (arg[0] === "all") {
      if (sender !== ownerNumber && !isOwner) {
        return repondre(
          `Owner Onky!\n\nThis command is restricted to the bot user(@${ownerNumber.split("@")[0]}).`
        );
      }

      try {
        repondre(`Bye Everyone! The bot is leaving this group....`);

        // Fetch all group chats
        const chats = await zk.chats;
        const groupChats = Object.values(chats).filter(
          (chat) => chat.id.endsWith("g.us") && !chat.readOnly
        );

        for (let i = 0; i < groupChats.length; i++) {
          await zk.sendMessage(
            groupChats[i].id,
            { text: "Bye Everyone! The bot is leaving all groups." },
            { quoted: ms }
          );
          await zk.groupLeave(groupChats[i].id);
          await delay(i * 2000); // 2-second delay between leaves
        }

        repondre(`Succes! Left all groups.`);
      } catch (error) {
        console.error("Error leaving all groups:", error);
        repondre(`Error leaving all groups: ${error.message}`);
      }
      return;
    }

    // Handle specific group JID
    if (arg.length > 0) {
      const groupJid = arg[0];
      if (!groupJid.endsWith("g.us")) {
        return repondre(
          `Invalid Group JID! Use a format like 123456@g.us`
        );
      }

      try {
        // Check if bot is in the group
        const chats = await zk.chats;
        const groupExists = Object.values(chats).some(
          (chat) => chat.id === groupJid
        );
        if (!groupExists) {
          return repondre(
            `Bot is not on that group (${groupJid})!`
          );
        }

        await zk.sendMessage(
          groupJid,
          { text: "Bye Everyone! The bot is leaving this group." },
          { quoted: ms }
        );
        await zk.groupLeave(groupJid);
        repondre(`Success! Left this group ${groupJid}.`);
      } catch (error) {
        console.error("Error leaving specific group:", error);
        repondre(`Error leaving group ${groupJid}: ${error.message}`);
      }
      return;
    }

    // Leave current group (default)
    if (!ms.key.remoteJid.endsWith("g.us")) {
      return repondre(
        `This command can only be used in groups!`
      );
    }

    try {
      await zk.sendMessage(
        dest,
        { text: "Bye Everyone! The bot is leaving this group." },
        { quoted: ms }
      );
      await zk.groupLeave(dest);
    } catch (error) {
      console.error("Error leaving current group:", error);
      repondre(
        `Error leaving the group: ${error.message}`
      );
    }
  }
);

module.exports = { zokou };

const delay = (time) => new Promise((res) => setTimeout(res, time));