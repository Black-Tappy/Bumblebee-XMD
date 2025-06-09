const { zokou } = require('../framework/zokou');

zokou({ nomCom: "btest", categorie: "General", reaction: "🛠️" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe } = commandeOptions;

  console.log(`[DEBUG] btest triggered by ${ms.key.participant || ms.key.remoteJid} in ${dest}`);

  
  const userName = ms.pushName || "Tester";

  
  if (!verifGroupe) {
    console.log(`[DEBUG] btest: Not a group chat`);
    repondre(`Hey, ${userName}! 😡 This command works better in groups, but fine, let’s test these buttons! 🚀`);
  }

  // Prepare button message
  const buttonMessage = {
    contentText: `Welcome, ${userName}! 😎 Time to test the ultimate power of Bumblebee-XMD!. Pick a button and unleash the chaos! 💥`,
    footerText: "Bumblebee-XMD Testing Mode",
    buttons: [
      {
        buttonId: `ping_${ms.key.id}`,
        buttonText: { displayText: "⚡ Ping" },
        type: 1
      },
      {
        buttonId: `owner_${ms.key.id}`,
        buttonText: { displayText: "👑 Owner" },
        type: 1
      }
    ],
    headerType: 1,
viewOnce: true,
  };

  console.log(`[DEBUG] btest: Button message prepared:`, JSON.stringify(buttonMessage, null, 2));

  try {
    // Send button message
    await zk.sendMessage(dest, buttonMessage, ms);
    console.log(`[DEBUG] btest: Button message sent successfully`);
  } catch (e) {
    console.log(`[DEBUG] btest: Error sending button message: ${e.message}`);
   
    await repondre(`Ooh no! This is infrustrating, ${userName}! 😤 Buttons failed: ${e.message}!│ Try these instead: .ping ⚡ or .owner 👑`);
  }
});