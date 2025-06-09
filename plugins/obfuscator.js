const util = require('util');
const { zokou } = require(__dirname + '/../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'obfuscate',
    categorie: 'Mods',
    reaction: '🔐',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      console.log('DEBUG - obfuscate triggered:', { arg, nomAuteurMessage });

      if (!arg[0]) {
        return repondre(`HEY ${nomAuteurMessage}, DON’T BE A NOOB! Give me some JavaScript code, like .obfuscate console.log('Hello World!')! 😡`);
      }

      const code = arg.join(' ').trim();
      await repondre(`Wait a moment ${nomAuteurMessage}, as i scramble your code into chaos! 🔍`);

      const apiUrl = `https://api.giftedtech.web.id/api/tools/encrypt?apikey=gifted&code=${encodeURIComponent(code)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data.success || !data.encrypted_code) {
        return repondre(`YIKES, ${nomAuteurMessage}! Obfuscation failed: ${data.error || 'No encrypted code'}! Try better code! 😣`);
      }

      // Truncate if too long for WhatsApp (4096 char limit)
      let obfuscatedCode = data.encrypted_code;
      if (obfuscatedCode.length > 4000) {
        obfuscatedCode = obfuscatedCode.slice(0, 4000) + '... [truncated]';
      }

      await zk.sendMessage(
        dest,
        {
          text: `BOOM💥, ${nomAuteurMessage}! Your code’s now a cryptic mess! 🔥\n> Obfuscated Code:\n${obfuscatedCode}\n> Powered by Black-Tappy`,
          footer: `Hey ${nomAuteurMessage}! I'm Bumblebee-XMD, created by Nlack-Tappy 😎`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('Obfuscate error:', e);
      await repondre(`TOTAL MELTDOWN, ${nomAuteurMessage}! Something broke: ${e.message} 😡 Fix it or scram!`);
    }
  }
);