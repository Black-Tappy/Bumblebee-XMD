const { zokou } = require("../framework/zokou");
const axios = require('axios');
const ytSearch = require('yt-search');
const conf = require(__dirname + '/../set');

// Define the command with aliases for play
zokou({
  nomCom: "play3",
  aliases: ["song", "playdoc", "audio", "mp3"],
  categorie: "Search",
  reaction: "🎧"
}, async (dest, zk, commandOptions) => {
  const { arg, ms, repondre } = commandOptions;

  // Check if a query is provided
  if (!arg[0]) {
    return repondre("Please provide a video name.");
  }

  const query = arg.join(" ");

  try {
    // Perform a YouTube search based on the query
    const searchResults = await ytSearch(query);

    // Check if any videos were found
    if (!searchResults || !searchResults.videos.length) {
      return repondre('No video found for the specified query.');
    }

    const firstVideo = searchResults.videos[0];
    const videoUrl = firstVideo.url;

    // Function to get download data from APIs
    const getDownloadData = async (url) => {
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error('Error fetching data from API:', error);
        return { success: false };
      }
    };

    // List of APIs to try
    const apis = [
      `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(videoUrl)}`,
      `https://apis.davidcyriltech.my.id/youtube/mp3?url=${encodeURIComponent(videoUrl)}`,
      `https://www.dark-yasiya-api.site/download/ytmp3?url=${encodeURIComponent(videoUrl)}`,
      `https://api.giftedtech.web.id/api/download/dlmp3?url=${encodeURIComponent(videoUrl)}&apikey=gifted-md`,
      `https://api.dreaded.site/api/ytdl/audio?url=${encodeURIComponent(videoUrl)}`
    ];

    let downloadData;
    for (const api of apis) {
      downloadData = await getDownloadData(api);
      if (downloadData && downloadData.success) break;
    }

    // Check if a valid download URL was found
    if (!downloadData || !downloadData.success) {
      return repondre('Failed to retrieve download URL from all sources. Please try again later.');
    }

    const downloadUrl = downloadData.result.download_url;
    const videoDetails = downloadData.result;

    // Prepare the message payload with external ad details
    const messagePayloads = [
      {
       caption: `\n*NEXUS-AI DOWNLOADER*\n
 *👑 Title: ${videoDetails.title}*
 *📁 Quality: High*
 *⏳ Duration: ${firstVideo.timestamp}*
> *Bumblebee-XMD Player* 
`,
       document: { url: downloadUrl },
       mimetype: 'audio/mpeg',
       contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterJid: '120363369453603973@newsletter',
          newsletterName: "Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ",
          serverMessageId: 143,
          },
          forwardingScore: 999, // Score to indicate it has been forwarded
          externalAdReply: {
            title: "Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ",
            body: "YouTube Search",
            thumbnailUrl: 'https://files.catbox.moe/pdhcob.jpeg', // Add thumbnail URL if required 
            sourceUrl: 'https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10', // Add source URL if necessary
            mediaType: 1,
            renderLargerThumbnail: true
          },
        },
      },
      {
        audio: { url: downloadUrl },
        mimetype: 'audio/mp4',
        contextInfo: {
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
          newsletterJid: '120363288304618280@newsletter',
          newsletterName: "Nexus-ai",
          serverMessageId: 143,
          },
          forwardingScore: 999, // Score to indicate it has been forwarded
          externalAdReply: {
            title: "Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ",
            body: "YouTube Search",
            thumbnailUrl: 'https://files.catbox.moe/pdhcob.jpeg', // Add thumbnail URL if required 
            sourceUrl: 'https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10', // Add source URL if necessary
            mediaType: 1,
            renderLargerThumbnail: true
          },
        },
      }
    ];

    // Send the download link to the user for each payload
    for (const messagePayload of messagePayloads) {
      await zk.sendMessage(dest, messagePayload, { quoted: ms });
    }

  } catch (error) {
    console.error('Error during download process:', error);
    return repondre(`Download failed due to an error: ${error.message || error}`);
  }
});
