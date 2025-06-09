const { zokou } = require("../framework/zokou");
const axios = require("axios"); // Replaced node-fetch with axios
// Ai Modeule
// Powered by Black-Tappy 

zokou(
  {
    nomCom: "gpt",
    categorie: "AI",
    reaction: "🤖",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg, prefixe } = commandeOptions;

    console.log("Command triggered: .gpt");

    // Check for query
    if (!arg || arg.length === 0) {
      console.log("No query provided");
      return repondre(
        `Example: ${prefixe}gpt hello\n\nPlease provide a query for gpt!!`
      );
    }

    const query = arg.join(" ");
    console.log("Query:", query);

    try {
      repondre(`Fetching response from gpt...`);
      console.log("Fetching from API...");

      // Fetch response from API
      const url = `https://api.giftedtech.web.id/api/ai/gpt4?apikey=gifted&q=${encodeURIComponent(query)}`;
      console.log("API URL:", url);
      const response = await axios.get(url); // Use axios instead of fetch
      console.log("API Response Status:", response.status);

      if (response.status !== 200) {
        const errorText = response.data.error || "Unknown error";
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = response.data; // axios uses .data instead of .json()
      console.log("API Data:", data);

      if (data && data.result) {
        const res = data.result;
        await repondre(
          `${res}\n\nPowered by Black-Tappy`
        );
      } else {
        console.log("Invalid API response structure");
        repondre(`Invalid response from API`);
      }
    } catch (error) {
      console.error("Error with GPT API:", error);
      repondre(
        `Something went wrong...\n\n${error.message}`
      );
    }
  }
);

module.exports = { zokou };