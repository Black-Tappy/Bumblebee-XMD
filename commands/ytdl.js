function hi() {
  console.log("Hello World!");
}
hi();
function hi() {
  console.log("Hello World!");
}
hi();
function hi() {
  console.log("Hello World!");
}
hi();
const {
  cmd,
  commands
} = require("../command");
const yts = require("yt-search");
const {
  fetchJson
} = require("../lib/functions");
const axios = require("axios");
async function ytmp4(_0x523157, _0x3ebc43) {
  try {
    if (!_0x523157 || !_0x3ebc43) {
      throw new Error("url and format parameters are required.");
    }
    const _0x347aa2 = parseInt(_0x3ebc43.replace('p', ''), 10);
    const _0x42ca4b = {
      'button': 0x1,
      'start': 0x1,
      'end': 0x1,
      'format': _0x347aa2,
      'url': _0x523157
    };
    const _0x55c14a = {
      'Accept': "*/*",
      'Accept-Encoding': "gzip, deflate, br",
      'Accept-Language': "en-GB,en-US;q=0.9,en;q=0.8",
      'Origin': "https://loader.to",
      'Referer': "https://loader.to",
      'Sec-Ch-Ua': "\"Not-A.Brand\";v=\"99\", \"Chromium\";v=\"124\"",
      'Sec-Ch-Ua-Mobile': '?1',
      'Sec-Ch-Ua-Platform': "\"Android\"",
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Mode': "cors",
      'Sec-Fetch-Site': "cross-site",
      'User-Agent': "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
    };
    const _0xa34acd = await axios.get("https://ab.cococococ.com/ajax/download.php", {
      'params': _0x42ca4b,
      'headers': _0x55c14a
    });
    const _0x4e907e = _0xa34acd.data.id;
    const _0x121c98 = async () => {
      const _0xb6142e = {
        'id': _0x4e907e
      };
      try {
        const _0x40e5d4 = await axios.get("https://p.oceansaver.in/ajax/progress.php", {
          'params': _0xb6142e,
          'headers': _0x55c14a
        });
        const {
          progress: _0x33119e,
          download_url: _0x188e58,
          text: _0x369b46
        } = _0x40e5d4.data;
        return _0x369b46 === "Finished" ? _0x188e58 : (await new Promise(_0x2e5cd6 => setTimeout(_0x2e5cd6, 1000)), _0x121c98());
      } catch (_0x56e57a) {
        throw new Error("Error in progress check: " + _0x56e57a.message);
      }
    };
    return await _0x121c98();
  } catch (_0x540329) {
    console.error("Error:", _0x540329);
    return {
      'error': _0x540329.message
    };
  }
}
module.exports = {
  'ytmp4': ytmp4
};
function extractYouTubeId(_0x1d0e1a) {
  const _0x17852c = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|playlist\?list=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const _0x35358b = _0x1d0e1a.match(_0x17852c);
  return _0x35358b ? _0x35358b[1] : null;
}
function convertYouTubeLink(_0x1de75a) {
  const _0xf0fcba = extractYouTubeId(_0x1de75a);
  if (_0xf0fcba) {
    return "https://www.youtube.com/watch?v=" + _0xf0fcba;
  }
  return _0x1de75a;
}
cmd({
  'pattern': "song",
  'alias': ["play", "ytmp3"],
  'desc': "To download songs.",
  'react': '🔎',
  'category': "download",
  'filename': __filename
}, async (_0x37349a, _0x1af21f, _0x557c70, {
  from: _0x3ac1b4,
  quoted: _0x5eb6d2,
  body: _0x2c8fb5,
  isCmd: _0x266087,
  command: _0x2dc105,
  args: _0x5cc583,
  q: _0x1e59ad,
  isGroup: _0x16b551,
  sender: _0x38acb5,
  senderNumber: _0x2759ff,
  botNumber2: _0x15e9c1,
  botNumber: _0x36c2df,
  pushname: _0x57aa7c,
  isMe: _0x36f40a,
  isOwner: _0x5d42fc,
  groupMetadata: _0x4afdff,
  groupName: _0x591832,
  participants: _0x50f606,
  groupAdmins: _0x2820fe,
  isBotAdmins: _0x8cc462,
  isAdmins: _0x2f0ed4,
  reply: _0x31754f
}) => {
  try {
    if (!_0x1e59ad) {
      return _0x31754f("Please give me a URL or title. Eg .play Lily By Alan Walker");
    }
    _0x1e59ad = convertYouTubeLink(_0x1e59ad);
    const _0x448232 = await yts(_0x1e59ad);
    const _0x43e446 = _0x448232.videos[0];
    const _0x2f3b12 = _0x43e446.url;
    const _0x20dd4d = await _0x37349a.sendMessage(_0x3ac1b4, {
      'image': {
        'url': _0x43e446.thumbnail
      },
      'caption': "\n *🍀 `ꜱʜᴀᴅᴏᴡ-xᴍᴅ` 🍀*\n\n⟣━━━━━━━━━━━━━━━━━⟢\n*ꜱʜᴀᴅᴏᴡ-xᴍᴅ sᴏɴɢ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*\n⟣━━━━━━━━━━━━━━━━━⟢\n\n➣ *🎐ꜱʜᴀᴅᴏᴡ-xᴍᴅ ʙᴏᴛ ᴄʜᴀɴɴᴇʟ🎐*\n*https://whatsapp.com/channel/0029VasHgfG4tRrwjAUyTs10*\n\n⟣━━━━━━━━━━━━━━━━━━⟢\n> ℹ️ ʀᴇᴘʟʏ ᴡɪᴛʜ ɴᴜᴍʙᴇʀ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ғᴏʀᴍᴀᴛ\n\n*1 ┃ ᴀᴜᴅɪᴏ sᴏɴɢ 🎵*\n*2 ┃ ᴅᴏᴄᴜᴍᴇɴᴛ sᴏɴɢ 🗂️*\n\n> © ꜱʜᴀᴅᴏᴡ-xᴍᴅ ʙ.ᴡᴀ.ʙᴏᴛ\n"
    }, {
      'quoted': _0x1af21f
    });
    const _0x1a6988 = _0x20dd4d.key.id;
    _0x37349a.ev.on("messages.upsert", async _0x9c89e5 => {
      const _0x3c8afd = _0x9c89e5.messages[0];
      if (!_0x3c8afd.message) {
        return;
      }
      const _0x448ac2 = _0x3c8afd.message.conversation || _0x3c8afd.message.extendedTextMessage?.["text"];
      const _0x3fa0fc = _0x3c8afd.key.remoteJid;
      const _0x497b9b = _0x3c8afd.message.extendedTextMessage && _0x3c8afd.message.extendedTextMessage.contextInfo.stanzaId === _0x1a6988;
      if (_0x497b9b) {
        await _0x37349a.sendMessage(_0x3fa0fc, {
          'react': {
            'text': '⬇️',
            'key': _0x3c8afd.key
          }
        });
        const _0x265584 = await fetchJson("https://apis.davidcyriltech.my.id/download/ytmp3?url=" + _0x2f3b12);
        const _0x4fd68e = _0x265584.result.download_url;
        await _0x37349a.sendMessage(_0x3fa0fc, {
          'delete': _0x20dd4d.key
        });
        await _0x37349a.sendMessage(_0x3fa0fc, {
          'react': {
            'text': '⬆️',
            'key': _0x3c8afd.key
          }
        });
        if (_0x448ac2 === '1') {
          await _0x37349a.sendMessage(_0x3fa0fc, {
            'audio': {
              'url': _0x4fd68e
            },
            'mimetype': "audio/mpeg",
            'contextInfo': {
              'externalAdReply': {
                'title': _0x43e446.title,
                'body': _0x43e446.videoId,
                'mediaType': 0x1,
                'sourceUrl': _0x43e446.url,
                'thumbnailUrl': _0x43e446.thumbnail,
                'renderLargerThumbnail': true,
                'showAdAttribution': true
              }
            }
          }, {
            'quoted': _0x3c8afd
          });
          await _0x37349a.sendMessage(_0x3fa0fc, {
            'react': {
              'text': '✅',
              'key': _0x3c8afd.key
            }
          });
        } else if (_0x448ac2 === '2') {
          await _0x37349a.sendMessage(_0x3fa0fc, {
            'document': {
              'url': _0x4fd68e
            },
            'mimetype': "audio/mp3",
            'fileName': _0x43e446.title + ".mp3",
            'caption': "\n> © Gᴇɴᴇʀᴀᴛᴇᴅ ʙʏ ꜱʜᴀᴅᴏᴡ-xᴍᴅ ❤️\n"
          }, {
            'quoted': _0x3c8afd
          });
          await _0x37349a.sendMessage(_0x3fa0fc, {
            'react': {
              'text': '✅',
              'key': _0x3c8afd.key
            }
          });
        }
      }
    });
  } catch (_0x5209ef) {
    console.log(_0x5209ef);
    _0x31754f('' + _0x5209ef);
  }
});
cmd({
  'pattern': "video5",
  'alias': "ytmp4",
  'desc': "To download videos.",
  'react': '🎥',
  'category': "download",
  'filename': __filename
}, async (_0x2a6c7f, _0x1a353e, _0x39ad0f, {
  from: _0x72d2de,
  quoted: _0x19ab81,
  body: _0x3245bf,
  isCmd: _0x39c0b7,
  command: _0x26d004,
  args: _0xa21e40,
  q: _0x3103ac,
  isGroup: _0x24fd91,
  sender: _0x11cd9,
  senderNumber: _0x1ffaa5,
  botNumber2: _0x156ef8,
  botNumber: _0x1768e1,
  pushname: _0x42421d,
  isMe: _0x3a8294,
  isOwner: _0x2d56ed,
  groupMetadata: _0x13f737,
  groupName: _0x5f407a,
  participants: _0x12bcee,
  groupAdmins: _0x31a3e5,
  isBotAdmins: _0x44664d,
  isAdmins: _0x3b6490,
  reply: _0x199b1c
}) => {
  try {
    if (!_0x3103ac) {
      return _0x199b1c("Please give me a URL or title.");
    }
    _0x3103ac = convertYouTubeLink(_0x3103ac);
    const _0x1690ec = await yts(_0x3103ac);
    const _0x71b931 = _0x1690ec.videos[0];
    const _0x3c7f16 = _0x71b931.url;
    const _0x178d16 = await _0x2a6c7f.sendMessage(_0x72d2de, {
      'image': {
        'url': _0x71b931.thumbnail
      },
      'caption': "\n*❄️𝐒𝐇𝐀𝐃𝐎𝐖-𝐗𝐌𝐃❄️* \n\n┏━━━━━━━━━━━━━\n┃ꜱʜᴀᴅᴏᴡ-xᴍᴅ-xᴍᴅ ᴠɪᴅᴇᴏ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ ✻\n┗━━━━━━━━━━━━━\n┏━━━━━━━━━━━━━━\n\n🔢 *ʀᴇᴘʟʏ ʙᴇʟᴏᴡ ᴛʜᴇ ɴᴜᴍʙᴇʀ ᴛᴏ*\n*ᴅᴏᴡɴʟᴏᴀᴅ ꜰʀᴏᴍᴀᴛ*\n\n*ᴅᴏᴡɴʟᴏᴀᴅ ᴠɪᴅᴇᴏ 🎬*\n\n*1.1* ┃ *360ᴘ*\n*1.2* ┃ *480ᴘ*\n*1.3* ┃ *720ᴘ*\n*1.4* ┃ *1080ᴘ*\n\n*ᴅᴏᴡɴʟᴏᴀᴅ ᴅᴏᴄᴜᴍᴇɴᴛ 📁*\n\n*2.1* ┃ *360ᴘ*\n*2.2* ┃ *480ᴘ*\n*2.3* ┃ *720ᴘ*\n*2.4* ┃ *1080ᴘ*\n\n> ꜱʜᴀᴅᴏᴡ-xᴍᴅ✻\n"
    }, {
      'quoted': _0x1a353e
    });
    ;
    const _0x247cb9 = _0x178d16.key.id;
    _0x2a6c7f.ev.on("messages.upsert", async _0x1afba7 => {
      const _0x5a3f1e = _0x1afba7.messages[0];
      if (!_0x5a3f1e.message) {
        return;
      }
      const _0x146fae = _0x5a3f1e.message.conversation || _0x5a3f1e.message.extendedTextMessage?.["text"];
      const _0x3eb8a6 = _0x5a3f1e.key.remoteJid;
      const _0x510f82 = _0x5a3f1e.message.extendedTextMessage && _0x5a3f1e.message.extendedTextMessage.contextInfo.stanzaId === _0x247cb9;
      if (_0x510f82) {
        await _0x2a6c7f.sendMessage(_0x3eb8a6, {
          'react': {
            'text': '⬇️',
            'key': _0x5a3f1e.key
          }
        });
        if (_0x146fae === "1.1") {
          const _0x5a0971 = await ytmp4('' + _0x3c7f16, "360p");
          await _0x2a6c7f.sendMessage(_0x3eb8a6, {
            'delete': _0x178d16.key
          });
          await _0x2a6c7f.sendMessage(_0x3eb8a6, {
            'react': {
              'text': '⬆️',
              'key': _0x5a3f1e.key
            }
          });
          await _0x2a6c7f.sendMessage(_0x3eb8a6, {
            'video': {
              'url': _0x5a0971
            },
            'caption': "\n*🌟Gᴇɴᴇʀᴀᴛᴇᴅ 4 Yᴏᴜ Bʏ ꜱʜᴀᴅᴏᴡ-xᴍᴅ🌟*\n"
          }, {
            'quoted': _0x5a3f1e
          });
          await _0x2a6c7f.sendMessage(_0x3eb8a6, {
            'react': {
              'text': '✅',
              'key': _0x5a3f1e.key
            }
          });
        } else {
          if (_0x146fae === "1.2") {
            const _0x55b561 = await ytmp4('' + _0x3c7f16, "480");
            await _0x2a6c7f.sendMessage(_0x3eb8a6, {
              'delete': _0x178d16.key
            });
            await _0x2a6c7f.sendMessage(_0x3eb8a6, {
              'react': {
                'text': '🔃',
                'key': _0x5a3f1e.key
              }
            });
            await _0x2a6c7f.sendMessage(_0x3eb8a6, {
              'video': {
                'url': _0x55b561
              },
              'caption': "\n*🌟Gᴇɴᴇʀᴀᴛᴇᴅ 4 Yᴏᴜ Bʏ ꜱʜᴀᴅᴏᴡ-xᴍᴅ🌟*\n"
            }, {
              'quoted': _0x5a3f1e
            });
            await _0x2a6c7f.sendMessage(_0x3eb8a6, {
              'react': {
                'text': '✅',
                'key': _0x5a3f1e.key
              }
            });
          } else {
            if (_0x146fae === "1.3") {
              const _0x1e91b6 = await ytmp4('' + _0x3c7f16, "720");
              await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                'delete': _0x178d16.key
              });
              await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                'react': {
                  'text': '⬆️',
                  'key': _0x5a3f1e.key
                }
              });
              await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                'video': {
                  'url': _0x1e91b6
                },
                'caption': "\n*🌟Gᴇɴᴇʀᴀᴛᴇᴅ 4 Yᴏᴜ Bʏ ꜱʜᴀᴅᴏᴡ-xᴍᴅ🌟*\n"
              }, {
                'quoted': _0x5a3f1e
              });
              await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                'react': {
                  'text': '✅',
                  'key': _0x5a3f1e.key
                }
              });
            } else {
              if (_0x146fae === "1.4") {
                const _0x5aadb6 = await ytmp4('' + _0x3c7f16, "1080");
                await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                  'delete': _0x178d16.key
                });
                await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                  'react': {
                    'text': '⬆️',
                    'key': _0x5a3f1e.key
                  }
                });
                await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                  'video': {
                    'url': _0x5aadb6
                  },
                  'caption': "\n*🌟Gᴇɴᴇʀᴀᴛᴇᴅ 4 Yᴏᴜ Bʏ ꜱʜᴀᴅᴏᴡ-xᴍᴅ🌟*\n"
                }, {
                  'quoted': _0x5a3f1e
                });
                await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                  'react': {
                    'text': '✅',
                    'key': _0x5a3f1e.key
                  }
                });
              } else {
                if (_0x146fae === "2.1") {
                  const _0x2eeff7 = await ytmp4('' + _0x3c7f16, "360");
                  await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                    'delete': _0x178d16.key
                  });
                  await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                    'react': {
                      'text': '⬆️',
                      'key': _0x5a3f1e.key
                    }
                  });
                  await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                    'document': {
                      'url': _0x2eeff7
                    },
                    'mimetype': "video/mp4",
                    'fileName': _0x71b931.title + ".mp4",
                    'caption': "\n*🌟Gᴇɴᴇʀᴀᴛᴇᴅ 4 Yᴏᴜ Bʏ ꜱʜᴀᴅᴏᴡ-xᴍᴅ🌟*\n"
                  }, {
                    'quoted': _0x5a3f1e
                  });
                  await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                    'react': {
                      'text': '✅',
                      'key': _0x5a3f1e.key
                    }
                  });
                } else {
                  if (_0x146fae === "2.2") {
                    const _0x2b1275 = await ytmp4('' + _0x3c7f16, "480");
                    await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                      'delete': _0x178d16.key
                    });
                    await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                      'react': {
                        'text': '⬆️',
                        'key': _0x5a3f1e.key
                      }
                    });
                    await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                      'document': {
                        'url': _0x2b1275
                      },
                      'mimetype': "video/mp4",
                      'fileName': _0x71b931.title + ".mp4",
                      'caption': "\n*🌟Gᴇɴᴇʀᴀᴛᴇᴅ 4 Yᴏᴜ Bʏ ꜱʜᴀᴅᴏᴡ-xᴍᴅ🌟*\n"
                    }, {
                      'quoted': _0x5a3f1e
                    });
                    await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                      'react': {
                        'text': '✅',
                        'key': _0x5a3f1e.key
                      }
                    });
                  } else {
                    if (_0x146fae === "2.3") {
                      const _0x1dad02 = await ytmp4('' + _0x3c7f16, "720");
                      await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                        'delete': _0x178d16.key
                      });
                      await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                        'react': {
                          'text': '⬆️',
                          'key': _0x5a3f1e.key
                        }
                      });
                      await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                        'document': {
                          'url': _0x1dad02
                        },
                        'mimetype': "video/mp4",
                        'fileName': _0x71b931.title + ".mp4",
                        'caption': "\n*🌟Gᴇɴᴇʀᴀᴛᴇᴅ 4 Yᴏᴜ Bʏ ꜱʜᴀᴅᴏᴡ-xᴍᴅ🌟*\n"
                      }, {
                        'quoted': _0x5a3f1e
                      });
                      await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                        'react': {
                          'text': '✅',
                          'key': _0x5a3f1e.key
                        }
                      });
                    } else {
                      if (_0x146fae === "2.4") {
                        const _0x4eba89 = await ytmp4('' + _0x3c7f16, "1080");
                        await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                          'delete': _0x178d16.key
                        });
                        await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                          'react': {
                            'text': '⬆️',
                            'key': _0x5a3f1e.key
                          }
                        });
                        await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                          'document': {
                            'url': _0x4eba89
                          },
                          'mimetype': "video/mp4",
                          'fileName': _0x71b931.title + ".mp4",
                          'caption': "\n*🌟Gᴇɴᴇʀᴀᴛᴇᴅ 4 Yᴏᴜ Bʏ ꜱʜᴀᴅᴏᴡ-xᴍᴅ🌟*\n"
                        }, {
                          'quoted': _0x5a3f1e
                        });
                        await _0x2a6c7f.sendMessage(_0x3eb8a6, {
                          'react': {
                            'text': '✅',
                            'key': _0x5a3f1e.key
                          }
                        });
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
  } catch (_0x42b0a4) {
    console.log(_0x42b0a4);
    _0x199b1c('' + _0x42b0a4);
  }
});
cmd({
  'pattern': "dee",
  'alias': "dilolo",
  'react': '⬇️',
  'dontAddCommandList': true,
  'filename': __filename
}, async (_0x2ab677, _0x330947, _0xae6874, {
  from: _0x476ae5,
  q: _0x52aef1,
  reply: _0x1b3b31
}) => {
  try {
    if (!_0x52aef1) {
      return await _0x1b3b31("*Need a YouTube URL!*");
    }
    const _0x46d0f8 = await dlyta(_0x52aef1);
    await _0x2ab677.sendMessage(_0x476ae5, {
      'audio': {
        'url': _0x46d0f8.dl_link
      },
      'mimetype': "audio/mpeg"
    }, {
      'quoted': _0x330947
    });
  } catch (_0x14d276) {
    console.log("First attempt failed:", _0x14d276);
    try {
      const _0x4ca9c0 = await dlyta(_0x52aef1);
      await _0x2ab677.sendMessage(_0x476ae5, {
        'audio': {
          'url': _0x4ca9c0.dl_link
        },
        'mimetype': "audio/mpeg"
      }, {
        'quoted': _0x330947
      });
    } catch (_0xdd51ef) {
      console.log("Second attempt failed:", _0xdd51ef);
      await _0x1b3b31("*Failed to process the request. Please try again later!*");
    }
  }
});