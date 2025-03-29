function hi() {
  console.log("Hello World!");
}
hi();
const axios = require("axios");
const FormData = require('form-data');
const fs = require('fs');
const os = require('os');
const path = require("path");
const {
  cmd,
  commands
} = require("../command");
cmd({
  'pattern': "tourl",
  'alias': ["imgtourl", "imgurl", "url"],
  'react': '🖇',
  'desc': "convert.",
  'category': "anime",
  'use': ".maid",
  'filename': __filename
}, async (_0x3030ef, _0x3a6d99, _0x14e812, {
  from: _0xf43e98,
  mnu: _0x4dc65e,
  quoted: _0x211483,
  body: _0x18fc6b,
  isCmd: _0x5b2ef9,
  command: _0xe852c7,
  args: _0x132236,
  q: _0x5a0916,
  isGroup: _0xb025d0,
  sender: _0x1d6c74,
  senderNumber: _0x5b46f7,
  botNumber2: _0x5f439f,
  botNumber: _0x222528,
  pushname: _0x3a3a58,
  isMe: _0x534423,
  isOwner: _0x25371e,
  groupMetadata: _0x204a08,
  groupName: _0xd5e6b2,
  participants: _0xfe68fc,
  groupAdmins: _0x43fd54,
  isBotAdmins: _0x1d6051,
  isAdmins: _0xe6be35,
  reply: _0x83bc5c
}) => {
  try {
    let _0x1ac1cd = _0x14e812.quoted ? _0x14e812.quoted : _0x14e812;
    let _0x5ed57a = (_0x1ac1cd.msg || _0x1ac1cd).mimetype || '';
    if (!_0x5ed57a) {
      throw "_`🌻 Reply To image`_";
    }
    let _0x4bfc7e = await _0x1ac1cd.download();
    let _0x375818 = path.join(os.tmpdir(), "lordcasey");
    fs.writeFileSync(_0x375818, _0x4bfc7e);
    let _0x5a4161 = new FormData();
    _0x5a4161.append('image', fs.createReadStream(_0x375818));
    let _0x21f829 = await axios.post("https://api.imgbb.com/1/upload?key=88428f15dd40d427fa3abee2da85f1e3", _0x5a4161, {
      'headers': {
        ..._0x5a4161.getHeaders()
      }
    });
    if (!_0x21f829.data || !_0x21f829.data.data || !_0x21f829.data.data.url) {
      throw "❌ Error";
    }
    let _0xde1929 = _0x21f829.data.data.url;
    fs.unlinkSync(_0x375818);
    _0x14e812.reply("*ᴄᴀsᴇʏʀʜᴏᴅᴇs ᴜᴘʟᴏᴀᴅᴇᴅ sᴜᴄᴄᴇssғᴜʟʟʏ*\n\n " + _0x4bfc7e.length + " Byte(s)\n \n*URL :* " + _0xde1929 + "\n\n> *© ᴜᴘʟᴏᴀᴅᴇᴅ ʙʏ ᴄᴀsᴇʏʀʜᴏᴅᴇs xᴍᴅ🥷🏽*");
  } catch (_0x277f1f) {
    _0x83bc5c('' + _0x277f1f);
    console.log(_0x277f1f);
  }
});