const { cmd } = require("../command");

// --- MODIFICATION ---
// An array to hold multiple API URLs.
// You can add more URLs here, and the command will pick one at random.
// Ensure any new APIs return data in the same JSON format.
const apiEndpoints = [
    "https://apis-keith.vercel.app/dl/hentaivid"
    // Example of how to add more:
    // "https://another-api.com/random",
    // "https://some-other-source.net/data"
];

cmd({
    pattern: "randomporn",
    alias: ['randomxvideos', "randporn", "randxvideo", "randxvideos"],
    desc: "Get a random adult video from various online APIs.",
    category: "download",
    filename: __filename
}, async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // 1. Send a "searching" reaction to the user
        await conn.sendMessage(from, {
            react: {
                text: '🔍',
                key: mek.key
            }
        });

        // 2. Select a random API from the list and fetch data
        const randomApiUrl = apiEndpoints[Math.floor(Math.random() * apiEndpoints.length)];
        const response = await fetch(randomApiUrl);
        const data = await response.json();

        // 3. Check if the API returned valid data
        if (!data.status || !data.result || data.result.length === 0) {
            return reply(`❌ No videos found from the selected API. Please try again.`);
        }

        // 4. Pick a random video from the results
        const randomVideo = data.result[Math.floor(Math.random() * data.result.length)];
        const { title, category, media, views_count } = randomVideo;
        const { video_url } = media;

        // Ensure we have a video URL to proceed
        if (!video_url) {
             return reply(`❌ The selected item from the API did not contain a valid video URL. Please try again.`);
        }

        // 5. Create the caption for the video preview
        const caption = (
            `╭════ 〔 *📤 SHADOW-XTECH 📤* 〕══❐\n` +
            `┃▸ *🏷️ Title:* ${title}\n` +
            `┃▸ *🔎 Category:* ${category}\n` +
            `┃▸ *🕵️ Views:* ${views_count}\n` +
            `╰═════════════════❐\n\n` +
            `> ©Powered by Black-Tappy😇\n` +
            `🔗 *Join our channel:* *https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10*`
        );

        // 6. Send the video preview and store the message ID
        const sentMessage = await conn.sendMessage(from, {
            video: { url: video_url },
            caption: caption
        }, { quoted: mek });

        const sentMessageId = sentMessage.key.id;

        // 7. Set up a listener for the user to reply "download"
        conn.ev.on("messages.upsert", async (upsert) => {
            const receivedMessage = upsert.messages[0];
            if (!receivedMessage.message) return;

            const conversation = receivedMessage.message.conversation || receivedMessage.message.extendedTextMessage?.text;
            const remoteJid = receivedMessage.key.remoteJid;
            
            // Check if the new message is a reply to our video preview
            const isReplyToOurMessage = receivedMessage.message.extendedTextMessage?.contextInfo?.stanzaId === sentMessageId;

            if (isReplyToOurMessage && conversation) {
                // React to the user's reply
                await conn.sendMessage(remoteJid, { react: { text: '⬇️', key: receivedMessage.key } });

                if (conversation.toLowerCase() === "download") {
                    // If they reply "download", send the full video file
                    await conn.sendMessage(remoteJid, {
                        video: { url: video_url },
                        caption: `📥 *Download your requested video:* ${title}`
                    }, { quoted: receivedMessage });
                } else {
                    // If they reply with anything else, guide them
                    reply("❌ Invalid option! Please reply with *download* to get the video.");
                }
            }
        });

    } catch (error) {
        console.error('Error in randomporn command:', error);
        reply("❌ An error occurred while processing your request. Please try again.");
    }
});