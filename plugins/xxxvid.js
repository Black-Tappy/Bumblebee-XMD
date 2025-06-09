// xxxvideo.js
const util = require('util');
const { zokou } = require(__dirname + '/../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'xxxvideo',
    categorie: 'Adult',
    reaction: '🔞',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage, superUser } = commandeOptions;

    try {
      console.log('DEBUG - xxxvideo triggered:', { arg, nomAuteurMessage, superUser });

      if (!superUser) {
        return repondre(`BACK OFF, ${nomAuteurMessage}! Only mods can hit this command, punk! 😡`);
      }

      if (!arg[0]) {
        return repondre(`WAKE UP, ${nomAuteurMessage}! Give me a valid xnxx.health or xvideos.com URL! 😤`);
      }

      const videoUrl = arg.join(' ').trim();
      if (!videoUrl.match(/^(https:\/\/www\.xnxx\.health\/|https:\/\/www\.xvideos\.com\/)/)) {
        return repondre(`TRASH INPUT, ${nomAuteurMessage}! URL must be from xnxx.health or xvideos.com! 😣`);
      }

      await repondre(`Hang on ${nomAuteurMessage}, snagging your video link, don’t blink! 🔍`);

      // Try API 1 (xnxxdl)
      let data, downloadUrl, title;
      try {
        const apiUrl1 = `https://api.giftedtech.web.id/api/download/xnxxdl?apikey=gifted&url=${encodeURIComponent(videoUrl)}`;
        const response1 = await axios.get(apiUrl1);
        data = response1.data;

        if (data.success && data.result && data.result.files && data.result.files.high) {
          title = data.result.title;
          downloadUrl = data.result.files.high;
        } else {
          throw new Error('No valid download link from xnxxdl');
        }
      } catch (e1) {
        console.log('xnxxdl failed:', e1.message);

        // Try API 2 (xvideosdl) on failure
        try {
          const apiUrl2 = `https://api.giftedtech.web.id/api/download/xvideosdl?apikey=gifted&url=${encodeURIComponent(videoUrl)}`;
          const response2 = await axios.get(apiUrl2);
          data = response2.data;

          if (data.success && data.result && data.result.download_url) {
            title = data.result.title;
            downloadUrl = data.result.download_url;
          } else {
            throw new Error('No valid download link from xvideosdl');
          }
        } catch (e2) {
          console.error('xvideosdl failed:', e2);
          return repondre(`EPIC FLOP, ${nomAuteurMessage}! Both APIs bombed: ${e2.message} 😡 Try a better URL!`);
        }
      }

      await zk.sendMessage(
        dest,
        {
          text: `NAILED IT, ${nomAuteurMessage}! Your video is READY! 🔥\n👑 Title: ${title}\n📥 Download: ${downloadUrl}\n🎀 Powered by xh_clinton`,
          footer: `Hey ${nomAuteurMessage}! I'm Bumblebee-XMD, created by Black-Tappy 😎`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('xxxvideo error:', e);
      await repondre(`CRASH AND BURN, ${nomAuteurMessage}! Something broke: ${e.message} 😡 Fix it or scram!`);
    }
  }
);