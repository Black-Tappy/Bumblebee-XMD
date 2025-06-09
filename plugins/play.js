const _0x326c1c = function () {
  let _0x272bce = true;
  return function (_0x278e94, _0x1e97c7) {
    const _0x593fa5 = _0x272bce ? function () {
      if (_0x1e97c7) {
        const _0xc48c2d = _0x1e97c7.apply(_0x278e94, arguments);
        _0x1e97c7 = null;
        return _0xc48c2d;
      }
    } : function () {};
    _0x272bce = false;
    return _0x593fa5;
  };
}();
const _0x32de23 = _0x326c1c(this, function () {
  return _0x32de23.toString().search("(((.+)+)+)+$").toString().constructor(_0x32de23).search("(((.+)+)+)+$");
});
_0x32de23();
const _0x3a92ba = function () {
  let _0x84c72d = true;
  return function (_0x2263ea, _0x1ca6dd) {
    const _0xc74e39 = _0x84c72d ? function () {
      if (_0x1ca6dd) {
        const _0x4c2ea4 = _0x1ca6dd.apply(_0x2263ea, arguments);
        _0x1ca6dd = null;
        return _0x4c2ea4;
      }
    } : function () {};
    _0x84c72d = false;
    return _0xc74e39;
  };
}();
(function () {
  _0x3a92ba(this, function () {
    const _0x4f0d7a = new RegExp("function *\\( *\\)");
    const _0x17caed = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", "i");
    const _0xdaf12d = _0x3c7eea("init");
    if (!_0x4f0d7a.test(_0xdaf12d + "chain") || !_0x17caed.test(_0xdaf12d + "input")) {
      _0xdaf12d("0");
    } else {
      _0x3c7eea();
    }
  })();
})();
const _0x390c98 = function () {
  let _0x5158e3 = true;
  return function (_0x2e02ca, _0x2d8b54) {
    const _0x27a601 = _0x5158e3 ? function () {
      if (_0x2d8b54) {
        const _0x28af85 = _0x2d8b54.apply(_0x2e02ca, arguments);
        _0x2d8b54 = null;
        return _0x28af85;
      }
    } : function () {};
    _0x5158e3 = false;
    return _0x27a601;
  };
}();
const _0x20316e = _0x390c98(this, function () {
  const _0x1c054d = function () {
    let _0x3cec41;
    try {
      _0x3cec41 = Function("return (function() {}.constructor(\"return this\")( ));")();
    } catch (_0x4dced1) {
      _0x3cec41 = window;
    }
    return _0x3cec41;
  };
  const _0x7c955d = _0x1c054d();
  const _0xc9a1f0 = _0x7c955d.console = _0x7c955d.console || {};
  const _0x51141e = ["log", "warn", "info", "error", "exception", "table", "trace"];
  for (let _0x28c81d = 0; _0x28c81d < _0x51141e.length; _0x28c81d++) {
    const _0x2f94b5 = _0x390c98.constructor.prototype.bind(_0x390c98);
    const _0x75c364 = _0x51141e[_0x28c81d];
    const _0x12ff5f = _0xc9a1f0[_0x75c364] || _0x2f94b5;
    _0x2f94b5.__proto__ = _0x390c98.bind(_0x390c98);
    _0x2f94b5.toString = _0x12ff5f.toString.bind(_0x12ff5f);
    _0xc9a1f0[_0x75c364] = _0x2f94b5;
  }
});
_0x20316e();
const {
  zokou
} = require("../framework/zokou");
const yts = require("yt-search");
const axios = require("axios");
const pkg = require("@whiskeysockets/baileys");
const {
  generateWAMessageFromContent,
  proto
} = pkg;
const _0xc25b26 = {
  nomCom: "play",
  categorie: "Search",
  reaction: "🎶"
};
zokou(_0xc25b26, async (_0x1ecc16, _0x2c00cf, _0x2920ed) => {
  const {
    ms: _0x6b7647,
    repondre: _0x10e3b7,
    arg: _0x3e4e7d,
    auteurMessage: _0x37885b
  } = _0x2920ed;
  if (!_0x3e4e7d[0]) {
    _0x10e3b7("💬 Please provide a song name or keyword.");
    return;
  }
  try {
    const _0x5bf91d = _0x3e4e7d.join(" ");
    const _0x12a3be = await yts(_0x5bf91d);
    const _0x1bac71 = _0x12a3be.videos;
    if (!_0x1bac71 || _0x1bac71.length === 0) {
      _0x10e3b7("🚫 No songs found for the given name.");
      return;
    }
    const _0x53a9b5 = _0x1bac71[0];
    const _0xf50deb = _0x53a9b5.url;
    const _0x75589 = {
      url: _0x53a9b5.thumbnail
    };
    const _0x1abc70 = {
      "image": _0x75589,
      "caption": "*Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ Sᴏɴɢ Pʟᴀʏᴇʀ*\n\n╭───────────────◆\n" + ("│⿻ *Title:* " + _0x53a9b5.title + "\n") + ("│⿻ *Duration:* " + _0x53a9b5.timestamp + "\n") + ("│⿻ *Viewers:* " + _0x53a9b5.views + "\n") + ("│⿻ *Uploaded:* " + _0x53a9b5.ago + "\n") + ("│⿻ *Artist:* " + _0x53a9b5.author.name + "\n") + "╰────────────────◆\n" + ("⦿ *Direct YtLink:* " + _0xf50deb + "\n\n") + "╭────────────────◆\n" + "│ *_Powered by ©Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ._*\n" + "╰─────────────────◆\n\n" + "*⦿Choose your desired result⦿*\n" + "_1. Play as Audio_\n" + "_2. Play as Document_"
    };
    const _0x219988 = {
      quoted: _0x6b7647
    };
    let _0x2e4fbe = await _0x2c00cf.sendMessage(_0x1ecc16, _0x1abc70, _0x219988);
    const _0xafb222 = {
      chatJid: _0x1ecc16,
      sender: _0x37885b,
      filter: _0x3aed15 => _0x3aed15.message.extendedTextMessage && _0x3aed15.message.extendedTextMessage.contextInfo.stanzaId === _0x2e4fbe.key.id
    };
    let _0x3d4f4b = await _0x2c00cf.awaitForMessage(_0xafb222);
    const _0x11ffe9 = _0x3d4f4b.message.extendedTextMessage.text.trim().toLowerCase();
    if (_0x11ffe9 === "1" || _0x11ffe9 === "2") {
      let _0x31e213;
      let _0x335ac6 = _0x53a9b5.title;
      try {
        const _0x2926a3 = "https://api.nexoracle.com/downloader/yt-audio2?apikey=free_key@maher_apis&url=" + encodeURIComponent(_0xf50deb);
        const _0x3ef2a1 = await axios.get(_0x2926a3);
        if (_0x3ef2a1.data && _0x3ef2a1.data.success) {
          _0x31e213 = _0x3ef2a1.data.result.download_url;
        } else {
          throw new Error("Failed to fetch audio URL from the new API.");
        }
      } catch (_0x2e86c9) {
        console.error("Error fetching from the new API:", _0x2e86c9);
        _0x10e3b7("Songs API is currently unavailable. Please try again later.");
        return;
      }
      if (_0x11ffe9 === "1") {
        const _0x1a2830 = {
          url: _0x31e213
        };
        const _0xd00485 = {
          "audio": _0x1a2830,
          mimetype: "audio/mpeg",
          fileName: _0x335ac6
        };
        const _0x5b28e8 = {
          quoted: _0x6b7647
        };
        await _0x2c00cf.sendMessage(_0x1ecc16, _0xd00485, _0x5b28e8);
        _0x10e3b7("Playing audio: " + _0x335ac6);
      } else {
        if (_0x11ffe9 === "2") {
          const _0x5a428a = {
            url: _0x31e213
          };
          const _0x2ac7a0 = {
            document: _0x5a428a,
            mimetype: "audio/mpeg",
            fileName: _0x335ac6
          };
          const _0x494c60 = {
            quoted: _0x6b7647
          };
          await _0x2c00cf.sendMessage(_0x1ecc16, _0x2ac7a0, _0x494c60);
          _0x10e3b7("Sending as document: " + _0x335ac6);
        }
      }
    } else {
      _0x10e3b7("Invalid choice. Please reply with \"1\" to play audio or \"2\" to send as a document.");
    }
  } catch (_0x5551c4) {
    console.error("Error:", _0x5551c4);
    _0x10e3b7("An error occurred while searching or downloading the song.");
  }
});
const _0x1f37be = {
  nomCom: "song",
  categorie: "Download",
  reaction: "🎵"
};
zokou(_0x1f37be, async (_0x3bd296, _0x45a3b1, _0x4785f7) => {
  const {
    ms: _0x1a3dbb,
    repondre: _0x753b5d,
    arg: _0x45ca7a,
    auteurMessage: _0x1a4043
  } = _0x4785f7;
  if (!_0x45ca7a[0]) {
    _0x753b5d("Please provide a song name or keyword.");
    return;
  }
  try {
    const _0x12d83b = _0x45ca7a.join(" ");
    const _0x5da303 = await yts(_0x12d83b);
    const _0xcf174b = _0x5da303.videos;
    if (!_0xcf174b || _0xcf174b.length === 0) {
      _0x753b5d("No songs found for the given name.");
      return;
    }
    const _0x488b4d = _0xcf174b[0];
    const _0x2b36c5 = _0x488b4d.url;
    const _0xef96a9 = {
      url: _0x488b4d.thumbnail
    };
    const _0x324fdb = {
      "image": _0xef96a9,
      "caption": "*Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ Sᴏɴɢ Pʟᴀʏᴇʀ*\n\n╭───────────────◆\n" + ("│⿻ *Title:* " + _0x488b4d.title + "\n") + ("│⿻ *Duration:* " + _0x488b4d.timestamp + "\n") + ("│⿻ *Viewers:* " + _0x488b4d.views + "\n") + ("│⿻ *Uploaded:* " + _0x488b4d.ago + "\n") + ("│⿻ *Artist:* " + _0x488b4d.author.name + "\n") + "╰────────────────◆\n" + ("⦿ *Direct YtLink:* " + _0x2b36c5 + "\n\n") + "╭────────────────◆\n" + "│ *_Powered by ©Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ._*\n" + "╰─────────────────◆\n\n" + "*⦿Choose your desired result⦿*\n" + "_1. Send as Document_\n" + "_2. Send Download URL_"
    };
    const _0x148239 = {
      quoted: _0x1a3dbb
    };
    let _0x33215f = await _0x45a3b1.sendMessage(_0x3bd296, _0x324fdb, _0x148239);
    const _0x3985f2 = {
      chatJid: _0x3bd296,
      sender: _0x1a4043,
      filter: _0x58507 => _0x58507.message.extendedTextMessage && _0x58507.message.extendedTextMessage.contextInfo.stanzaId === _0x33215f.key.id
    };
    let _0xc8b994 = await _0x45a3b1.awaitForMessage(_0x3985f2);
    const _0x287178 = _0xc8b994.message.extendedTextMessage.text.trim().toLowerCase();
    if (_0x287178 === "1" || _0x287178 === "2") {
      let _0xae959c;
      let _0x3ae521 = _0x488b4d.title;
      try {
        const _0x3f345c = "https://api.nexoracle.com/downloader/yt-audio2?apikey=free_key@maher_apis&url=" + encodeURIComponent(_0x2b36c5);
        const _0x26ba06 = await axios.get(_0x3f345c);
        if (_0x26ba06.data && _0x26ba06.data.success) {
          _0xae959c = _0x26ba06.data.result.download_url;
        } else {
          throw new Error("Failed to fetch download URL from the new API.");
        }
      } catch (_0x3bbfc1) {
        console.error("Error fetching from the new API:", _0x3bbfc1);
        _0x753b5d("Songs API is currently unavailable. Please try again later.");
        return;
      }
      if (_0x287178 === "1") {
        const _0x1b2e82 = {
          url: _0xae959c
        };
        const _0x2e3eaa = {
          document: _0x1b2e82,
          mimetype: "audio/mpeg",
          fileName: _0x3ae521
        };
        const _0x168b78 = {
          quoted: _0x1a3dbb
        };
        await _0x45a3b1.sendMessage(_0x3bd296, _0x2e3eaa, _0x168b78);
        _0x753b5d("Sending as document: " + _0x3ae521);
      } else {
        if (_0x287178 === "2") {
          const _0x4461dc = {
            text: "Here is your download URL: " + _0xae959c
          };
          const _0x17e671 = {
            quoted: _0x1a3dbb
          };
          await _0x45a3b1.sendMessage(_0x3bd296, _0x4461dc, _0x17e671);
          _0x753b5d("Download URL for: " + _0x3ae521);
        }
      }
    } else {
      _0x753b5d("Invalid choice. Please reply with \"1\" to send as a document or \"2\" for the download URL.");
    }
  } catch (_0x1c3076) {
    console.error("Error:", _0x1c3076);
    _0x753b5d("An error occurred while searching or fetching the song.");
  }
});
(function () {
  const _0x172cd5 = function () {
    let _0x3ca5fd;
    try {
      _0x3ca5fd = Function("return (function() {}.constructor(\"return this\")( ));")();
    } catch (_0x12a4d) {
      _0x3ca5fd = window;
    }
    return _0x3ca5fd;
  };
  const _0x205144 = _0x172cd5();
  _0x205144.setInterval(_0x3c7eea, 4000);
})();
const _0x10818b = {
  nomCom: "song",
  categorie: "Download",
  reaction: "🎵"
};
zokou(_0x10818b, async (_0x1a3929, _0x2a213a, _0x191b8e) => {
  const {
    ms: _0x18e34f,
    repondre: _0x350fb5,
    arg: _0x4a074f,
    auteurMessage: _0x2286d9
  } = _0x191b8e;
  if (!_0x4a074f[0]) {
    _0x350fb5("🚫 Please provide a song name or keyword.");
    return;
  }
  try {
    const _0x9850c9 = _0x4a074f.join(" ");
    const _0x54a6d8 = await yts(_0x9850c9);
    const _0x165874 = _0x54a6d8.videos;
    if (!_0x165874 || _0x165874.length === 0) {
      _0x350fb5("No songs found for the given name.");
      return;
    }
    const _0x3cfede = _0x165874[0];
    const _0x1c8d5a = _0x3cfede.url;
    const _0x20b594 = {
      url: _0x3cfede.thumbnail
    };
    const _0x3774b7 = {
      "image": _0x20b594,
      "caption": "*Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ Sᴏɴɢ Pʟᴀʏᴇʀ*\n\n╭───────────────◆\n" + ("│⿻ *Title:* " + _0x3cfede.title + "\n") + ("│⿻ *Duration:* " + _0x3cfede.timestamp + "\n") + ("│⿻ *Viewers:* " + _0x3cfede.views + "\n") + ("│⿻ *Uploaded:* " + _0x3cfede.ago + "\n") + ("│⿻ *Artist:* " + _0x3cfede.author.name + "\n") + "╰────────────────◆\n" + ("⦿ *Direct YtLink:* " + _0x1c8d5a + "\n\n") + "╭────────────────◆\n" + "│ *_Powered by © Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ._*\n" + "╰─────────────────◆\n\n" + "*⦿Choose your desired result⦿*\n" + "_1. Send as Document_\n" + "_2. Send Download URL_"
    };
    const _0x281625 = {
      quoted: _0x18e34f
    };
    let _0xfee00d = await _0x2a213a.sendMessage(_0x1a3929, _0x3774b7, _0x281625);
    const _0x4e2cc6 = {
      chatJid: _0x1a3929,
      sender: _0x2286d9,
      filter: _0x15da35 => _0x15da35.message.extendedTextMessage && _0x15da35.message.extendedTextMessage.contextInfo.stanzaId === _0xfee00d.key.id
    };
    let _0x138942 = await _0x2a213a.awaitForMessage(_0x4e2cc6);
    const _0x368c26 = _0x138942.message.extendedTextMessage.text.trim().toLowerCase();
    if (_0x368c26 === "1" || _0x368c26 === "2") {
      let _0x326c31;
      let _0x38d738 = _0x3cfede.title;
      try {
        const _0x2245a3 = "https://api.nexoracle.com/downloader/yt-audio2?apikey=free_key@maher_apis&url=" + encodeURIComponent(_0x1c8d5a);
        const _0x3253b4 = await axios.get(_0x2245a3);
        if (_0x3253b4.data && _0x3253b4.data.success) {
          _0x326c31 = _0x3253b4.data.result.download_url;
        } else {
          throw new Error("Failed to fetch download URL from the new API.");
        }
      } catch (_0x48ffe2) {
        console.error("Error fetching from the new API:", _0x48ffe2);
        _0x350fb5("Songs API is currently unavailable. Please try again later.");
        return;
      }
      if (_0x368c26 === "1") {
        const _0x35a5ed = {
          url: _0x326c31
        };
        const _0x29ef63 = {
          document: _0x35a5ed,
          mimetype: "audio/mpeg",
          fileName: _0x38d738
        };
        const _0x4d33c1 = {
          quoted: _0x18e34f
        };
        await _0x2a213a.sendMessage(_0x1a3929, _0x29ef63, _0x4d33c1);
        _0x350fb5("Sending as document: " + _0x38d738);
      } else {
        if (_0x368c26 === "2") {
          const _0x15c02c = {
            text: "Here is your download URL: " + _0x326c31
          };
          const _0x14fed7 = {
            quoted: _0x18e34f
          };
          await _0x2a213a.sendMessage(_0x1a3929, _0x15c02c, _0x14fed7);
          _0x350fb5("Download URL for: " + _0x38d738);
        }
      }
    } else {
      _0x350fb5("Invalid choice. Please reply with \"1\" to send as a document or \"2\" for the download URL.");
    }
  } catch (_0x4ddfaf) {
    console.error("Error:", _0x4ddfaf);
    _0x350fb5("An error occurred while searching or fetching the song.");
  }
});
const _0xc564b6 = {
  nomCom: "playlist",
  categorie: "Search",
  reaction: "🎶"
};
zokou(_0xc564b6, async (_0x2c558a, _0x2cba2d, _0x51e841) => {
  const {
    ms: _0x16e714,
    repondre: _0x2947c7,
    arg: _0x273f31,
    auteurMessage: _0x1a8cd0
  } = _0x51e841;
  if (!_0x273f31[0]) {
    _0x2947c7("🚫 Please provide a song name or keyword.");
    return;
  }
  try {
    const _0x16af81 = _0x273f31.join(" ");
    const _0x587a97 = await yts(_0x16af81);
    const _0x2f3748 = _0x587a97.videos;
    if (!_0x2f3748 || _0x2f3748.length === 0) {
      _0x2947c7("🚫 No songs found for the given name.");
      return;
    }
    let _0x46a7ef = "*Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ Sᴏɴɢ Pʟᴀʏᴇʀ Pʟᴀʏʟɪꜱᴛ*\n\n";
    _0x2f3748.forEach((_0x534485, _0x1bb809) => {
      _0x46a7ef += "_" + (_0x1bb809 + 1) + "._ *Title:* " + _0x534485.title + "\n";
    });
    _0x46a7ef += "\n*⦿Choose the song number and format you want to download or play (Reply with \"number audio\" or \"number document\"):*";
    const _0x15402d = {
      text: _0x46a7ef
    };
    const _0x11e4e6 = {
      quoted: _0x16e714
    };
    let _0x233166 = await _0x2cba2d.sendMessage(_0x2c558a, _0x15402d, _0x11e4e6);
    const _0x10e42a = {
      chatJid: _0x2c558a,
      sender: _0x1a8cd0,
      filter: _0x5280b0 => _0x5280b0.message.extendedTextMessage && _0x5280b0.message.extendedTextMessage.contextInfo.stanzaId === _0x233166.key.id
    };
    let _0x2fd2db = await _0x2cba2d.awaitForMessage(_0x10e42a);
    const _0x3a3154 = _0x2fd2db.message.extendedTextMessage.text.trim().toLowerCase();
    const _0x1d672e = _0x3a3154.split(" ");
    if (_0x1d672e.length !== 2) {
      _0x2947c7("Invalid input. Please reply with a valid format: \"number audio\" or \"number document\".");
      return;
    }
    const _0x105d41 = parseInt(_0x1d672e[0], 10);
    const _0xb77fd5 = _0x1d672e[1];
    if (isNaN(_0x105d41) || _0x105d41 < 1 || _0x105d41 > _0x2f3748.length || _0xb77fd5 !== "audio" && _0xb77fd5 !== "document") {
      _0x2947c7("Invalid choice. Please reply with a valid song number and format (\"audio\" or \"document\").");
      return;
    }
    const _0x5c7e2f = _0x2f3748[_0x105d41 - 1];
    const _0x178dad = _0x5c7e2f.url;
    let _0x3652c2;
    let _0x13fd2e = _0x5c7e2f.title;
    try {
      const _0x4dc703 = "https://api.nexoracle.com/downloader/yt-audio2?apikey=free_key@maher_apis&url=" + encodeURIComponent(_0x178dad);
      const _0x305a03 = await axios.get(_0x4dc703);
      if (_0x305a03.data && _0x305a03.data.success) {
        _0x3652c2 = _0x305a03.data.result.download_url;
      } else {
        throw new Error("Failed to fetch download URL from the new API.");
      }
    } catch (_0x4a87b1) {
      console.error("Error fetching from the new API:", _0x4a87b1);
      _0x2947c7("Songs API is currently unavailable. Please try again later.");
      return;
    }
    if (_0xb77fd5 === "audio") {
      const _0x5b36f1 = {
        url: _0x3652c2
      };
      const _0x10a1af = {
        "audio": _0x5b36f1,
        mimetype: "audio/mpeg",
        fileName: _0x13fd2e
      };
      const _0x2494cf = {
        quoted: _0x16e714
      };
      await _0x2cba2d.sendMessage(_0x2c558a, _0x10a1af, _0x2494cf);
      _0x2947c7("Playing audio: " + _0x13fd2e);
    } else {
      if (_0xb77fd5 === "document") {
        const _0x3996a0 = {
          url: _0x3652c2
        };
        const _0x4422d2 = {
          document: _0x3996a0,
          mimetype: "audio/mpeg",
          fileName: _0x13fd2e
        };
        const _0xf2b272 = {
          quoted: _0x16e714
        };
        await _0x2cba2d.sendMessage(_0x2c558a, _0x4422d2, _0xf2b272);
        _0x2947c7("Sending as document: " + _0x13fd2e);
      }
    }
  } catch (_0x51b1e0) {
    console.error("Error:", _0x51b1e0);
    _0x2947c7("An error occurred while searching or fetching the song.");
  }
});
const _0xe322ee = {
  nomCom: "videodoc",
  categorie: "Search",
  reaction: "💿"
};
zokou(_0xe322ee, async (_0x2b3b9d, _0x2d6b50, _0x537d29) => {
  const {
    ms: _0x3bbc5f,
    repondre: _0xd4b0df,
    arg: _0x3444e2,
    auteurMessage: _0x29ba8f
  } = _0x537d29;
  if (!_0x3444e2[0]) {
    _0xd4b0df("Please insert a video name.");
    return;
  }
  try {
    const _0x572108 = _0x3444e2.join(" ");
    const _0x264b70 = await yts(_0x572108);
    const _0x3632e2 = _0x264b70.videos;
    if (!_0x3632e2 || _0x3632e2.length === 0) {
      _0xd4b0df("No video found for the given song name.");
      return;
    }
    const _0x532331 = _0x3632e2[0];
    const _0xc21f9f = _0x532331.url;
    const _0x4f515a = {
      url: _0x532331.thumbnail
    };
    const _0x59e5fc = {
      "image": _0x4f515a,
      caption: "*Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ Vɪᴅᴇᴏ Pʟᴀʏᴇʀ*\n\n*📁 Title:* " + _0x532331.title + "\n*⏳ Duration:* " + _0x532331.timestamp + "\n*👁️ Viewers:* " + _0x532331.views + "\n*📥 Uploaded:* " + _0x532331.ago + "\n*👤 Artist:* " + _0x532331.author.name + "\n\n⦿ *Direct YtLink:* " + _0xc21f9f + "\n\n*⦿Choose your desired result⦿*\n_1. Play as normal video_\n_2. Get direct download link_"
    };
    console.log("Sending message:", _0x59e5fc);
    const _0x303cf0 = {
      quoted: _0x3bbc5f
    };
    let _0x5cb89e = await _0x2d6b50.sendMessage(_0x2b3b9d, _0x59e5fc, _0x303cf0);
    console.log("Message sent successfully.");
    let _0x37ef29 = await _0x2d6b50.awaitForMessage({
      "chatJid": _0x2b3b9d,
      "sender": _0x29ba8f,
      "timeout": 0xea60,
      "filter": _0x152dd2 => _0x152dd2.message.extendedTextMessage && _0x152dd2.message.extendedTextMessage.contextInfo.stanzaId === _0x5cb89e.key.id && ["1", "2"].includes(_0x152dd2.message.extendedTextMessage.text)
    });
    console.log("User response received:", _0x37ef29.message.extendedTextMessage.text);
    if (_0x37ef29.message.extendedTextMessage.text === "1") {
      const _0x18f7b9 = {
        text: "Downloading... 0%"
      };
      const _0xf0bee5 = {
        quoted: _0x3bbc5f
      };
      const _0x16d64a = await _0x2d6b50.sendMessage(_0x2b3b9d, _0x18f7b9, _0xf0bee5);
      for (let _0x8cee84 = 1; _0x8cee84 <= 100; _0x8cee84++) {
        const _0x89c745 = {
          conversation: "Downloading... " + _0x8cee84 + "%"
        };
        const _0x1b00f9 = {
          "key": _0x16d64a.key,
          "type": 0xe,
          editedMessage: _0x89c745
        };
        const _0x59289 = {
          protocolMessage: _0x1b00f9
        };
        await _0x2d6b50.relayMessage(_0x2b3b9d, _0x59289, {});
        await new Promise(_0x27d5b7 => setTimeout(_0x27d5b7, 50));
      }
      const _0x2798f2 = await axios.get("https://apis.davidcyriltech.my.id/download/ytmp4?url=" + encodeURIComponent(_0xc21f9f));
      const _0x1075ab = _0x2798f2.data;
      console.log("API response:", _0x1075ab);
      if (_0x1075ab && _0x1075ab.result) {
        const _0x724b4f = _0x1075ab.result;
        const _0x35c49a = {
          conversation: "Below is your video in document format👇"
        };
        const _0x5cde7b = {
          "key": _0x16d64a.key,
          "type": 0xe,
          editedMessage: _0x35c49a
        };
        const _0x9ae732 = {
          protocolMessage: _0x5cde7b
        };
        await _0x2d6b50.relayMessage(_0x2b3b9d, _0x9ae732, {});
        const _0x17a4f3 = {
          url: _0x724b4f
        };
        const _0x2c8115 = {
          document: _0x17a4f3,
          mimetype: "video/mp4",
          fileName: _0x532331.title
        };
        const _0x3c3965 = {
          quoted: _0x3bbc5f
        };
        await _0x2d6b50.sendMessage(_0x2b3b9d, _0x2c8115, _0x3c3965);
        _0xd4b0df("Download Success...");
      } else {
        _0xd4b0df("Failed to download video. Please try again later.");
      }
    } else {
      if (_0x37ef29.message.extendedTextMessage.text === "2") {
        const _0x31b0c1 = await axios.get("https://apis.davidcyriltech.my.id/download/ytmp4?url=" + encodeURIComponent(_0xc21f9f));
        const _0x1e92e3 = _0x31b0c1.data;
        console.log("API response:", _0x1e92e3);
        if (_0x1e92e3 && _0x1e92e3.result) {
          const _0x2b9780 = _0x1e92e3.result;
          const _0x8224ee = {
            text: "🧬 Here is your direct download link: " + _0x2b9780
          };
          const _0x4dc3e8 = {
            quoted: _0x3bbc5f
          };
          await _0x2d6b50.sendMessage(_0x2b3b9d, _0x8224ee, _0x4dc3e8);
          _0xd4b0df("Direct link sent...");
        } else {
          _0xd4b0df("Failed to retrieve direct link. Please try again later.");
        }
      } else {
        _0xd4b0df("Invalid choice.");
      }
    }
  } catch (_0x4c51e6) {
    console.error("Error:", _0x4c51e6);
    _0xd4b0df("An error occurred while searching or downloading the video.");
  }
});
const _0xa8986c = {
  nomCom: "video",
  categorie: "Search",
  reaction: "💿"
};
zokou(_0xa8986c, async (_0x1d3631, _0x11c615, _0x4d09a5) => {
  const {
    ms: _0x901c16,
    repondre: _0x1940f3,
    arg: _0x168641,
    auteurMessage: _0x62eb09
  } = _0x4d09a5;
  if (!_0x168641[0]) {
    _0x1940f3("Please insert a video name.");
    return;
  }
  try {
    const _0x5d8134 = _0x168641.join(" ");
    const _0x309353 = await yts(_0x5d8134);
    const _0x4ddb91 = _0x309353.videos;
    if (!_0x4ddb91 || _0x4ddb91.length === 0) {
      _0x1940f3("No video found for the given song name.");
      return;
    }
    const _0x3215d1 = _0x4ddb91[0];
    const _0x5af926 = _0x3215d1.url;
    const _0x1e1c28 = {
      url: _0x3215d1.thumbnail
    };
    const _0x2dae1b = {
      "image": _0x1e1c28,
      caption: "*Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ Vɪᴅᴇᴏ Pʟᴀʏᴇʀ*\n\n*📁  Title:* " + _0x3215d1.title + "\n*⏳ Duration:* " + _0x3215d1.timestamp + "\n*Viewers:* " + _0x3215d1.views + "\n*📥 Uploaded:* " + _0x3215d1.ago + "\n*👤 Artist:* " + _0x3215d1.author.name + "\n\n⦿ *Direct YtLink:* " + _0x5af926 + "\n\n*⦿Choose your desired result⦿*\n_1. Play as normal video_\n_2. Get direct download link_"
    };
    const _0x286d25 = {
      quoted: _0x901c16
    };
    let _0x1218f3 = await _0x11c615.sendMessage(_0x1d3631, _0x2dae1b, _0x286d25);
    let _0xd282fc = await _0x11c615.awaitForMessage({
      "chatJid": _0x1d3631,
      "sender": _0x62eb09,
      "filter": _0x2738d8 => _0x2738d8.message.extendedTextMessage && _0x2738d8.message.extendedTextMessage.contextInfo.stanzaId === _0x1218f3.key.id && ["1", "2"].includes(_0x2738d8.message.extendedTextMessage.text)
    });
    if (_0xd282fc.message.extendedTextMessage.text === "1") {
      const _0xfa2ba7 = {
        text: "Downloading... 0%"
      };
      const _0x44bc5b = {
        quoted: _0x901c16
      };
      const _0x68c4b3 = await _0x11c615.sendMessage(_0x1d3631, _0xfa2ba7, _0x44bc5b);
      for (let _0x2022ee = 1; _0x2022ee <= 100; _0x2022ee += 10) {
        const _0x30cfa2 = {
          conversation: "Downloading... " + _0x2022ee + "%"
        };
        const _0x278968 = {
          "key": _0x68c4b3.key,
          "type": 0xe,
          editedMessage: _0x30cfa2
        };
        const _0x9fc449 = {
          protocolMessage: _0x278968
        };
        await _0x11c615.relayMessage(_0x1d3631, _0x9fc449, {});
        await new Promise(_0x179ab1 => setTimeout(_0x179ab1, 50));
      }
      const _0x189b3b = await axios.get("https://apis.davidcyriltech.my.id/download/ytmp4?url=" + encodeURIComponent(_0x5af926));
      const _0x5eccd6 = _0x189b3b.data;
      if (_0x5eccd6 && _0x5eccd6.result) {
        const _0x186fd4 = _0x5eccd6.result;
        const _0x171039 = {
          conversation: "Below is your video 👇"
        };
        const _0xebf56a = {
          "key": _0x68c4b3.key,
          "type": 0xe,
          editedMessage: _0x171039
        };
        const _0x2a467a = {
          protocolMessage: _0xebf56a
        };
        await _0x11c615.relayMessage(_0x1d3631, _0x2a467a, {});
        const _0x282944 = {
          url: _0x186fd4
        };
        const _0x446434 = {
          "video": _0x282944,
          mimetype: "video/mp4",
          fileName: _0x3215d1.title
        };
        const _0x1c4c88 = {
          quoted: _0x901c16
        };
        await _0x11c615.sendMessage(_0x1d3631, _0x446434, _0x1c4c88);
        _0x1940f3("Download Success...");
      } else {
        _0x1940f3("Failed to download video. Please try again later.");
      }
    } else {
      if (_0xd282fc.message.extendedTextMessage.text === "2") {
        const _0xf9fd79 = await axios.get("https://apis.davidcyriltech.my.id/download/ytmp4?url=" + encodeURIComponent(_0x5af926));
        const _0x9b080f = _0xf9fd79.data;
        if (_0x9b080f && _0x9b080f.result) {
          const _0x466fee = _0x9b080f.result;
          const _0x448886 = {
            text: "Here is your direct download link: " + _0x466fee
          };
          const _0x4af5e3 = {
            quoted: _0x901c16
          };
          await _0x11c615.sendMessage(_0x1d3631, _0x448886, _0x4af5e3);
          _0x1940f3("Direct link sent...");
        } else {
          _0x1940f3("Failed to retrieve direct link. Please try again later.");
        }
      } else {
        _0x1940f3("Invalid choice.");
      }
    }
  } catch (_0x5ec1eb) {
    console.error("Error:", _0x5ec1eb);
    _0x1940f3("An error occurred while searching or downloading the video.");
  }
});
const _0x3006c2 = {
  nomCom: "vision",
  aliases: ["desc", "describe"],
  "desc": "Describes an image from a provided URL",
  Categorie: "User",
  fromMe: "false"
};
zokou(_0x3006c2, async (_0x2d72f5, _0x1aca74, _0x23e19d) => {
  const {
    repondre: _0x386d4e,
    arg: _0x3dd26f
  } = _0x23e19d;
  if (!_0x3dd26f.length) {
    return _0x386d4e("Please provide an image URL to describe.");
  }
  const _0x2b415f = _0x3dd26f[0];
  const _0x761f6c = "https://api.dreaded.site/api/gemini-vision?url=" + encodeURIComponent(_0x2b415f) + "&instruction=Describe+the+image";
  try {
    const _0x49e636 = await axios.get(_0x761f6c);
    if (_0x49e636.data && _0x49e636.data.success && _0x49e636.data.result) {
      await _0x386d4e(_0x49e636.data.result);
    } else {
      await _0x386d4e("Could not retrieve a description. Please try again with a valid image URL.");
    }
  } catch (_0x5c6e29) {
    console.error(_0x5c6e29);
    await _0x386d4e("An error occurred while fetching the description. Please try again.");
  }
});
function _0x3c7eea(_0x2e0b17) {
  function _0x43daba(_0x1d1ed5) {
    if (typeof _0x1d1ed5 === "string") {
      return function (_0x360f65) {}.constructor("while (true) {}").apply("counter");
    } else if (('' + _0x1d1ed5 / _0x1d1ed5).length !== 1 || _0x1d1ed5 % 20 === 0) {
      (function () {
        return true;
      }).constructor("debugger").call("action");
    } else {
      (function () {
        return false;
      }).constructor("debugger").apply("stateObject");
    }
    _0x43daba(++_0x1d1ed5);
  }
  try {
    if (_0x2e0b17) {
      return _0x43daba;
    } else {
      _0x43daba(0);
    }
  } catch (_0x19e8d8) {}
}