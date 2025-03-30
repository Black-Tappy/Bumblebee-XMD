/*_______________________________________________________________________________________________________________________________________________________________________________________________________________________
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
─██████████████──██████████──██████──────────██████████████──██████──────────██████──██████████████──██████──────────██████████████──██████──██████──██████████████──████████████████─── 
─██░░░░░░░░░░██──██░░░░░░██──██░░██──────────██░░░░░░░░░░██──██░░██████████──██░░██──██░░░░░░░░░░██──██░░██──────────██░░░░░░░░░░██──██░░██──██░░██──██░░░░░░░░░░██──██░░░░░░░░░░░░██─── 
─██░░██████████──████░░████──██░░██──────────██░░██████████──██░░░░░░░░░░██──██░░██──██████░░██████──██░░██──────────██░░██████░░██──██░░██──██░░██──██░░██████████──██░░████████░░██─── 
─██░░██────────────██░░██────██░░██──────────██░░██──────────██░░██████░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░██──────────██░░██────██░░██─── 
─██░░██████████────██░░██────██░░██──────────██░░██████████──██░░██──██░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░██████████──██░░████████░░██─── 
─██░░░░░░░░░░██────██░░██────██░░██──────────██░░░░░░░░░░██──██░░██──██░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░░░░░░░░░██──██░░░░░░░░░░░░██─── 
─██████████░░██────██░░██────██░░██──────────██░░██████████──██░░██──██░░██──██░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░██──██░░██──██░░██████████──██░░██████░░████─── 
─────────██░░██────██░░██────██░░██──────────██░░██──────────██░░██──██░░██████░░██──────██░░██──────██░░██──────────██░░██──██░░██──██░░░░██░░░░██──██░░██──────────██░░██──██░░██───── 
─██████████░░██──████░░████──██░░██████████──██░░██████████──██░░██──██░░░░░░░░░░██──────██░░██──────██░░██████████──██░░██████░░██──████░░░░░░████──██░░██████████──██░░██──██░░██████─ 
─██░░░░░░░░░░██──██░░░░░░██──██░░░░░░░░░░██──██░░░░░░░░░░██──██░░██──██████████░░██──────██░░██──────██░░░░░░░░░░██──██░░░░░░░░░░██────████░░████────██░░░░░░░░░░██──██░░██──██░░░░░░██─ 
─██████████████──██████████──██████████████──██████████████──██████──────────██████──────██████──────██████████████──██████████████──────██████──────██████████████──██████──██████████─ 
──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── 
created by Ⴊl𐌀Ꮳk 𐌕𐌀ႲႲჄ🕵
contact me 254759000340 ♻️
© Copy coder alert ⚠
*/
const {
  fetchJson
} = require("../lib/functions");
const {
  downloadTiktok
} = require('@mrnima/tiktok-downloader');
const {
  facebook
} = require("@mrnima/facebook-downloader");
const cheerio = require("cheerio");
const {
  igdl
} = require("ruhend-scraper");
const axios = require('axios');
const {
  cmd,
  commands
} = require("../command");
cmd({
  'pattern': "tiktok",
  'alias': ['tt'],
  'react': '🎥',
  'desc': "download tt videos",
  'category': "download",
  'filename': __filename
}, async (_0xd77fff, _0x2db1f1, _0x352508, {
  from: _0x5edbe4,
  quoted: _0x29a457,
  body: _0x538d0c,
  isCmd: _0x34b8c9,
  command: _0x43f30b,
  args: _0x451bf4,
  q: _0x56889c,
  isGroup: _0x56a11d,
  sender: _0x1b1b04,
  senderNumber: _0x1f6214,
  botNumber2: _0x5ec962,
  botNumber: _0xfb7258,
  pushname: _0x29e165,
  isMe: _0x1c0206,
  isOwner: _0x3f736e,
  groupMetadata: _0x3d9ea0,
  groupName: _0xf36703,
  participants: _0x472058,
  groupAdmins: _0x5e559d,
  isBotAdmins: _0x1e7938,
  isAdmins: _0x5b7729,
  reply: _0x6868ae
}) => {
  try {
    if (!_0x56889c && !_0x56889c.startsWith("https://")) {
      return _0x6868ae("*`Need url`*");
    }
    _0x352508.react('⬇️');
    let _0x3cc321 = await downloadTiktok(_0x56889c);
    let _0x17702e = "\n*⚬ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ-ᴛɪᴋᴛᴏᴋ⚬*  \n*ᴛɪᴛʟᴇ*:  " + _0x3cc321.result.title + "\n\n*🔢 ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴛʜᴇ ɴᴜᴍʙᴇʀ*\n\n*ᴠɪᴅᴇᴏ ꜰɪʟᴇ* 🎬\n\n*1*     ┃  *ꜱᴅ Qᴜᴀʟɪᴛʏ*\n*2*     ┃  *ʜᴅ Qᴜᴀʟɪᴛʏ*\n\n*ᴀᴜᴅɪᴏ ꜰɪʟᴇ*🎧\n\n*3*     ┃  *ᴀᴜᴅɪᴏ*\n\n> ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ ✻\n     ";
    const _0x1a2830 = await _0xd77fff.sendMessage(_0x5edbe4, {
      'image': {
        'url': _0x3cc321.result.image
      },
      'caption': _0x17702e
    });
    const _0x195026 = _0x1a2830.key.id;
    _0xd77fff.ev.on("messages.upsert", async _0x3601c3 => {
      const _0x58803e = _0x3601c3.messages[0x0];
      if (!_0x58803e.message) {
        return;
      }
      const _0x33bcb9 = _0x58803e.message.conversation || _0x58803e.message.extendedTextMessage?.["text"];
      const _0x41d115 = _0x58803e.key.remoteJid;
      const _0x56fbde = _0x58803e.message.extendedTextMessage && _0x58803e.message.extendedTextMessage.contextInfo.stanzaId === _0x195026;
      if (_0x56fbde) {
        await _0xd77fff.sendMessage(_0x41d115, {
          'react': {
            'text': '⬇️',
            'key': _0x58803e.key
          }
        });
        let _0x5d2707 = _0x3cc321.result;
        await _0xd77fff.sendMessage(_0x41d115, {
          'react': {
            'text': '⬆️',
            'key': _0x58803e.key
          }
        });
        if (_0x33bcb9 === '1') {
          await _0xd77fff.sendMessage(_0x41d115, {
            'video': {
              'url': _0x5d2707.dl_link.download_mp4_1
            },
            'caption': "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ · · ·*"
          }, {
            'quoted': _0x58803e
          });
        } else {
          if (_0x33bcb9 === '2') {
            await _0xd77fff.sendMessage(_0x41d115, {
              'video': {
                'url': _0x5d2707.dl_link.download_mp4_2
              },
              'caption': "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ · · ·⁴³²*"
            }, {
              'quoted': _0x58803e
            });
          } else if (_0x33bcb9 === '3') {
            await _0xd77fff.sendMessage(_0x41d115, {
              'audio': {
                'url': _0x5d2707.dl_link.download_mp3
              },
              'mimetype': "audio/mpeg"
            }, {
              'quoted': _0x58803e
            });
          }
        }
      }
    });
  } catch (_0xb8e610) {
    console.log(_0xb8e610);
    _0x6868ae('' + _0xb8e610);
  }
});
cmd({
  'pattern': 'fb',
  'alias': ["facebook"],
  'desc': "Download Facebook videos",
  'category': "download",
  'filename': __filename
}, async (_0x1ac136, _0x5aec6a, _0x326675, {
  from: _0x1a04e3,
  quoted: _0x2255fc,
  body: _0x1f43bc,
  isCmd: _0x1c2063,
  command: _0x56b992,
  args: _0x35d02b,
  q: _0x3f223d,
  isGroup: _0x4c9e5a,
  sender: _0x2b95da,
  senderNumber: _0x2557e4,
  botNumber2: _0x288452,
  botNumber: _0x27499e,
  pushname: _0x16a64d,
  isMe: _0x453f87,
  isOwner: _0x2a8b1b,
  groupMetadata: _0x1e68c5,
  groupName: _0x4fa732,
  participants: _0x37c313,
  groupAdmins: _0x4d8ee2,
  isBotAdmins: _0x443398,
  isAdmins: _0x3ee4b7,
  reply: _0x4bd709
}) => {
  try {
    if (!_0x3f223d || !_0x3f223d.startsWith("https://")) {
      return _0x1ac136.sendMessage(_0x1a04e3, {
        'text': "*`Need URL`*"
      }, {
        'quoted': _0x5aec6a
      });
    }
    await _0x1ac136.sendMessage(_0x1a04e3, {
      'react': {
        'text': '⏳',
        'key': _0x5aec6a.key
      }
    });
    const _0x21f387 = await facebook(_0x3f223d);
    const _0x3ec2b8 = "\n*⚬ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ-ꜰʙ⚬*  \n*⌛ᴅᴜʀᴀᴛɪᴏɴ* : " + _0x21f387.result.duration + "\n\n*🔢 ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴛʜᴇ ɴᴜᴍʙᴇʀ*\n\n*ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ 🎬*\n\n*1.1*     ┃  *ꜱᴅ Qᴜᴀʟɪᴛʏ*\n*1.2*     ┃  *ʜᴅ Qᴜᴀʟɪᴛʏ*\n\n*ᴀᴜᴅɪᴏ ᴅᴏᴡɴʟᴏᴀᴅ 🎧*\n\n*2.1*     ┃  *ᴀᴜᴅɪᴏ*\n*2.2*     ┃  *ᴅᴏᴄᴜᴍᴇɴᴛ*\n*2.3*     ┃  *ᴠᴏɪᴄᴇ*\n\n> ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ ✻\n";
    const _0x113e79 = await _0x1ac136.sendMessage(_0x1a04e3, {
      'image': {
        'url': _0x21f387.result.thumbnail
      },
      'caption': _0x3ec2b8
    }, {
      'quoted': _0x5aec6a
    });
    const _0x55f007 = _0x113e79.key.id;
    _0x1ac136.ev.on("messages.upsert", async _0x3b66fb => {
      const _0x5ded0a = _0x3b66fb.messages[0x0];
      if (!_0x5ded0a.message) {
        return;
      }
      const _0x48db83 = _0x5ded0a.message.conversation || _0x5ded0a.message.extendedTextMessage?.["text"];
      const _0x231677 = _0x5ded0a.key.remoteJid;
      const _0x58b051 = _0x5ded0a.message.extendedTextMessage && _0x5ded0a.message.extendedTextMessage.contextInfo.stanzaId === _0x55f007;
      if (_0x58b051) {
        await _0x1ac136.sendMessage(_0x231677, {
          'react': {
            'text': '⬇️',
            'key': _0x5ded0a.key
          }
        });
        let _0x2cfc3f = _0x21f387.result;
        await _0x1ac136.sendMessage(_0x231677, {
          'react': {
            'text': '⬆️',
            'key': _0x5ded0a.key
          }
        });
        if (_0x48db83 === "1.1") {
          await _0x1ac136.sendMessage(_0x231677, {
            'video': {
              'url': _0x2cfc3f.links.SD
            },
            'caption': "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ · · ·⁴³²*"
          }, {
            'quoted': _0x5ded0a
          });
        } else {
          if (_0x48db83 === "1.2") {
            await _0x1ac136.sendMessage(_0x231677, {
              'video': {
                'url': _0x2cfc3f.links.HD
              },
              'caption': "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ · · ·⁴³²*"
            }, {
              'quoted': _0x5ded0a
            });
          } else {
            if (_0x48db83 === "2.1") {
              await _0x1ac136.sendMessage(_0x231677, {
                'audio': {
                  'url': _0x2cfc3f.links.SD
                },
                'mimetype': "audio/mpeg"
              }, {
                'quoted': _0x5ded0a
              });
            } else {
              if (_0x48db83 === '2.2') {
                await _0x1ac136.sendMessage(_0x231677, {
                  'document': {
                    'url': _0x2cfc3f.links.SD
                  },
                  'mimetype': "audio/mpeg",
                  'fileName': "SILENT/FBDL.mp3",
                  'caption': "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ · · ·⁴³²*"
                }, {
                  'quoted': _0x5ded0a
                });
              } else if (_0x48db83 === "2.3") {
                await _0x1ac136.sendMessage(_0x231677, {
                  'audio': {
                    'url': _0x2cfc3f.links.SD
                  },
                  'mimetype': 'audio/mp4',
                  'ptt': true
                }, {
                  'quoted': _0x5ded0a
                });
              }
            }
          }
        }
      }
    });
  } catch (_0x29aeea) {
    console.log(_0x29aeea);
    _0x4bd709('' + _0x29aeea);
  }
});
cmd({
  'pattern': "twitter",
  'alias': ['tweet', "twdl"],
  'desc': "Download Twitter videos",
  'category': "download",
  'filename': __filename
}, async (_0xaf8db8, _0x52bd10, _0x4b2f59, {
  from: _0x1220b5,
  quoted: _0x4cae8c,
  body: _0x251a57,
  isCmd: _0x25b51a,
  command: _0x27443d,
  args: _0x71c31d,
  q: _0x7e7f9b,
  isGroup: _0x5c2219,
  sender: _0x3c6e22,
  senderNumber: _0x21daa5,
  botNumber2: _0x306e14,
  botNumber: _0x2c38a2,
  pushname: _0x3fee0f,
  isMe: _0x4c03e9,
  isOwner: _0x21c292,
  groupMetadata: _0x35e2f2,
  groupName: _0x29674e,
  participants: _0x5ede8a,
  groupAdmins: _0x3dbfbb,
  isBotAdmins: _0x8b6d59,
  isAdmins: _0x143cb9,
  reply: _0x20e92a
}) => {
  try {
    if (!_0x7e7f9b || !_0x7e7f9b.startsWith("https://")) {
      return _0xaf8db8.sendMessage(_0x1220b5, {
        'text': "❌ Please provide a valid Twitter URL."
      }, {
        'quoted': _0x52bd10
      });
    }
    await _0xaf8db8.sendMessage(_0x1220b5, {
      'react': {
        'text': '⏳',
        'key': _0x52bd10.key
      }
    });
    const _0x13f218 = await axios.get("https://www.dark-yasiya-api.site/download/twitter?url=" + _0x7e7f9b);
    const _0x467ca1 = _0x13f218.data;
    if (!_0x467ca1 || !_0x467ca1.status || !_0x467ca1.result) {
      return _0x4b2f59.reply("Failed to retrieve Twitter video. Please check the link and try again.");
    }
    const {
      desc: _0x2efe63,
      thumb: _0x247442,
      video_sd: _0x15a4a6,
      video_hd: _0x3a7cd6
    } = _0x467ca1.result;
    const _0x57d52f = await _0xaf8db8.sendMessage(_0x1220b5, {
      'image': {
        'url': _0x247442
      },
      'caption': "\n*⚬ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ-ᴛᴡɪᴛᴇʀ⚬*  \n*🔢 ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴛʜᴇ ɴᴜᴍʙᴇʀ*\n\n*ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅ 🎬*\n\n*1.1*     ┃  *ꜱᴅ Qᴜᴀʟɪᴛʏ*\n*1.2*     ┃  *ʜᴅ Qᴜᴀʟɪᴛʏ*\n\n*ᴀᴜᴅɪᴏ ᴅᴏᴡɴʟᴏᴀᴅ 🎧*\n\n*2.1*     ┃  *ᴀᴜᴅɪᴏ*\n*2.2*     ┃  *ᴅᴏᴄᴜᴍᴇɴᴛ*\n*2.3*     ┃  *ᴠᴏɪᴄᴇ*\n\n> ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ ✻\n"
    }, {
      'quoted': _0x52bd10
    });
    const _0xcbea72 = _0x57d52f.key.id;
    _0xaf8db8.ev.on('messages.upsert', async _0x3bf3b2 => {
      const _0x2405c0 = _0x3bf3b2.messages[0x0];
      if (!_0x2405c0.message) {
        return;
      }
      const _0x1e75d9 = _0x2405c0.message.conversation || _0x2405c0.message.extendedTextMessage?.["text"];
      const _0x5eb615 = _0x2405c0.key.remoteJid;
      const _0x4dbcb0 = _0x2405c0.message.extendedTextMessage && _0x2405c0.message.extendedTextMessage.contextInfo.stanzaId === _0xcbea72;
      if (_0x4dbcb0) {
        await _0xaf8db8.sendMessage(_0x5eb615, {
          'react': {
            'text': '⬇️',
            'key': _0x2405c0.key
          }
        });
        if (_0x1e75d9 === "1.1") {
          await _0xaf8db8.sendMessage(_0x5eb615, {
            'video': {
              'url': _0x15a4a6
            },
            'caption': "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ · · ·⁴³²*"
          }, {
            'quoted': _0x2405c0
          });
        } else {
          if (_0x1e75d9 === "1.2") {
            await _0xaf8db8.sendMessage(_0x5eb615, {
              'video': {
                'url': _0x3a7cd6
              },
              'caption': "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ · · ·⁴³²*"
            }, {
              'quoted': _0x2405c0
            });
          } else {
            if (_0x1e75d9 === "2.1") {
              await _0xaf8db8.sendMessage(_0x5eb615, {
                'audio': {
                  'url': _0x15a4a6
                },
                'mimetype': 'audio/mpeg'
              }, {
                'quoted': _0x2405c0
              });
            } else {
              if (_0x1e75d9 === "2.2") {
                await _0xaf8db8.sendMessage(_0x5eb615, {
                  'document': {
                    'url': _0x15a4a6
                  },
                  'mimetype': "audio/mpeg",
                  'fileName': "ʟᴀʀᴀ-ᴍᴅ/TWDL.mp3",
                  'caption': "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ · · ·⁴³²*"
                }, {
                  'quoted': _0x2405c0
                });
              } else if (_0x1e75d9 === "2.3") {
                await _0xaf8db8.sendMessage(_0x5eb615, {
                  'audio': {
                    'url': _0x15a4a6
                  },
                  'mimetype': "audio/mp4",
                  'ptt': true
                }, {
                  'quoted': _0x2405c0
                });
              }
            }
          }
        }
      }
    });
  } catch (_0x17742e) {
    console.log(_0x17742e);
    _0x20e92a("An error occurred: " + _0x17742e);
  }
});
cmd({
  'pattern': 'mediafire',
  'alias': ["mfire"],
  'desc': "To download MediaFire files.",
  'react': '🎥',
  'category': 'download',
  'filename': __filename
}, async (_0x3ab728, _0x3d159f, _0x788d94, {
  from: _0x47d2c3,
  quoted: _0x4ccb03,
  body: _0x5da797,
  isCmd: _0xef7c33,
  command: _0x2cb9f9,
  args: _0x51e0d9,
  q: _0x4da4fa,
  isGroup: _0x54a73a,
  sender: _0x386726,
  senderNumber: _0xe2dfa3,
  botNumber2: _0x1b6f1d,
  botNumber: _0x15d2d5,
  pushname: _0x3511db,
  isMe: _0x4dc291,
  isOwner: _0x36b0d6,
  groupMetadata: _0x50729b,
  groupName: _0x7d67ae,
  participants: _0x57f6d6,
  groupAdmins: _0x5296a0,
  isBotAdmins: _0x54ad60,
  isAdmins: _0x27f43f,
  reply: _0x5e68b2
}) => {
  try {
    if (!_0x4da4fa) {
      return _0x788d94.reply("Please provide a valid MediaFire link.");
    }
    _0x788d94.react('⬇️');
    const _0x206b82 = await axios.get('https://www.dark-yasiya-api.site/download/mfire?url=' + _0x4da4fa);
    const _0x2d69c7 = _0x206b82.data;
    if (!_0x2d69c7 || !_0x2d69c7.status || !_0x2d69c7.result || !_0x2d69c7.result.dl_link) {
      return _0x788d94.reply("Failed to fetch MediaFire download link. Ensure the link is valid and public.");
    }
    const _0x24c64d = _0x2d69c7.result.dl_link;
    const _0x107843 = _0x2d69c7.result.fileName || "mediafire_download";
    const _0xecfe76 = _0x2d69c7.result.fileType || "application/octet-stream";
    _0x788d94.react('⬆️');
    let _0x3ba839 = "\n        ┏━┫*⚬ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ-ᴍꜰɪʀᴇ⚬*┣━✾\n┃  \n*ꜰɪʟᴇ ɴᴀᴍᴇ :* " + _0x107843 + "\n\n*ꜰɪʟᴇ ᴛʏᴘᴇ :* " + _0xecfe76 + "\n\n> ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ ✻\n        ";
    await _0x3ab728.sendMessage(_0x47d2c3, {
      'document': {
        'url': _0x24c64d
      },
      'mimetype': _0xecfe76,
      'fileName': _0x107843,
      'caption': _0x3ba839
    }, {
      'quoted': _0x3d159f
    });
  } catch (_0x41ba96) {
    console.error(_0x41ba96);
    _0x5e68b2("An error occurred: " + _0x41ba96.message);
  }
});
cmd({
  'pattern': 'ig',
  'alias': ["insta"],
  'desc': "To download instagram videos.",
  'react': '🎥',
  'category': "download",
  'filename': __filename
}, async (_0x386562, _0x1b4817, _0x2d5654, {
  from: _0x2b1245,
  quoted: _0x35994d,
  body: _0x3ef60e,
  isCmd: _0x445688,
  command: _0x28d49a,
  args: _0x353941,
  q: _0x133e89,
  isGroup: _0xae87fe,
  sender: _0x2dff22,
  senderNumber: _0x37d5bb,
  botNumber2: _0x49a8d8,
  botNumber: _0x2ef999,
  pushname: _0x535d59,
  isMe: _0x231e91,
  isOwner: _0x299df6,
  groupMetadata: _0x162e52,
  groupName: _0x647ac4,
  participants: _0x5409f2,
  groupAdmins: _0x36386c,
  isBotAdmins: _0x2ec1e7,
  isAdmins: _0x318dfb,
  reply: _0x1bd856
}) => {
  try {
    if (!_0x133e89) {
      return _0x2d5654.reply("Please Give Me a vaild Link...");
    }
    _0x2d5654.react('⬇️');
    let _0x46b060 = await igdl(_0x133e89);
    let _0x2ec7e8 = await _0x46b060.data;
    for (let _0x2c5a94 = 0x0; _0x2c5a94 < 0x14; _0x2c5a94++) {
      let _0x226a29 = _0x2ec7e8[_0x2c5a94];
      let _0x3d32a8 = _0x226a29.url;
      _0x2d5654.react('⬆️');
      await _0x386562.sendMessage(_0x2b1245, {
        'video': {
          'url': _0x3d32a8
        },
        'mimetype': "video/mp4",
        'caption': "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ · · ·⁴³²*"
      }, {
        'quoted': _0x1b4817
      });
      _0x2d5654.react('✅');
    }
  } catch (_0x169bd8) {
    console.log(_0x169bd8);
  }
});
async function xdl(_0x1875a8) {
  return new Promise((_0x22f9b0, _0x3f4b9e) => {
    fetch('' + _0x1875a8, {
      'method': "get"
    }).then(_0x3cefbd => _0x3cefbd.text()).then(_0x313b57 => {
      const _0x469b1a = cheerio.load(_0x313b57, {
        'xmlMode': false
      });
      const _0x38f938 = _0x469b1a("meta[property=\"og:title\"]").attr('content');
      const _0x15a94a = _0x469b1a("meta[property=\"og:duration\"]").attr("content");
      const _0x555a9c = _0x469b1a("meta[property=\"og:image\"]").attr("content");
      const _0x2c4ecd = _0x469b1a("meta[property=\"og:video:type\"]").attr("content");
      const _0x3c4e1d = _0x469b1a("meta[property=\"og:video:width\"]").attr("content");
      const _0x184840 = _0x469b1a("meta[property=\"og:video:height\"]").attr('content');
      const _0x2275cf = _0x469b1a("span.metadata").text();
      const _0x486d37 = _0x469b1a("#video-player-bg > script:nth-child(6)").html();
      const _0x282510 = {
        'low': (_0x486d37.match("html5player.setVideoUrlLow\\('(.*?)'\\);") || [])[0x1],
        'high': _0x486d37.match("html5player.setVideoUrlHigh\\('(.*?)'\\);" || [])[0x1],
        'HLS': _0x486d37.match("html5player.setVideoHLS\\('(.*?)'\\);" || [])[0x1],
        'thumb': _0x486d37.match("html5player.setThumbUrl\\('(.*?)'\\);" || [])[0x1],
        'thumb69': _0x486d37.match("html5player.setThumbUrl169\\('(.*?)'\\);" || [])[0x1],
        'thumbSlide': _0x486d37.match("html5player.setThumbSlide\\('(.*?)'\\);" || [])[0x1],
        'thumbSlideBig': _0x486d37.match("html5player.setThumbSlideBig\\('(.*?)'\\);" || [])[0x1]
      };
      _0x22f9b0({
        'status': true,
        'result': {
          'title': _0x38f938,
          'URL': _0x1875a8,
          'duration': _0x15a94a,
          'image': _0x555a9c,
          'videoType': _0x2c4ecd,
          'videoWidth': _0x3c4e1d,
          'videoHeight': _0x184840,
          'info': _0x2275cf,
          'files': _0x282510
        }
      });
    })["catch"](_0x502863 => _0x3f4b9e({
      'status': false,
      'result': _0x502863
    }));
  });
}
cmd({
  'pattern': "xnxxdown",
  'alias': ["dlxnxx", "xnxxdl"],
  'react': '🫣',
  'desc': "Download xnxx videos",
  'category': "nsfw",
  'use': ".xnxx <xnxx link>",
  'filename': __filename
}, async (_0x3fc871, _0x3d925e, _0x17916a, {
  from: _0x57ce05,
  l: _0xa610c0,
  quoted: _0x3ba617,
  body: _0x554283,
  isCmd: _0x3469a3,
  command: _0x94c3d2,
  args: _0x16e2a1,
  q: _0x1eede5,
  isGroup: _0x23f46e,
  sender: _0x312a3e,
  senderNumber: _0x4ce309,
  botNumber2: _0x3bb01c,
  botNumber: _0x3636ad,
  pushname: _0x267973,
  isMe: _0x1b9df7,
  isOwner: _0xe3d46e,
  groupMetadata: _0x5ced92,
  groupName: _0x2ef9fa,
  participants: _0xb8c9e5,
  groupAdmins: _0x45b015,
  isBotAdmins: _0x1d1da6,
  isAdmins: _0x40133b,
  reply: _0x251394
}) => {
  try {
    if (!_0x1eede5) {
      return _0x251394("*Please give me url !!*");
    }
    let _0x32cdc8 = await xdl(_0x1eede5);
    let _0x255422 = _0x32cdc8.result.title;
    await _0x3fc871.sendMessage(_0x57ce05, {
      'video': {
        'url': _0x32cdc8.result.files.high
      },
      'caption': _0x255422
    }, {
      'quoted': _0x3d925e
    });
  } catch (_0xf619b4) {
    _0x251394("*Error !!*");
    console.log(_0xf619b4);
  }
});
cmd({
  'pattern': "xvdown",
  'alias': ["dlxv", "xvdl"],
  'react': '🫣',
  'desc': "Download xvideos videos",
  'category': "nsfw",
  'use': ".xv <xvideos link>",
  'filename': __filename
}, async (_0x247db1, _0x119628, _0xcf4960, {
  from: _0x3b0c57,
  l: _0x1d5f2b,
  quoted: _0x4a0527,
  body: _0x39aff3,
  isCmd: _0x2fad82,
  command: _0x470e95,
  args: _0x2898f9,
  q: _0xa91317,
  isGroup: _0x220294,
  sender: _0x53faf9,
  senderNumber: _0xfda322,
  botNumber2: _0x33cdc3,
  botNumber: _0x3eab2d,
  pushname: _0x248e0b,
  isMe: _0x3fda84,
  isOwner: _0x2fc437,
  groupMetadata: _0x1e88b5,
  groupName: _0x3d278c,
  participants: _0x5a61ad,
  groupAdmins: _0x105288,
  isBotAdmins: _0x3a28bb,
  isAdmins: _0x4c7d0d,
  reply: _0x51e6c6
}) => {
  try {
    if (!_0xa91317) {
      return _0x51e6c6("*Please give me url !!*");
    }
    let _0x5dfef2 = await fetchJson("https://www.dark-yasiya-api.site/download/xvideo?url=" + _0xa91317);
    const _0x5a66af = "\n   🔞 *XVIDEO DOWNLOADER* 🔞\n\n     \n• *Title* - " + _0x5dfef2.result.title + "\n\n• *Views* - " + _0x5dfef2.result.views + "\n\n• *Like* - " + _0x5dfef2.result.like + "\n\n• *Deslike* - " + _0x5dfef2.result.deslike + "\n\n• *Size* - " + _0x5dfef2.result.size;
    await _0x247db1.sendMessage(_0x3b0c57, {
      'video': {
        'url': _0x5dfef2.result.dl_link
      },
      'caption': _0x5a66af
    }, {
      'quoted': _0x119628
    });
  } catch (_0x2c19b6) {
    _0x51e6c6("*Error !!*");
    console.log(_0x2c19b6);
  }
});
const fs = require('fs');
const path = require("path");
cmd({
  'pattern': "baiscope",
  'alias': ["movie2"],
  'react': '📑',
  'category': "download",
  'desc': 'baiscope.lk',
  'filename': __filename
}, async (_0xe3f231, _0x4bd58e, _0x189921, {
  from: _0x195bec,
  q: _0x464db7,
  isDev: _0x49b482,
  reply: _0x4ee609
}) => {
  try {
    if (!_0x464db7) {
      return await _0x4ee609("*Please provide a search query! (e.g., Avatar)*");
    }
    const _0x25ae15 = 'https://www.baiscope.lk/?s=' + encodeURIComponent(_0x464db7);
    const _0x3ee23b = await axios.get(_0x25ae15);
    const _0x50435e = cheerio.load(_0x3ee23b.data);
    let _0x4d43f1 = [];
    _0x50435e('article.elementor-post').each((_0x2b6f1e, _0x36c616) => {
      const _0x4f2aba = _0x50435e(_0x36c616).find("h5.elementor-post__title > a").text().trim();
      const _0x3e71ec = _0x50435e(_0x36c616).find("h5.elementor-post__title > a").attr("href");
      const _0x4106eb = _0x50435e(_0x36c616).find(".elementor-post__thumbnail img").attr("src");
      if (_0x4f2aba && _0x3e71ec && _0x4106eb) {
        _0x4d43f1.push({
          'title': _0x4f2aba,
          'episodeLink': _0x3e71ec,
          'imgUrl': _0x4106eb
        });
      }
    });
    if (_0x4d43f1.length === 0x0) {
      return await _0x4ee609("No results found for: " + _0x464db7);
    }
    let _0x14feea = "📺 Search Results for *" + _0x464db7 + ":*\n\n";
    _0x4d43f1.forEach((_0x352480, _0x5acfc4) => {
      _0x14feea += '*' + (_0x5acfc4 + 0x1) + ".* " + _0x352480.title + "\n🔗 Link: " + _0x352480.episodeLink + "\n\n";
    });
    const _0x37c506 = await _0xe3f231.sendMessage(_0x195bec, {
      'text': _0x14feea
    }, {
      'quoted': _0x189921
    });
    const _0x4e140d = _0x37c506.key.id;
    _0xe3f231.ev.on("messages.upsert", async _0x29e3fd => {
      const _0x28ef4d = _0x29e3fd.messages[0x0];
      if (!_0x28ef4d.message) {
        return;
      }
      const _0x1f10f3 = _0x28ef4d.message.conversation || _0x28ef4d.message.extendedTextMessage?.["text"];
      const _0x29ef5e = _0x28ef4d.key.remoteJid;
      const _0x49bbc0 = _0x28ef4d.message.extendedTextMessage && _0x28ef4d.message.extendedTextMessage.contextInfo.stanzaId === _0x4e140d;
      if (_0x49bbc0) {
        const _0x34c5d6 = parseInt(_0x1f10f3.trim());
        if (!isNaN(_0x34c5d6) && _0x34c5d6 > 0x0 && _0x34c5d6 <= _0x4d43f1.length) {
          const _0x12f737 = _0x4d43f1[_0x34c5d6 - 0x1];
          const _0x1cd6d7 = await axios.get(_0x12f737.episodeLink);
          const _0x2d28d2 = cheerio.load(_0x1cd6d7.data);
          const _0x16231a = _0x2d28d2("a.dlm-buttons-button").attr('href');
          if (_0x16231a) {
            await _0xe3f231.sendMessage(_0x29ef5e, {
              'image': {
                'url': _0x12f737.imgUrl
              },
              'caption': "🎬 *" + _0x12f737.title + "*\n🔗 Link: " + _0x12f737.episodeLink + "\n⬇️ Download will follow."
            }, {
              'quoted': _0x28ef4d
            });
            const _0x32029c = path.join(__dirname, 'downloaded_episode.zip');
            const _0x29c8e0 = fs.createWriteStream(_0x32029c);
            const _0x23fc82 = await axios({
              'url': _0x16231a,
              'method': "GET",
              'responseType': "stream"
            });
            _0x23fc82.data.pipe(_0x29c8e0);
            _0x29c8e0.on("finish", async () => {
              await _0xe3f231.sendMessage(_0x29ef5e, {
                'document': {
                  'url': _0x32029c
                },
                'mimetype': "application/zip",
                'fileName': _0x12f737.title + ".zip",
                'caption': '*' + _0x12f737.title + "*\n\n> Lααɾα-ᴍᴅ ✻"
              }, {
                'quoted': _0x28ef4d
              });
              fs.unlinkSync(_0x32029c);
            });
            _0x29c8e0.on("error", _0xf6647a => {
              console.error("Error downloading ZIP file:", _0xf6647a);
              _0x4ee609("*Error downloading the episode ZIP file.*");
            });
          } else {
            await _0x4ee609("*Download link not found for the selected episode.*");
          }
        } else {
          await _0x4ee609("*Invalid selection. Please choose a valid number.*");
        }
      }
    });
  } catch (_0x59ac25) {
    console.error(_0x59ac25);
    await _0x4ee609("*An error occurred while scraping the data.*");
  }
});
cmd({
  'pattern': 'ginisisila',
  'react': '📑',
  'category': 'download',
  'desc': "ginisisilacartoon.net",
  'filename': __filename
}, async (_0x5049fe, _0x194cab, _0x31c6bb, {
  from: _0x2287e7,
  q: _0x4564d6,
  isDev: _0x2a68be,
  reply: _0xc4807
}) => {
  try {
    if (!_0x4564d6) {
      return await _0xc4807("*Please provide a search query! (e.g., Garfield)*");
    }
    const _0x2e5011 = "https://ginisisilacartoon.net/search.php?q=" + encodeURIComponent(_0x4564d6);
    const _0x1a1ec0 = await axios.get(_0x2e5011);
    const _0x4099bd = cheerio.load(_0x1a1ec0.data);
    let _0x572788 = [];
    _0x4099bd("div.inner-video-cell").each((_0xaa6fae, _0x2e2bcc) => {
      const _0x4f6705 = _0x4099bd(_0x2e2bcc).find("div.video-title > a").attr('title');
      const _0x599247 = _0x4099bd(_0x2e2bcc).find("div.posted-time").text().trim();
      const _0x25bca3 = _0x4099bd(_0x2e2bcc).find("div.video-title > a").attr('href');
      const _0x5d44de = _0x4099bd(_0x2e2bcc).find("div.inner-video-thumb-wrapper img").attr("src");
      if (_0x4f6705 && _0x25bca3) {
        _0x572788.push({
          'title': _0x4f6705,
          'postedTime': _0x599247,
          'episodeLink': 'https://ginisisilacartoon.net/' + _0x25bca3,
          'imageUrl': _0x5d44de
        });
      }
    });
    if (_0x572788.length === 0x0) {
      return await _0xc4807("No results found for: " + _0x4564d6);
    }
    let _0x22c31b = "📺 Search Results for *" + _0x4564d6 + ":*\n\n";
    _0x572788.forEach((_0x16cf4a, _0x35b536) => {
      _0x22c31b += '*' + (_0x35b536 + 0x1) + ".* " + _0x16cf4a.title + "\n🗓️ Posted: " + _0x16cf4a.postedTime + "\n🔗 Link: " + _0x16cf4a.episodeLink + "\n\n";
    });
    const _0x5a1342 = await _0x5049fe.sendMessage(_0x2287e7, {
      'text': _0x22c31b
    }, {
      'quoted': _0x31c6bb
    });
    const _0x27a596 = _0x5a1342.key.id;
    _0x5049fe.ev.on("messages.upsert", async _0x9a7b7a => {
      const _0x171143 = _0x9a7b7a.messages[0x0];
      if (!_0x171143.message) {
        return;
      }
      const _0x14f608 = _0x171143.message.conversation || _0x171143.message.extendedTextMessage?.["text"];
      const _0x4a17a3 = _0x171143.key.remoteJid;
      const _0x14e10e = _0x171143.message.extendedTextMessage && _0x171143.message.extendedTextMessage.contextInfo.stanzaId === _0x27a596;
      if (_0x14e10e) {
        const _0x284411 = parseInt(_0x14f608.trim());
        if (!isNaN(_0x284411) && _0x284411 > 0x0 && _0x284411 <= _0x572788.length) {
          const _0x1d0aed = _0x572788[_0x284411 - 0x1];
          const _0x189e89 = "*🪄 ɴᴀᴍᴇ:-* " + _0x1d0aed.title + "\n⏳ *ᴅᴀᴛᴇ:-* " + _0x1d0aed.postedTime + "\n📎 *ᴇᴘɪꜱᴏᴅᴇ ʟɪɴᴋ*:- " + _0x1d0aed.episodeLink + "\n\n☘ *We are uploading the Movie/Episode you requested.*";
          const _0x456cc9 = {
            'image': {
              'url': _0x1d0aed.imageUrl
            },
            'caption': _0x189e89
          };
          await _0x5049fe.sendMessage(_0x4a17a3, _0x456cc9, {
            'quoted': _0x171143
          });
          const _0x175d46 = await axios.get(_0x1d0aed.episodeLink);
          const _0x1559da = cheerio.load(_0x175d46.data);
          const _0x32f8e7 = _0x1559da("div#player-holder iframe").attr('src');
          if (_0x32f8e7) {
            const _0x1a4a74 = 'https://api.fgmods.xyz/api/downloader/gdrive?url=' + _0x32f8e7 + "&apikey=mnp3grlZ";
            try {
              const _0xc4e6f4 = await axios.get(_0x1a4a74);
              const _0x46edb0 = _0xc4e6f4.data.result.downloadUrl;
              if (_0x46edb0) {
                await _0x5049fe.sendMessage(_0x4a17a3, {
                  'document': {
                    'url': _0x46edb0
                  },
                  'mimetype': "video/mp4",
                  'fileName': "BUMBLEBEE-XMD | " + _0x1d0aed.title + '.mp4',
                  'caption': _0x1d0aed.title + " |  *sɪʟᴇɴᴛ ʟᴏᴠᴇʀ*\n\n> ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ"
                }, {
                  'quoted': _0x171143
                });
              } else {
                await _0xc4807("Failed to retrieve the download link for this episode.");
              }
            } catch (_0x587198) {
              console.error("Error fetching the download link:", _0x587198);
              await _0xc4807("An error occurred while trying to fetch the download link.");
            }
          } else {
            await _0xc4807("No downloadable link found for this episode.");
          }
        } else {
          await _0xc4807("Please reply with a valid number from the list.");
        }
      }
    });
  } catch (_0x546741) {
    _0xc4807("*Error occurred while scraping!*");
    console.error(_0x546741);
  }
});
cmd({
  'pattern': 'apk',
  'desc': "Download apk.",
  'category': "download",
  'filename': __filename
}, async (_0x56da32, _0x48f780, _0x3cbff5, {
  from: _0xbd3b9f,
  quoted: _0x4b0680,
  body: _0x47a4ce,
  isCmd: _0x29a752,
  command: _0x2a8424,
  args: _0x250a28,
  q: _0x54cc58,
  isGroup: _0x16cbe0,
  sender: _0x17550c,
  senderNumber: _0x556524,
  botNumber2: _0x16c4b8,
  botNumber: _0xd53bda,
  pushname: _0x294a90,
  isMe: _0x398266,
  isOwner: _0x42c853,
  groupMetadata: _0x45e657,
  groupName: _0x446505,
  participants: _0x4fde9a,
  groupAdmins: _0x3535c9,
  isBotAdmins: _0x14db6c,
  isAdmins: _0x459724,
  reply: _0x31b608
}) => {
  try {
    await _0x3cbff5.react('⬇');
    const _0x34981b = "http://ws75.aptoide.com/api/7/apps/search/query=" + _0x54cc58 + '/limit=1';
    const _0xefc061 = await axios.get(_0x34981b);
    const _0x35ebe9 = _0xefc061.data;
    let _0x9dad20 = _0x35ebe9.datalist.list[0x0].size % 0xf4240;
    let _0xd49d48 = '.' + _0x9dad20;
    let _0x1d38a3 = _0x35ebe9.datalist.list[0x0].size / 0xf4240;
    let _0x5a853a = _0x1d38a3 - _0xd49d48;
    let _0x408ceb = "\n*⚬ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ-ᴀᴘᴋ⚬*  \n*🏷️ Nᴀᴍᴇ :* " + _0x35ebe9.datalist.list[0x0].name + "\n\n*📦 Sɪᴢᴇ :* " + _0x5a853a + "MB\n\n*🔖 Pᴀᴄᴋᴀɢᴇ :* " + _0x35ebe9.datalist.list[0x0]['package'] + "\n\n*📆 Lᴀꜱᴛ Uᴘᴅᴀᴛᴇ :* " + _0x35ebe9.datalist.list[0x0].updated + "\n\n*👤 Dᴇᴠᴇʟᴏᴘᴇʀꜱ :* " + _0x35ebe9.datalist.list[0x0].developer.name + "\n\n> ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ ✻\n";
    await _0x3cbff5.react('⬆');
    await _0x56da32.sendMessage(_0xbd3b9f, {
      'document': {
        'url': _0x35ebe9.datalist.list[0x0].file.path_alt
      },
      'fileName': _0x35ebe9.datalist.list[0x0].name,
      'mimetype': "application/vnd.android.package-archive",
      'caption': _0x408ceb
    }, {
      'quoted': _0x48f780
    });
    await _0x3cbff5.react('✅');
  } catch (_0x26a136) {
    console.log(_0x26a136);
    _0x31b608('' + _0x26a136);
  }
});
const {
  sinhalaSub
} = require("mrnima-moviedl");
cmd({
  'pattern': "sinhalasub",
  'alias': ["movie"],
  'react': '📑',
  'category': "download",
  'desc': "Search movies on sinhalasub and get download links",
  'filename': __filename
}, async (_0x3dfd8e, _0x4ceff8, _0xe26d99, {
  from: _0x4a183a,
  q: _0x2f9e41,
  reply: _0x20f27b
}) => {
  try {
    if (!_0x2f9e41) {
      return await _0x20f27b("*Please provide a search query! (e.g., Deadpool)*");
    }
    var _0xb3afe = await sinhalaSub();
    const _0x5c943b = await _0xb3afe.search(_0x2f9e41);
    const _0x66d8c6 = _0x5c943b.result.slice(0x0, 0xa);
    if (!_0x66d8c6 || _0x66d8c6.length === 0x0) {
      return await _0x20f27b("No results found for: " + _0x2f9e41);
    }
    let _0x563ad3 = "📽️ *Search Results for* \"" + _0x2f9e41 + "\":\n\n";
    _0x66d8c6.forEach((_0x5634fb, _0x85e080) => {
      _0x563ad3 += '*' + (_0x85e080 + 0x1) + ".* " + _0x5634fb.title + "\n🔗 Link: " + _0x5634fb.link + "\n\n";
    });
    const _0x5c02b8 = await _0x3dfd8e.sendMessage(_0x4a183a, {
      'text': _0x563ad3
    }, {
      'quoted': _0xe26d99
    });
    const _0xc5b266 = _0x5c02b8.key.id;
    _0x3dfd8e.ev.on("messages.upsert", async _0x3276da => {
      const _0x220196 = _0x3276da.messages[0x0];
      if (!_0x220196.message) {
        return;
      }
      const _0x3f6bef = _0x220196.message.conversation || _0x220196.message.extendedTextMessage?.['text'];
      const _0xfacf40 = _0x220196.message.extendedTextMessage && _0x220196.message.extendedTextMessage.contextInfo.stanzaId === _0xc5b266;
      if (_0xfacf40) {
        const _0x5975fb = parseInt(_0x3f6bef.trim());
        if (!isNaN(_0x5975fb) && _0x5975fb > 0x0 && _0x5975fb <= _0x66d8c6.length) {
          const _0x51bcf2 = _0x66d8c6[_0x5975fb - 0x1];
          const _0x3c116b = "https://api-site-2.vercel.app/api/sinhalasub/movie?url=" + encodeURIComponent(_0x51bcf2.link);
          try {
            const _0x306fd2 = await axios.get(_0x3c116b);
            const _0x4bd79a = _0x306fd2.data.result;
            const _0x446048 = _0x4bd79a.dl_links || [];
            if (_0x446048.length === 0x0) {
              return await _0x20f27b("No PixelDrain links found.");
            }
            let _0x3dc978 = "🎥 *" + _0x4bd79a.title + "*\n\n";
            _0x3dc978 += "*Available PixelDrain Download Links:*\n";
            _0x446048.forEach((_0x359c3a, _0x5298f6) => {
              _0x3dc978 += '*' + (_0x5298f6 + 0x1) + ".* " + _0x359c3a.quality + " - " + _0x359c3a.size + "\n🔗 Link: " + _0x359c3a.link + "\n\n";
            });
            const _0xf30520 = await _0x3dfd8e.sendMessage(_0x4a183a, {
              'text': _0x3dc978
            }, {
              'quoted': _0x220196
            });
            const _0xe5d24f = _0xf30520.key.id;
            _0x3dfd8e.ev.on('messages.upsert', async _0xbe427f => {
              const _0x5e6a04 = _0xbe427f.messages[0x0];
              if (!_0x5e6a04.message) {
                return;
              }
              const _0x3e46b6 = _0x5e6a04.message.conversation || _0x5e6a04.message.extendedTextMessage?.['text'];
              const _0x14cafc = _0x5e6a04.message.extendedTextMessage && _0x5e6a04.message.extendedTextMessage.contextInfo.stanzaId === _0xe5d24f;
              if (_0x14cafc) {
                const _0x315031 = parseInt(_0x3e46b6.trim());
                if (!isNaN(_0x315031) && _0x315031 > 0x0 && _0x315031 <= _0x446048.length) {
                  const _0x2677a1 = _0x446048[_0x315031 - 0x1];
                  const _0x58dd91 = _0x2677a1.link.split('/').pop();
                  await _0x3dfd8e.sendMessage(_0x4a183a, {
                    'react': {
                      'text': '⬇️',
                      'key': _0xe26d99.key
                    }
                  });
                  const _0x27bb65 = "https://pixeldrain.com/api/file/" + _0x58dd91;
                  await _0x3dfd8e.sendMessage(_0x4a183a, {
                    'react': {
                      'text': '⬆',
                      'key': _0xe26d99.key
                    }
                  });
                  await _0x3dfd8e.sendMessage(_0x4a183a, {
                    'document': {
                      'url': _0x27bb65
                    },
                    'mimetype': "video/mp4",
                    'fileName': _0x4bd79a.title + " - " + _0x2677a1.quality + '.mp4',
                    'caption': _0x4bd79a.title + "\nQuality: " + _0x2677a1.quality + "\nPowered by SinhalaSub",
                    'contextInfo': {
                      'mentionedJid': [],
                      'externalAdReply': {
                        'title': _0x4bd79a.title,
                        'body': "Download powered by ᴄᴀsᴇʏʀʜᴏᴅᴇs-xᴍᴅ⁴³²",
                        'mediaType': 0x1,
                        'sourceUrl': _0x51bcf2.link,
                        'thumbnailUrl': _0x4bd79a.image
                      }
                    }
                  }, {
                    'quoted': _0x5e6a04
                  });
                  await _0x3dfd8e.sendMessage(_0x4a183a, {
                    'react': {
                      'text': '✅',
                      'key': _0xe26d99.key
                    }
                  });
                } else {
                  await _0x20f27b("Invalid selection. Please reply with a valid number.");
                }
              }
            });
          } catch (_0x3bf620) {
            console.error("Error fetching movie details:", _0x3bf620);
            await _0x20f27b("An error occurred while fetching movie details. Please try again.");
          }
        } else {
          await _0x20f27b("Invalid selection. Please reply with a valid number.");
        }
      }
    });
  } catch (_0x14553d) {
    console.error("Error during search:", _0x14553d);
    _0x20f27b("*An error occurred while searching!*");
  }
});
cmd({
  'pattern': 'gdrive',
  'desc': "To download Gdrive files.",
  'react': '🌐',
  'category': "download",
  'filename': __filename
}, async (_0x58a7b9, _0x5afcc4, _0x5e2655, {
  from: _0x5b710a,
  quoted: _0x23793c,
  body: _0x3586c0,
  isCmd: _0x1f2c01,
  command: _0x30818b,
  args: _0x1df778,
  q: _0x1ff06b,
  isGroup: _0x885c21,
  sender: _0x3fc8ee,
  senderNumber: _0x2ef068,
  botNumber2: _0x57d22a,
  botNumber: _0x15ad9b,
  pushname: _0x345ee7,
  isMe: _0x31cf21,
  isOwner: _0xfa9a0f,
  groupMetadata: _0x5ac9c0,
  groupName: _0x3c0484,
  participants: _0x34e37a,
  groupAdmins: _0x1f87c7,
  isBotAdmins: _0x1de475,
  isAdmins: _0x393542,
  reply: _0x2f4ebd
}) => {
  try {
    await _0x58a7b9.sendMessage(_0x5b710a, {
      'react': {
        'text': '⬇️',
        'key': _0x5afcc4.key
      }
    });
    if (!_0x1ff06b) {
      return _0x5e2655.reply("Please Give Me a vaild Link...");
    }
    const _0x59e841 = "https://api.fgmods.xyz/api/downloader/gdrive?url=" + _0x1ff06b + '&apikey=mnp3grlZ';
    const _0x5736f7 = await axios.get(_0x59e841);
    const _0x43e539 = _0x5736f7.data.result.downloadUrl;
    if (_0x43e539) {
      await _0x58a7b9.sendMessage(_0x5b710a, {
        'react': {
          'text': '⬆️',
          'key': _0x5afcc4.key
        }
      });
      await _0x58a7b9.sendMessage(_0x5b710a, {
        'document': {
          'url': _0x43e539
        },
        'mimetype': _0x5736f7.data.result.mimetype,
        'fileName': _0x5736f7.data.result.fileName,
        'caption': "*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ · · ·⁸⁷⁶*\n\n> ʙᴜᴍʙʟᴇʙᴇᴇ-xᴍᴅ ✻"
      }, {
        'quoted': _0x5afcc4
      });
    }
    await _0x58a7b9.sendMessage(_0x5b710a, {
      'react': {
        'text': '✅',
        'key': _0x5afcc4.key
      }
    });
  } catch (_0x460920) {
    console.log(_0x460920);
  }
});