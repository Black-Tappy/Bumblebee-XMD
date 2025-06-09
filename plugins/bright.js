const util = require('util');
const { zokou } = require(__dirname + '/../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'bright',
    categorie: 'AI',
    reaction: '🤖',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      console.log('DEBUG - geminiai triggered:', { arg, nomAuteurMessage });

      if (!arg[0]) {
        return repondre(`What's Up ${nomAuteurMessage}, DON’T BE DUMB! Ask me something, like .geminiai What’s the vibe today? 😡`);
      }

      const query = arg.join(' ').trim();
      await repondre(`Hey 👋 ${nomAuteurMessage}, hitting up Bright AI with "${query}"! Let’s see what it spits out! 🔍`);

      const apiUrl = `https://api.giftedtech.web.id/api/ai/geminiaipro?apikey=gifted&q=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data.success || !data.result) {
        return repondre(`NO DICE, ${nomAuteurMessage}! Bright AI flopped on "${query}"! Try a better question! 😣`);
      }

      await zk.sendMessage(
        dest,
        {
          text: `BOOM, ${nomAuteurMessage}! Bright AI says: "${data.result.trim()}" 🔥\n Powered by Black-Tappy`,
          footer: `Hey ${nomAuteurMessage}! I'm Bright AI, created by Black-Tappy 😎`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('Bright AI error:', e);
      await repondre(`TOTAL CRASH, ${nomAuteurMessage}! Something blew up: ${e.message} 😡 Fix it or flop! 😣`);
    }
  }
);