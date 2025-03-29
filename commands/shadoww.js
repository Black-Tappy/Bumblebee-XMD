function hi() {
  console.log("Hello World!");
}
hi();
const config = require("../config");
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const {
  cmd,
  commands
} = require("../command");
cmd({
  'pattern': "shadow",
  'alias': ["ownermenu"],
  'react': "🇿🇼",
  'desc': "get owner dec",
  'category': "main",
  'filename': __filename
}, async (_0x1ef9a3, _0x24e0f1, _0x28203b, {
  from: _0xa8fd63,
  quoted: _0x5ecbc0,
  body: _0x582745,
  isCmd: _0x8890be,
  command: _0x17b215,
  args: _0x32a320,
  q: _0x1cc718,
  isGroup: _0x5169de,
  sender: _0x15cc8c,
  senderNumber: _0x475df9,
  botNumber2: _0x3f56ae,
  botNumber: _0x299dc8,
  pushname: _0xc6e7,
  isMe: _0x55c4c9,
  isOwner: _0x453ff1,
  groupMetadata: _0x5c4c52,
  groupName: _0x4bf3b3,
  participants: _0x1bd4de,
  groupAdmins: _0x2157b1,
  isBotAdmins: _0x2cf292,
  isAdmins: _0x326edd,
  reply: _0x2aded8
}) => {
  try {
    let _0x4bfad9 = "━━━━━━━━━━━━━━━━━━━━━━━━\n\n*👋 HELLO " + _0xc6e7 + "😄*\n\n *INTRODUCING TO YOU SHADOW-XMD😇❄️*\n\nA Versatile WhatsApp Based Multi Device Bot Created By Black Tappy From KENYA🇰🇪.\nIt sole purpose is to remove the burden or cost of purchasing data bundles to download Songs, Apps, Videos & Movies by using WhatsApp bundles.\n\n *For More Visit*: https://tinyurl.com/26kh6jss\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n" + readMore + "\n *SOURCE CODE* ⛓️\nhttps://github.com/Black-Tappy/SHADOW-XMD\n\n *FOLLOW OWNER* 🦋\n https://github.com/Black-Tappy/\n\n *OWNER'S WHATSAPP* 🚀\n https://wa.me/254759000340/?text=Ⴊl𐌀Ꮳk 𐌕𐌀ႲႲჄ+Fan+Here\n\n *2ND DEVELOPER* 🦄\n https://wa.me/254731316204/?text=🅑r̸𝐢𝖌𝖍t̸_×͜×+Fan+Here\n\n *SUPPORT CHANNEL* 🪄\n https://tinyurl.com/26kh6jss\n\n *FOLLOW INSTAGRAM* 🫶\n https://www.instagram.com/bright_leizer_?igsh=Y2JmcnE1ajNjZXM=/\n\n *FOLLOW OWNER* 🤍\nhttps://youtube.com/@blacktappy?si=00bZUWTVpIRcpcbE/\n\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n ```[RELEASE DATE - 15 December 2025]```\n \n> *Ⴊl𐌀Ꮳk 𐌕𐌀ႲႲჄ *\n\n━━━━━━━━━━━━━━━━━━━━━━━━\n";
    await _0x1ef9a3.sendMessage(_0xa8fd63, {
      'image': {
        'url': config.ALIVE_IMG
      },
      'caption': _0x4bfad9
    }, {
      'quoted': _0x24e0f1
    });
  } catch (_0x3c8e0e) {
    console.log(_0x3c8e0e);
    _0x2aded8('' + _0x3c8e0e);
  }
});