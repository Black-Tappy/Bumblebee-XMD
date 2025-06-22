const { zokou } = require(__dirname + "/../framework/zokou");

zokou(
  {
    nomCom: "vv",
    categorie: "Mods",
    reaction: "👁️",
    fromMe: false, // Optional: set to true if only for private use
  },
  async (from, client, commandeOptions) => {
    const { ms, match, isOwner, repondre } = commandeOptions;

    try {
      if (!isOwner) {
        return await client.sendMessage(
          from,
          {
            text: "*📛 This is an owner-only command.*",
          },
          { quoted: ms }
        );
      }

      if (!ms.quoted) {
        return await client.sendMessage(
          from,
          {
            text: "*🍁 Please reply to a view-once image/video/audio message.*",
          },
          { quoted: ms }
        );
      }

      const buffer = await ms.quoted.download();
      const mtype = ms.quoted.mtype;
      const options = { quoted: ms };

      let messageContent = {};

      switch (mtype) {
        case "imageMessage":
          messageContent = {
            image: buffer,
            caption: ms.quoted.text || "",
            mimetype: ms.quoted.mimetype || "image/jpeg",
          };
          break;

        case "videoMessage":
          messageContent = {
            video: buffer,
            caption: ms.quoted.text || "",
            mimetype: ms.quoted.mimetype || "video/mp4",
          };
          break;

        case "audioMessage":
          messageContent = {
            audio: buffer,
            mimetype: "audio/mp4",
            ptt: ms.quoted.ptt || false,
          };
          break;

        default:
          return await client.sendMessage(
            from,
            {
              text: "❌ Only image, video, and audio messages are supported.",
            },
            { quoted: ms }
          );
      }

      await client.sendMessage(from, messageContent, options);
    } catch (error) {
      console.error("vv Error:", error);
      await client.sendMessage(
        from,
        {
          text: "❌ Error fetching view-once message:\n" + error.message,
        },
        { quoted: ms }
      );
    }
  }
);
