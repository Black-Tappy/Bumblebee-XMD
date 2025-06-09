// imagine.js
const util = require('util');
const { zokou } = require(__dirname + '/../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'imagine',
    categorie: 'AI',
    reaction: '🖌️',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      console.log('DEBUG - imagine triggered:', { arg, nomAuteurMessage });

      if (!arg[0]) {
        return repondre(`DON’T BE A SLACKER! Give me a prompt, like .imagine Cute Cat! 😡`);
      }

      const prompt = arg.join(' ').trim();
      await repondre(`Hey 👋${nomAuteurMessage}, conjuring your "${prompt}" masterpiece! Hold tight! 🔍`);

      const apiUrl = `https://api.giftedtech.web.id/api/ai/imgsys?apikey=gifted&prompt=${encodeURIComponent(prompt)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data.success || !data.result || data.result.length === 0) {
        return repondre(`NO IMAGES, ${nomAuteurMessage}! Your "${prompt}" idea FLOPPED! Try something better! 😣`);
      }

      // Pick a random image URL from result
      const imageUrl = data.result[Math.floor(Math.random() * data.result.length)];

      await zk.sendMessage(
        dest,
        {
          image: { url: imageUrl },
          caption: `BOOM, ${nomAuteurMessage}! Your "${prompt}" image is PURE GOLD! 🔥\nPowered by Black-Tappy`,
          footer: `Hey ${nomAuteurMessage}! I'm Bumblebee-XMD, created by Black-Tappy 😎`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('Imagine error:', e);
      await repondre(`TOTAL FAILURE, ${nomAuteurMessage}! Something tanked: ${e.message} 😡 Get it together!`);
    }
  }
);