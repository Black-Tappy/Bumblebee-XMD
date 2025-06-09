const {zokou} = require('../framework/zokou');
const fs = require('fs');
const getFBInfo = require("@xaviabot/fb-downloader");
const { default: axios } = require('axios');

zokou({nomCom : "instagram" , categorie : "Download"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions ;

  let link = arg.join(' ')

  if (!arg[0]) { repondre('Please insert an Instagram link');return}; 

  try {
    let igvid = await axios('https://api.dreaded.site/api/igdl?url='+link)

    if (igvid.data.data.data[0].type == 'video') {
      zk.sendMessage(dest,{video : {url : igvid.data.data.data[0].url},caption : "Ig Video Downloader ,(Powered by Black-Tappy)",gifPlayback : false },{quoted : ms}) 
    }
    else {
      zk.sendMessage(dest,{image : {url : igvid.data.data.data[0].url},caption : "Ig Image Downloader ,(Powered by Black-Tappy)"})
    }
  } catch (e) { repondre("𝐄𝐫𝐫𝐨𝐫 𝐨𝐜𝐜𝐮𝐫𝐫𝐞𝐝 𝐝𝐮𝐫𝐢𝐧𝐠 𝐝𝐨𝐰𝐧𝐥𝐨𝐚𝐝:\n" + e) }
});

zokou({ nomCom: "facebook", categorie: "Download", reaction: "📽️" }, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('𝐈nsert a public Facebook link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
    getFBInfo(queryURL).then((result) => {
      let caption = `👑 𝐓𝐢𝐭𝐥𝐞: ${result.title}\n🔗 𝐋𝐢𝐧𝐤: ${result.url}`;
      zk.sendMessage(dest, { image: { url: result.thumbnail }, caption: caption }, { quoted: ms });
      zk.sendMessage(dest, { video: { url: result.hd }, caption: 'Facebook Video Downloader ,(Powered by Black-Tappy)' }, { quoted: ms });
    }).catch((error) => {
      console.log("Error:", error);
      repondre('Tr y fbdl2 on this links');
    });
  } catch (error) {
    console.error('Error:', error);
    repondre('Download error: ' + error);
  }
});

zokou({ nomCom: "tiktok", categorie: "Download", reaction: "🎵" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe, repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`Example:\n${prefixe}tiktok <video_link>`);
    return;
  }

  const videoUrl = arg.join(" ");
  let data = await axios.get('https://api.dreaded.site/api/tiktok?url=' + videoUrl);
  let tik = data.data.data;

  const caption = `👑 𝐀𝐮𝐭𝐡𝐨𝐫: ${tik.author}\n🔗 𝐃𝐞𝐬𝐜: ${tik.desc}`;
  zk.sendMessage(dest, { video: { url: tik.links[0].a }, caption: caption }, { quoted: ms });
});

zokou({ nomCom: "facebook2", categorie: "Download", reaction: "📽️" }, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public Facebook Video Link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
    getFBInfo(queryURL).then((result) => {
      let caption = `👑 𝐓𝐢𝐭𝐥𝐞: ${result.title}\n🔗 𝐋𝐢𝐧𝐤: ${result.url}`;
      zk.sendMessage(dest, { image: { url: result.thumbnail }, caption: caption }, { quoted: ms });
      zk.sendMessage(dest, { video: { url: result.sd }, caption: 'Fecbook Video Downloader ,(Powered by Black-Tappy)' }, { quoted: ms });
    }).catch((error) => {
      console.log("Error:", error);
      repondre(error);
    });
  } catch (error) {
    console.error('Error:', error);
    repondre('Download error: ' + error);
  }
});