const { cmd, commands } = require("../command");
const axios = require("axios");

cmd({
    pattern: "img",
    alias: ["image"],
    react: "🚀",
    desc: "Search and download high-quality wallpapers using the new API.",
    category: "fun",
    use: ".img <keywords>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("*Please provide a search query.*");
        }

        await reply(`*🔍 Fetching Images For:* ${query}...`);

        const url = `https://sarkar-shaban.koyeb.app/download/wallpaper?text=${encodeURIComponent(query)}&page=1`;
        const response = await axios.get(url);

        // Validate response
        if (!response.data || !response.data.result || response.data.result.length === 0) {
            return reply("*No results found. Please try another keyword.*");
        }

        const results = response.data.result;

        // Loop through results and send images
        for (let i = 0; i < results.length; i++) {
            const item = results[i];

            if (item.image && item.image.length > 0) {
                const imageUrl = item.image[0]; // Sending the first (highest quality) image
                await conn.sendMessage(
                    from,
                    {
                        image: { url: imageUrl },
                        caption: `*🔹 Type:* ${item.type}\n*🌐 Source:* [Visit Website](${item.source})\n\n> *By SHADOW XMD*`
                    },
                    { quoted: mek }
                );
            }
        }
    } catch (error) {
        console.error(error);
        reply("*❌ An error occurred while processing your request. Please try again later.*");
    }
});
