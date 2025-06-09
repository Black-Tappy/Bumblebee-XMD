const util = require('util');
const { zokou } = require(__dirname + '/../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'fancy',
    categorie: 'Tools',
    reaction: '✨',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      console.log('DEBUG - fancy triggered:', { arg, nomAuteurMessage });

      if (!arg[0]) {
        return repondre(`Get it right! ${nomAuteurMessage}, DON’T BE BLAND! Give me some text, like .fancy bumblebee! 😡`);
      }

      const text = arg.join(' ').trim();
      await repondre(`Flopping ${nomAuteurMessage} and jazzing up "${text}" like a pro! 🔍`);

      const apiUrl = `https://api.giftedtech.web.id/api/tools/fancy?apikey=gifted&text=${encodeURIComponent(text)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data.success || !data.results || data.results.length === 0) {
        return repondre(`OOPS, ${nomAuteurMessage}! No fancy styles for "${text}"! Try something cooler! 😣`);
      }

      // Pick a random stylized text
      const fancyText = data.results[Math.floor(Math.random() * data.results.length)].result;

      await zk.sendMessage(
        dest,
        {
          text: `Great!, ${nomAuteurMessage}! Your text’s now a masterpiece! 🔥\n Fancy Text: ${fancyText}`,
          footer: `Hey ${nomAuteurMessage}! I'm Bumblebee-XMD, created by Black-Tappy 😎`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('Fancy text error:', e);
      await repondre(`TOTAL FLOP, ${nomAuteurMessage}! Something crashed: ${e.message} 😡 Fix it or bounce! 😣`);
    }
  }
);