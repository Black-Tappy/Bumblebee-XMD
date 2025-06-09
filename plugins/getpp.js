const { zokou } = require("../framework/zokou");

zokou(
  {
    nomCom: "getpp",
    categorie: "General",
    reaction: "📷",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, msgRepondu, auteurMsgRepondu, mybotpic, nomAuteurMessage } = commandeOptions;

    // Check if the message is a reply
    if (!msgRepondu) {
      return repondre(`Just! ${nomAuteurMessage}, reply to someone’s message to snag their profile pic! 😡 As Easy like that! 🤔`);
    }

    try {
      // Notify the user that the profile picture is being fetched
      await repondre(`Chill! ${nomAuteurMessage}, Bumblebee-XMD is hunting for @${auteurMsgRepondu.split("@")[0]}’s profile pic! 📸 Hold tight! 🔍`, { mentions: [auteurMsgRepondu] });

      // Fetch the profile picture of the replied person
      let ppuser;
      try {
        ppuser = await zk.profilePictureUrl(auteurMsgRepondu, 'image');
      } catch {
        ppuser = mybotpic();
        await repondre(`Totally Busted 💀 ${nomAuteurMessage}, @${auteurMsgRepondu.split("@")[0]}’s profile pic is locked tight! 😣 Bumblebee-XMD got you my pic instead! 😎`, { mentions: [auteurMsgRepondu] });
      }

      // Send the profile picture
      await zk.sendMessage(
        dest,
        {
          image: { url: ppuser },
          caption: `Boom💥, ${nomAuteurMessage}! Snagged @${auteurMsgRepondu.split("@")[0]}’s profile pic! 🔥\n🛠️ Powered by Black-Tappy`,
          footer: `Hey ${nomAuteurMessage}! I'm Bumblebee-XMD, created by Black-Tappy 😎`,
          mentions: [auteurMsgRepondu],
        },
        { quoted: ms }
      );

    } catch (error) {
      console.error("Error in .getpp command:", error);
      await repondre(`Totally Butsed, ${nomAuteurMessage}! Bumblebee-XMD crashed while grabbing the pic: ${error.message} 😡 Try again or flop! 😣`);
    }
  }
);