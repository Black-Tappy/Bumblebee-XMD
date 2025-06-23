const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')

cmd({
    pattern: "song2",
    alias: ["play2"],
    react: "🎼",
    desc: "Download high-quality music",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return reply("*🚫error! Please provide a song name or YouTube link*")
const search = await yts(q)
const deta = search.videos[0];
const url = deta.url 

let desc= `
🎶 𝐒ᴏɴɢ 𝐃ᴏᴡɴʟᴏᴀᴅᴇ𝐑 🎶

◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈

❖  𝐓𝐢𝐭𝐥𝐞:  『${deta.title}』

✧⋄⋆⋅⋅⋅⋆⋄✧⋄⋆⋅⋅⋅⋆⋄✧⋄⋆⋅⋅⋅⋆⋄✧

📜  𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: 
『${deta.description}』

✧⋄⋆⋅⋅⋅⋆⋄✧⋄⋆⋅⋅⋅⋆⋄✧⋄⋆⋅⋅⋅⋆⋄✧

⏳  𝐓𝐢𝐦𝐞𝐬𝐭𝐚𝐦𝐩:  ${deta.timestamp}

🕒  𝐀𝐠𝐨:  ${deta.ago}

👁️   𝐕𝐢𝐞𝐰𝐬:  ${deta.views}

◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈

⚪  𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐁ʟᴀᴄᴋ-𝐓ᴀᴘᴘʏ  ⚪
`

await conn.sendMessage(from,{image :{ url: deta.thumbnail},caption:desc},{quoted:mek});

// Download audio+document
const res = await fetch(`https://api.davidcyriltech.my.id/youtube/mp3?url=${url}`);
const data = await res.json();
if (!data.success) return reply("🚫 Download failed! Please try again ");

let downloadUrl = data.result.downloadUrl;

// Send audio message 
await conn.sendMessage(from,{audio:{url:downloadUrl},mimetype:"audio/mpeg",caption :"🎧 Music by Shadow-Xtech"},{quoted:mek})
await conn.sendMessage(from,{document:{url:downloadUrl},mimetype:"audio/mpeg",fileName:deta.title + ".mp3" ,caption :"📥 Downloaded By Shadow-Xtech"},{quoted:mek})

}catch(e){
console.log(e)
reply(`🌀𝗘𝗥𝗥𝗢𝗥! ${e} 🌊`)
}
})

// ======== VIDEO DL ========
cmd({
    pattern: "video2",
    react: "🎬",
    desc: "Download HD videos",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

if(!q) return reply("*Error 🚫! Please provide a valid video name or valid youtube url*")
const search = await yts(q)
const deta = search.videos[0];
const url = deta.url 

let desc= `
📸 𝐕ɪᴅᴇᴏ 𝐃ᴏᴡɴʟᴏᴀᴅᴇ𝐑 📸

◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈

❖  𝐓𝐢𝐭𝐥𝐞:  『${deta.title}』

✧⋄⋆⋅⋅⋅⋆⋄✧⋄⋆⋅⋅⋅⋆⋄✧⋄⋆⋅⋅⋅⋆⋄✧

📜  𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: 
『${deta.description}』

✧⋄⋆⋅⋅⋅⋆⋄✧⋄⋆⋅⋅⋅⋆⋄✧⋄⋆⋅⋅⋅⋆⋄✧

⏳  𝐓𝐢𝐦𝐞𝐬𝐭𝐚𝐦𝐩:  ${deta.timestamp}

🕒  𝐀𝐠𝐨:  ${deta.ago}

👁️   𝐕𝐢𝐞𝐰𝐬:  ${deta.views}

◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈◈

⚪  𝐏ᴏᴡᴇʀᴇᴅ 𝐁ʏ 𝐁ʟᴀᴄᴋ-𝐓ᴀᴘᴘʏ  ⚪
`

await conn.sendMessage(from,{image :{ url: deta.thumbnail},caption:desc},{quoted:mek});

// Download video+document
const res = await fetch(`https://api.davidcyriltech.my.id/youtube/mp3?url=${url}`);
const data = await res.json();
if (!data.success) return reply("🚫 Download failed! please try again later");

let downloadUrl = data.result.downloadUrl;

// Send video message
await conn.sendMessage(from,{video:{url:downloadUrl},mimetype:"video/mp4",caption :"*🎥 Video By Shadow-Xtech*"},{quoted:mek})
await conn.sendMessage(from,{document:{url:downloadUrl},mimetype:"video/mp4",fileName:deta.title + ".mp4",caption :"📥 Downloaded by Shadow-Xtech 📥"},{quoted:mek})

}catch(e){
console.log(e)
reply(`🚫error! ${e} 🚨`)
}
})
