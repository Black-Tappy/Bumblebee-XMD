const { zokou } = require('../framework/zokou');
const s = require('../set');

zokou(
  {
    nomCom: "setvar",
    categorie: "Heroku",
    reaction: "⚙️",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, superUser, arg } = commandeOptions;

    try {
      console.log('DEBUG - setvar triggered:', { arg, superUser });

      if (!superUser) {
        return repondre(`Back Off! Only mods can touch this command, Motherfucker! 😡`);
      }

      if (!arg[0] || !arg.join(' ').includes('=')) {
        return repondre(`Wrong input! Format it right, like: .setvar OWNER_NAME=Black-Tappy 😤`);
      }

      const text = arg.join(' ').trim();
      const [key, value] = text.split('=').map(str => str.trim());

      if (!key || !value) {
        return repondre(`Stop fumbling!! Provide a valid KEY=VALUE pair! 😣`);
      }

      if (!s.HEROKU_API_KEY || !s.HEROKU_APP_NAME) {
        return repondre(`CONFIG ERROR! HEROKU_API_KEY or HEROKU_APP_NAME missing in set.js! Fix it now! 😵`);
      }

      const Heroku = require("heroku-client");
      const heroku = new Heroku({ token: s.HEROKU_API_KEY });
      const baseURI = `/apps/${s.HEROKU_APP_NAME}`;

      await heroku.patch(`${baseURI}/config-vars`, {
        body: { [key]: value },
      });

      await repondre(`Boom 💥! Heroku var ${key} set to ${value}! Rebooting like a boss... 💪`);

    } catch (error) {
      console.error('setvar error:', error);
      await repondre(`EPIC FAIL! Something broke: ${error.message} 😡 Fix it or suffer!`);
    }
  }
);

zokou(
  {
    nomCom: "allvar",
    categorie: "Heroku",
    reaction: "📋",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, superUser } = commandeOptions;

    try {
      console.log('DEBUG - allvar triggered:', { superUser });

      if (!superUser) {
        return repondre(`Back Off! Only mods can touch this command, Motherfucker! 😡`);
      }

      if (!s.HEROKU_API_KEY || !s.HEROKU_APP_NAME) {
        return repondre(`CONFIG DISASTER! HEROKU_API_KEY or HEROKU_APP_NAME missing in set.js! Sort it out! 😣`);
      }

      const Heroku = require("heroku-client");
      const heroku = new Heroku({ token: s.HEROKU_API_KEY });
      const baseURI = `/apps/${s.HEROKU_APP_NAME}`;

      const vars = await heroku.get(`${baseURI}/config-vars`);
      let str = `Configure! Var\n\n◈━━━━━━━━━━━━━━━━◈\n`;
      for (const vr in vars) {
        str += `☣️ *${vr}* = ${vars[vr]}\n`;
      }
      str += `◈━━━━━━━━━━━━━━━━◈`;

      await repondre(str);

    } catch (error) {
      console.error('allvar error:', error);
      await repondre(`CRASH AND BURN! Error: ${error.message} 😡 Get it together!`);
    }
  }
);

zokou(
  {
    nomCom: "getvar",
    categorie: "Heroku",
    reaction: "🔍",
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, superUser, arg } = commandeOptions;

    try {
      console.log('DEBUG - getvar triggered:', { arg, superUser });

      if (!superUser) {
        return repondre(`Back Off! Only mods can touch this command, Motherfucker! 😡`);
      }

      if (!arg[0]) {
        return repondre(`DON'T BE LAZY! Give me a variable name in CAPS! 😡`);
      }

      const varName = arg.join(' ').trim().toUpperCase();

      if (!s.HEROKU_API_KEY || !s.HEROKU_APP_NAME) {
        return repondre(`CONFIG FAILURE! HEROKU_API_KEY or HEROKU_APP_NAME missing in set.js! Fix it! 😵`);
      }

      const Heroku = require("heroku-client");
      const heroku = new Heroku({ token: s.HEROKU_API_KEY });
      const baseURI = `/apps/${s.HEROKU_APP_NAME}`;

      const vars = await heroku.get(`${baseURI}/config-vars`);
      if (vars[varName]) {
        await repondre(`GOT IT! ${varName} = ${vars[varName]} 💥`);
      } else {
        await repondre(`NOPE! Variable ${varName} doesn't exist, try again! 😣`);
      }

    } catch (error) {
      console.error('getvar error:', error);
      await repondre(`TOTAL FAILURE! Error: ${error.message} 😡 Fix this mess!`);
    }
  }
);