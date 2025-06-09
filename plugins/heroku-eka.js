const { zokou } = require("../framework/zokou");
const Heroku = require('heroku-client');
const { execSync } = require('child_process');

const heroku = new Heroku({ token: process.env.HEROKU_API_KEY });
const appName = process.env.HEROKU_APP_NAME;
const BaseUrl = process.env.GITHUB_GIT;

// Command to clone the running Heroku app
zokou({
  nomCom: 'eka',
  categorie: "Control"
}, async (chatId, zk, context) => {
  const { repondre, superUser, arg } = context;

  // Ensure the command is executed by the bot owner
  if (!superUser) {
    return repondre("🚫 *Access Denied!* This command is restricted to the bot owner.");
  }

  // Validate input
  if (!arg[0] || !arg[0].includes('SESSION_ID=') || !arg[0].includes('NUMERO_OWNER=') || !arg[0].includes('herokuappname=')) {
    return repondre(
      "📋 *Usage Instructions:*\n\n" +
      "To create a new app:\n" +
      "`.eka SESSION_ID=value,NOMERO_OWNER=value,herokuappname=value`\n\n" +
      "Example:\n" +
      "`.eka SESSION_ID=abc123,NOMERO_OWNER=254759000340,herokuappname=newappname`"
    );
  }

  // Parse input arguments
  const args = arg[0].split(',');
  const sessionId = args.find(arg => arg.startsWith('SESSION_ID=')).split('=')[1];
  const numeroOwner = args.find(arg => arg.startsWith('NOMERO_OWNER=')).split('=')[1];
  const newAppName = args.find(arg => arg.startsWith('herokuappname=')).split('=')[1];

  try {
    // Step 1: Clone the GitHub repository of the current app
    const repoCloneUrl = BaseUrl; // Ensure BaseUrl has your GitHub repo URL
    const cloneCommand = `git clone ${repoCloneUrl} ${newAppName}`;
    execSync(cloneCommand);

    // Step 2: Create a new Heroku app
    const newApp = await heroku.post('/apps', {
      body: { name: newAppName }
    });

    // Step 3: Push the cloned app to the new Heroku app
    const pushCommands = `
      cd ${newAppName} &&
      git remote add heroku https://git.heroku.com/${newAppName}.git &&
      git push heroku main -f
    `;
    execSync(pushCommands, { stdio: 'inherit' });

    // Step 4: Update environment variables in the new app
    await heroku.patch(`/apps/${newAppName}/config-vars`, {
      body: {
        SESSION_ID: sessionId,
        NUMERO_OWNER: numeroOwner,
        HEROKU_APP_NAME: newAppName
      }
    });

    // Step 5: Restart dynos for the new app
    await heroku.delete(`/apps/${newAppName}/dynos`);

    // Success message
    await zk.sendMessage(chatId, {
      text: `🎉 *Heroku App Created Successfully!*\n\n` +
            `🔧 *App Name:* ${newAppName}\n` +
            `🔑 *SESSION_ID:* ${sessionId}\n` +
            `📞 *NUMERO_OWNER:* ${numeroOwner}\n\n` +
            `🌐 *GitHub Repo Pushed Successfully!*\n\n` +
            `🔄 *App Dynos Restarted.*\n` +
            `✅ *Ready to Use!*`
    });
  } catch (error) {
    console.error("Error during app creation or deployment:", error);
    await zk.sendMessage(chatId, {
      text: `⚠️ *Failed to create the new Heroku app!*\n\n` +
            `❌ *Error:* ${error.message}`
    });
  }
});
