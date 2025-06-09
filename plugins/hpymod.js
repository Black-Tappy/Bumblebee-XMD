const { zokou } = require("../framework/zokou");
const axios = require('axios');

zokou(
  {
    nomCom: "happymod",
    categorie: "General",
    reaction: "📱",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      // Default query to "Whatsapp" if no argument is provided
      const query = arg.join(" ") || "Whatsapp";

      // Notify the user that the search is in progress
      await repondre(`Hey 👋${nomAuteurMessage}, Bumblebee-XMD hunting for "${query}" on HappyMod! 📱 Hold tight! 🔍`);

      // Fetch data from the HappyMod API
      const apiUrl = `https://api.giftedtech.web.id/api/search/happymod?apikey=gifted&query=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      // Check if the API response is successful
      if (!data.success || !data.results?.data?.length) {
        return repondre(`Hey 👋${nomAuteurMessage}, Bumblebee-XMD found zilch for "${query}" on HappyMod! 😕 Try another search term! 🤔`);
      }

      // Extract and limit results to 10 for brevity
      const results = data.results.data.slice(0, 10);
      let resultText = results
        .map((app, index) => `│❒ *${index + 1}. ${app.name}*\n│   *Version*: ${app.version}\n│   *URL*: ${app.url}`)
        .join("\n\n");

      // Prepare the response message
      const responseMsg = `Wait a moment! ${nomAuteurMessage}, 𝔗𝔬𝔵𝔦𝔠 𝔐𝔇 snagged some HappyMod apps for "${query}"! 📱🔥
${resultText}\n> Powered by Black-Tappt
      `;

      // Send the response
      await zk.sendMessage(
        dest,
        {
          text: responseMsg,
          footer: `Hey ${nomAuteurMessage}! I'm Bumblebee-XMD, created by Black-Tappy 😎`,
        },
        { quoted: ms }
      );

    } catch (error) {
      console.error("Error in happymod command:", error.stack);
      await repondre(`TOTAL BUST, ${nomAuteurMessage}! Bumblebee-XMD tripped while searching HappyMod: ${error.message} 😡 Try again or flop! 😣`);
    }
  }
);