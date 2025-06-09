const util = require('util');
const { zokou } = require(__dirname + '/../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'github',
    categorie: 'Search',
    reaction: '📂',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      console.log('DEBUG - github triggered:', { arg, nomAuteurMessage });

      if (!arg[0]) {
        return repondre(`Hey👋 ${nomAuteurMessage}, DON’T SLACK OFF! Give me a GitHub username, like .github Black-Tappy!`);
      }

      const username = arg.join(' ').trim();
      await repondre(`Hey👋 ${nomAuteurMessage}, stalking "${username}" on GitHub like a pro! 🔍`);

      const apiUrl = `https://api.giftedtech.web.id/api/stalk/gitstalk?apikey=gifted&username=${encodeURIComponent(username)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data.success || !data.result) {
        return repondre(`Oooh No!, ${nomAuteurMessage}! Something’s busted with the API! Try again later! 😣`);
      }

      if (data.result.message === 'Not Found') {
        return repondre(`Ooh no!, ${nomAuteurMessage}! "${username}" doesn’t exist on GitHub! What a loser! 😤`);
      }

      // Assuming valid user data includes fields like login, bio, public_repos, etc.
      const user = data.result;
      const bio = user.bio || 'No bio';
      const repos = user.public_repos || 0;
      const followers = user.followers || 0;
      const following = user.following || 0;

      await zk.sendMessage(
        dest,
        {
          text: `Guess what!, ${nomAuteurMessage}! Got the dirt on "${username}"! 🔥\n👑 Username: ${user.login}\n🟢 Bio: ${bio}\n🛠️ Repos: ${repos}\n👤 Followers: ${followers}\n│🔎 Following: ${following}\n🎀 Powered by Black-Tappy`,
          footer: `Hey ${nomAuteurMessage}! I'm Bumblebee-XMD, created by Black-Tappy 😎`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('GitHub stalk error:', e);
      await repondre(`Lost in the shadows, ${nomAuteurMessage}! fetch: ${e.message} 😡 or get lost!`);
    }
  }
);