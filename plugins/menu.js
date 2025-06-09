
const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const axios = require("axios");
const s = require(__dirname + "/../config");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

// Dynamic greetings
const greetings = {
    morning: "🌄 Good Morning! Let's kickstart your day!",
    afternoon: "☀️ Good Afternoon! Stay productive!",
    evening: "🌆 Good Evening! Time to relax!",
    night: "🌙 Good Night! See you tomorrow!",
};

// GitHub audio files
const githubRawBaseUrl = "https://raw.githubusercontent.com/ibrahimaitech/bwm-xmd-music/master/tiktokmusic";
const audioFiles = Array.from({ length: 161 }, (_, i) => `sound${i + 1}.mp3`);
const getRandomAudio = () => audioFiles[Math.floor(Math.random() * audioFiles.length)];

const getMimeType = (url) => (url.endsWith(".wav") ? "audio/wav" : "audio/mpeg");

// Menu images and thumbnail URLs
const menuImages = [
    "https://files.catbox.moe/0w7hqx.jpg",
    "https://files.catbox.moe/9pawjj.jpg",
    "https://files.catbox.moe/95n1x6.jpg",
    "https://files.catbox.moe/bddwnw.jpeg",
    "https://files.catbox.moe/votefa.jpg",
    "https://files.catbox.moe/8piaax.jpg",
    "https://files.catbox.moe/zjq9mw.jpg",
    "https://files.catbox.moe/2pxc8g.jpg",
    "https://files.catbox.moe/votefa.jpg",
    "https://files.catbox.moe/zjq9mw.jpg",
    "https://files.catbox.moe/8piaax.jpg",
];
const randomImage = () => menuImages[Math.floor(Math.random() * menuImages.length)];

// GitHub repo stats function
const fetchGitHubStats = async () => {
    try {
        const repo = "Black-Tappy/Bumblebee-XMD";
        const response = await axios.get(`https://api.github.com/repos/${repo}`);
        const forks = response.data.forks_count || 0;
        const stars = response.data.stargazers_count || 0;
        const totalUsers = (forks * 2) + (stars * 2);
        return { forks, stars, totalUsers };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return { forks: 0, stars: 0, totalUsers: 0 };
    }
};

// Main menu command
zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    let coms = {};

    // Organize commands by category
    cm.map((com) => {
        const categoryUpper = com.categorie.toUpperCase();
        if (!coms[categoryUpper]) coms[categoryUpper] = [];
        coms[categoryUpper].push(com.nomCom);
    });

    moment.tz.setDefault(s.TZ || "Africa/arusha");
    const date = moment().format("DD/MM/YYYY");
    const time = moment().format("HH:mm:ss");
    const hour = moment().hour();

    // Determine greeting based on time
    let greeting = greetings.night;
    if (hour >= 5 && hour < 12) greeting = greetings.morning;
    else if (hour >= 12 && hour < 18) greeting = greetings.afternoon;
    else if (hour >= 18 && hour <= 22) greeting = greetings.evening;

    const { totalUsers } = await fetchGitHubStats();
    const formattedTotalUsers = totalUsers.toLocaleString();

    // Prepare command list with readmore before specific categories
    let commandList = "";
    const sortedCategories = Object.keys(coms).sort();
    sortedCategories.forEach((cat) => {
        if (cat === "Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ") {
            commandList += `╰••┈••➤ ${readmore}\n🗂 *${cat}*:\n\n`;
        } else if (cat.toLowerCase().includes("download") || cat.toLowerCase().includes("github")) {
            commandList += `${readmore}\n📃 *${cat}*:\n\n`;
        } else {
            commandList += `\n📜 *${cat}*:\n\n`;
        }

        let categoryCommands = coms[cat];
        for (let i = 0; i < categoryCommands.length; i++) {
            commandList += `➡️ ${categoryCommands[i]}\n`; // Display commands in a list
        }
        commandList += `\n`;
    });

    // Select assets
    const image = randomImage();
    const image1 = randomImage();
    const randomAudioFile = getRandomAudio();
    const audioUrl = `${githubRawBaseUrl}/${randomAudioFile}`;

    const menuType = s.MENUTYPE || (Math.random() < 0.5 ? "1" : "2"); // Randomly pick if blank

    const footer = "\n\n®2025 Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ";

    try {
        // Send menu based on the requested category
        const requestedCategory = commandeOptions.category || 'General'; // Get the requested category or default to 'General'

        if (menuType === "1") {
            // Menu Type 1 (For all categories or specific category)
            await zk.sendMessage(dest, {
                image: { url: image1 },
                caption: `
╭┈┈┈┈┈╮
│ 𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ 𝐌ᴇɴᴜ
├┈┈┈┈•➤
│ 🕵️ ᴜsᴇʀ ɴᴀᴍᴇ: ${nomAuteurMessage}
│ 📆 ᴅᴀᴛᴇ: ${date}
│ ⏰ ᴛɪᴍᴇ: ${time}
│ 👪 ᴜsᴇʀs: 1${formattedTotalUsers}
╰┈┈┈┈┈╯
${greeting}

> ©𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ

${commandList}${footer}
`,
                contextInfo: {
                    quotedMessage: {
                        conversation: "𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ 𝐌ᴇɴᴜ Bʏ Bʟᴀᴄᴋ-Tᴀᴘᴘʏ",
                    },
                    externalAdReply: {
                        title: "𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ",
                        body: "Tap here to Join our official channel!",
                        thumbnailUrl: image,
                        sourceUrl: "https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10",
                        showAdAttribution: true,
                        renderLargerThumbnail: false,
                    },
                },
            });
        } else {
            // Menu Type 2 (For all categories or specific category)
            await zk.sendMessage(dest, {
                image: { url: image1 },
                caption: `
╭───❖
┃🌟 ʙᴏᴛ name 𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ
┃🕵️ ᴜsᴇʀ ɴᴀᴍᴇ: ${nomAuteurMessage}
┃📅 ᴅᴀᴛᴇ: ${date}
┃⏰ ᴛɪᴍᴇ: ${time}
┃👥 ᴜsᴇʀs: 1${formattedTotalUsers}
╰───❖
${greeting}

> ©𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ

${commandList}${footer}
`,
                contextInfo: {
                    quotedMessage: {
                        conversation: "𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ 𝐌ᴇɴᴜ Bʏ Bʟᴀᴄᴋ-Tᴀᴘᴘʏ",
                    },
                    externalAdReply: {
                        title:"𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ",
                        body: "Tap here to Join our official channel!",
                        thumbnailUrl: image,
                        sourceUrl: "https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10",
                        showAdAttribution: true,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                    },
                },
            });
        }

        // Send audio
        await zk.sendMessage(dest, {
            audio: { url: audioUrl },
            mimetype: getMimeType(audioUrl),
            ptt: true,
        });
    } catch (error) {
        console.error("Error sending menu:", error);
    }
});







/**const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const axios = require("axios");
const s = require(__dirname + "/../config");

const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

// Dynamic greetings
const greetings = {
    morning: "🌄 Good Morning! Let's kickstart your day!",
    afternoon: "☀️ Good Afternoon! Stay productive!",
    evening: "🌆 Good Evening! Time to relax!",
    night: "🌙 Good Night! See you tomorrow!",
};

// GitHub audio files
const githubRawBaseUrl = "https://raw.githubusercontent.com/ibrahimaitech/bwm-xmd-music/master/tiktokmusic";
const audioFiles = Array.from({ length: 161 }, (_, i) => `sound${i + 1}.mp3`);
const getRandomAudio = () => audioFiles[Math.floor(Math.random() * audioFiles.length)];

const getMimeType = (url) => (url.endsWith(".wav") ? "audio/wav" : "audio/mpeg");

// Menu images and thumbnail URLs
const menuImages = [
    "https://files.catbox.moe/0w7hqx.jpg",
    "https://files.catbox.moe/9pawjj.jpg",
    "https://files.catbox.moe/95n1x6.jpg",
    "https://files.catbox.moe/bddwnw.jpeg",
    "https://files.catbox.moe/votefa.jpg",
    "https://files.catbox.moe/8piaax.jpg",
    "https://files.catbox.moe/zjq9mw.jpg",
    "https://files.catbox.moe/2pxc8g.jpg",
    "https://files.catbox.moe/votefa.jpg",
    "https://files.catbox.moe/zjq9mw.jpg",
    "https://files.catbox.moe/8piaax.jpg",
];
const randomImage = () => menuImages[Math.floor(Math.random() * menuImages.length)];

// GitHub repo stats function
const fetchGitHubStats = async () => {
    try {
        const repo = "Black-Tappy/Bumblebee-XMD";
        const response = await axios.get(`https://api.github.com/repos/${repo}`);
        const forks = response.data.forks_count || 0;
        const stars = response.data.stargazers_count || 0;
        const totalUsers = (forks * 2) + (stars * 2);
        return { forks, stars, totalUsers };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return { forks: 0, stars: 0, totalUsers: 0 };
    }
};

// Main menu command
zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { nomAuteurMessage } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    let coms = {};

    // Organize commands by category
    cm.map((com) => {
        const categoryUpper = com.categorie.toUpperCase();
        if (!coms[categoryUpper]) coms[categoryUpper] = [];
        coms[categoryUpper].push(com.nomCom);
    });

    moment.tz.setDefault(s.TZ || "Africa/arusha");
    const date = moment().format("DD/MM/YYYY");
    const time = moment().format("HH:mm:ss");
    const hour = moment().hour();

    // Determine greeting based on time
    let greeting = greetings.night;
    if (hour >= 5 && hour < 12) greeting = greetings.morning;
    else if (hour >= 12 && hour < 18) greeting = greetings.afternoon;
    else if (hour >= 18 && hour <= 22) greeting = greetings.evening;

    const { totalUsers } = await fetchGitHubStats();
    const formattedTotalUsers = totalUsers.toLocaleString();

    // Prepare command list with readmore before specific categories
    let commandList = "";
    const sortedCategories = Object.keys(coms).sort();
    sortedCategories.forEach((cat) => {
        if (cat === "Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ") {
            commandList += `╰••┈••➤ ${readmore}\n🗂 *${cat}*:\n\n`;
        } else if (cat.toLowerCase().includes("download") || cat.toLowerCase().includes("github")) {
            commandList += `${readmore}\n📃 *${cat}*:\n\n`;
        } else {
            commandList += `\n📜 *${cat}*:\n\n`;
        }

        let categoryCommands = coms[cat];
        for (let i = 0; i < categoryCommands.length; i++) {
            commandList += `➡️ ${categoryCommands[i]}\n`; // Display commands in a list
        }
        commandList += `\n`;
    });

    // Select assets
    const image = randomImage();
    const image1 = randomImage();
    const randomAudioFile = getRandomAudio();
    const audioUrl = `${githubRawBaseUrl}/${randomAudioFile}`;

    const menuType = s.MENUTYPE || (Math.random() < 0.5 ? "1" : "2"); // Randomly pick if blank

    const footer = "\n\n®2025 Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ";

    try {
        // Send menu based on the requested category
        const requestedCategory = commandeOptions.category || 'General'; // Get the requested category or default to 'General'

        if (menuType === "1") {
            // Menu Type 1 (For all categories or specific category)
            await zk.sendMessage(dest, {
                image: { url: image1 },
                caption: `
╭┈┈┈┈┈╮
│ 𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ 𝐌ᴇɴᴜ
├┈┈┈┈•➤
│ 🕵️ ᴜsᴇʀ ɴᴀᴍᴇ: ${nomAuteurMessage}
│ 📆 ᴅᴀᴛᴇ: ${date}
│ ⏰ ᴛɪᴍᴇ: ${time}
│ 👪 ᴜsᴇʀs: 1${formattedTotalUsers}
╰┈┈┈┈┈╯
${greeting}

> ©𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ

${commandList}${footer}
`,
                contextInfo: {
                    quotedMessage: {
                        conversation: "𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ 𝐌ᴇɴᴜ Bʏ Bʟᴀᴄᴋ-Tᴀᴘᴘʏ",
                    },
                    externalAdReply: {
                        title: "𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ",
                        body: "Tap here to Join our official channel!",
                        thumbnailUrl: image,
                        sourceUrl: "https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10",
                        showAdAttribution: true,
                        renderLargerThumbnail: false,
                    },
                },
            });
        } else {
            // Menu Type 2 (For all categories or specific category)
            await zk.sendMessage(dest, {
                image: { url: image1 },
                caption: `
╭───❖
┃🌟 ʙᴏᴛ name 𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ
┃🕵️ ᴜsᴇʀ ɴᴀᴍᴇ: ${nomAuteurMessage}
┃📅 ᴅᴀᴛᴇ: ${date}
┃⏰ ᴛɪᴍᴇ: ${time}
┃👥 ᴜsᴇʀs: 1${formattedTotalUsers}
╰───❖
${greeting}

> ©𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ

${commandList}${footer}
`,
                contextInfo: {
                    quotedMessage: {
                        conversation: "𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ 𝐌ᴇɴᴜ Bʏ Bʟᴀᴄᴋ-Tᴀᴘᴘʏ",
                    },
                    externalAdReply: {
                        title:"𝐁ᴜᴍʙʟᴇʙᴇᴇ-𝐗ᴍᎠ",
                        body: "Tap here to Join our official channel!",
                        thumbnailUrl: image,
                        sourceUrl: "https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10",
                        showAdAttribution: true,
                        mediaType: 1,
                        renderLargerThumbnail: true,
                    },
                },
            });
        }

        // Send audio
        await zk.sendMessage(dest, {
            audio: { url: audioUrl },
            mimetype: getMimeType(audioUrl),
            ptt: true,
        });
    } catch (error) {
        console.error("Error sending menu:", error);
    }
});
**/
