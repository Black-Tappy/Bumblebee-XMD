const { zokou } = require('../framework/zokou');
const { default: axios } = require('axios');

// State to enable/disable the bot
let isBotActive = false;

// Command to turn the bot ON
zokou({ nomCom: "bot on", reaction: "✅", categorie: "Control" }, (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  if (isBotActive) {
    return repondre("The bot is already active!");
  }

  isBotActive = true;
  repondre("✅ Bumblebee-XMD is now active.");
});

// Command to turn the bot OFF
zokou({ nomCom: "bot off", reaction: "❌", categorie: "Control" }, (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  if (!isBotActive) {
    return repondre("The bot is already inactive!");
  }

  isBotActive = false;
  repondre("❌ Bumblebee-XMD is now inactive.");
});

// Main handler for all incoming messages
zokou({ reaction: "🤔", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  try {
    // If the bot is inactive, ignore all inputs
    if (!isBotActive) {
      return; // Ignore messages silently
    }

    // Immediate response to keywords
    const keywords = ["beet", "chatbot", "bot", "gpt", "ai", "chat"];
    if (arg.some(word => keywords.includes(word.toLowerCase()))) {
      return repondre("I am Bumblebee-XMD, how can I help you?");
    }

    // If no arguments are provided, prompt the user
    if (!arg || arg.length === 0) {
      return repondre("I'm here! Feel free to ask me anything.");
    }

    // Combine all arguments into a single query
    const question = arg.join(' ');

    // Fetching the response from the external API
    const response = await axios.get(
      `https://apis.ibrahimadams.us.kg/api/ai/gpt4?q=${encodeURIComponent(question)}&apikey=ibraah-tech`
    );

    const data = response.data;
    if (data) {
      repondre(data.result);
    } else {
      repondre("I couldn't process your request. Try again!");
    }
  } catch (error) {
    console.error('Error:', error.message || 'An error occurred');
    repondre("Oops, something went wrong while processing your request.");
  }
});
