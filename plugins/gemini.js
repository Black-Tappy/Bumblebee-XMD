const { zokou } = require("../framework/zokou");
const axios = require("axios");

// 𝐀𝐈 𝐌𝐨𝐝𝐮𝐥𝐞
// 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧

zokou(
  {
    nomCom: "gemini",
    categorie: "AI",
    reaction: "🧠",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms, arg, prefixe } = commandeOptions;

    console.log("Command triggered: .gemini");

    // Check for query
    if (!arg || arg.length === 0) {
      console.log("No query provided");
      return repondre(
        `Hey👋, ${ms.pushName || "User"}! 😡 No query? Stop wasting my time! 📝\n│ Example: ${prefixe}gemini Hello, which model are you?`
      );
    }

    const query = arg.join(" ");
    console.log("Query:", query);

    try {
      repondre(`Generating response from Gemini... 😈`);
      console.log("Fetching from API...");

      // Fetch response from API
      const url = `https://api.giftedtech.web.id/api/ai/geminiai?apikey=gifted&q=${encodeURIComponent(query)}`;
      console.log("API URL:", url);
      const response = await axios.get(url);
      console.log("API Response Status:", response.status);

      if (response.status !== 200) {
        const errorText = response.data.error || "Unknown error";
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = response.data;
      console.log("API Data:", data);

      if (data && data.success && data.result) {
        const res = data.result;
        await repondre(
           `🔎 Query: ${query}\n💬 Response: ${res}\n 🟢 BOOM! 😈 Answered like a boss! 💪\n🔗 Powered by Black-Tappy`
        );
      } else {
        console.log("Invalid API response structure");
        repondre(
          `This is Garbage, ${ms.pushName || "User"}! 😤 Invalid response from API! 🚫`
        );
      }
    } catch (error) {
      console.error("Error with Gemini API:", error);
      repondre(
        `This sucks!, ${ms.pushName || "User"}! 😤 Failed: ${error.message}! 🚫`
      );
    }
  }
);
