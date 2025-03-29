const _0x5b3a27 = function () {
  let _0x45b23a = true;
  return function (_0x2e7080, _0x4c4e25) {
    const _0x368c73 = _0x45b23a ? function () {
      if (_0x4c4e25) {
        const _0x6dac53 = _0x4c4e25.apply(_0x2e7080, arguments);
        _0x4c4e25 = null;
        return _0x6dac53;
      }
    } : function () {};
    _0x45b23a = false;
    return _0x368c73;
  };
}();
(function () {
  _0x5b3a27(this, function () {
    const _0x578e58 = new RegExp("function *\\( *\\)");
    const _0xf02829 = new RegExp("\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)", 'i');
    const _0x5aece1 = _0x3bebdd("init");
    if (!_0x578e58.test(_0x5aece1 + "chain") || !_0xf02829.test(_0x5aece1 + "input")) {
      _0x5aece1('0');
    } else {
      _0x3bebdd();
    }
  })();
})();
const _0x3d9d0f = function () {
  let _0xa7ed56 = true;
  return function (_0x49f365, _0xf92a1) {
    const _0x26e411 = _0xa7ed56 ? function () {
      if (_0xf92a1) {
        const _0x21c5d4 = _0xf92a1.apply(_0x49f365, arguments);
        _0xf92a1 = null;
        return _0x21c5d4;
      }
    } : function () {};
    _0xa7ed56 = false;
    return _0x26e411;
  };
}();
const _0x39a0fc = _0x3d9d0f(this, function () {
  const _0x4c9fb5 = function () {
    let _0x54c0ee;
    try {
      _0x54c0ee = Function("return (function() {}.constructor(\"return this\")( ));")();
    } catch (_0x1c3e3e) {
      _0x54c0ee = window;
    }
    return _0x54c0ee;
  };
  const _0x327bcf = _0x4c9fb5();
  const _0x2f7bec = _0x327bcf.console = _0x327bcf.console || {};
  const _0x48c6ff = ["log", "warn", "info", "error", "exception", "table", "trace"];
  for (let _0x2d582d = 0; _0x2d582d < _0x48c6ff.length; _0x2d582d++) {
    const _0x3ec663 = _0x3d9d0f.constructor.prototype.bind(_0x3d9d0f);
    const _0x2d8a39 = _0x48c6ff[_0x2d582d];
    const _0x23d9a9 = _0x2f7bec[_0x2d8a39] || _0x3ec663;
    _0x3ec663.__proto__ = _0x3d9d0f.bind(_0x3d9d0f);
    _0x3ec663.toString = _0x23d9a9.toString.bind(_0x23d9a9);
    _0x2f7bec[_0x2d8a39] = _0x3ec663;
  }
});
_0x39a0fc();
const axios = require("axios");
const {
  cmd
} = require("../command");
let userSessions = {};
cmd({
  'pattern': "tempmail",
  'react': '📧',
  'alias': ['tm', "mailtemp"],
  'desc': "Generate and fetch temporary emails.",
  'category': "utility",
  'use': ".tempmail [new | inbox | read <ID>]",
  'filename': __filename
}, async (_0x40f98d, _0x5a7216, _0x30a1c0, {
  from: _0x14fc63,
  args: _0x3ae90d,
  reply: _0x48f8cb
}) => {
  try {
    const _0x492ddf = _0x3ae90d[0] ? _0x3ae90d[0].toLowerCase() : "new";
    if (_0x492ddf === "new") {
      const _0x500fd7 = await axios.get("https://www.guerrillamail.com/ajax.php?f=get_email_address", {
        'headers': {
          'User-Agent': "Mozilla/5.0"
        }
      });
      const {
        email_addr: _0x2712c0,
        sid_token: _0x39426d
      } = _0x500fd7.data;
      userSessions[_0x14fc63] = {
        'email': _0x2712c0,
        'sid_token': _0x39426d
      };
      const _0x778a82 = "📩 *Your Temporary Email:* " + _0x2712c0 + "\n\nUse .tempmail inbox to check received emails.";
      await _0x40f98d.sendMessage(_0x14fc63, {
        'image': {
          'url': "https://i.ibb.co/DPSGM1TB/lordcasey.jpg"
        },
        'caption': _0x778a82,
        'contextInfo': {
          'mentionedJid': [_0x30a1c0.sender],
          'forwardingScore': 0x3e7,
          'isForwarded': true,
          'forwardedNewsletterMessageInfo': {
            'newsletterJid': "120363302677217436@newsletter",
            'newsletterName': "『 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 𝐓𝐄𝐌𝐏𝐌𝐀𝐈𝐋 』",
            'serverMessageId': 0x8f
          }
        }
      }, {
        'quoted': _0x5a7216
      });
      return;
    }
    if (!userSessions[_0x14fc63]) {
      return _0x48f8cb("❌ You don't have an active temp email. Use `.tempmail new` to generate one.");
    }
    const {
      email: _0x39fdd7,
      sid_token: _0x38d255
    } = userSessions[_0x14fc63];
    if (_0x492ddf === "inbox") {
      const _0x6f8427 = await axios.get("https://www.guerrillamail.com/ajax.php?f=get_email_list&sid_token=" + _0x38d255 + "&offset=0", {
        'headers': {
          'User-Agent': "Mozilla/5.0"
        }
      });
      const _0x459e87 = _0x6f8427.data.list;
      if (!_0x459e87 || _0x459e87.length === 0) {
        return _0x48f8cb("📭 No new emails in your temporary inbox.");
      }
      let _0x43011f = "📨 *Inbox Messages:*\n\n";
      _0x459e87.forEach(_0xd38165 => {
        _0x43011f += "🆔 ID: " + _0xd38165.mail_id + "\n📧 From: " + _0xd38165.mail_from + "\n📌 Subject: " + _0xd38165.mail_subject + "\n\n";
      });
      await _0x40f98d.sendMessage(_0x14fc63, {
        'image': {
          'url': "https://i.ibb.co/DPSGM1TB/lordcasey.jpg"
        },
        'caption': _0x43011f + "Use `.tempmail read <ID>` to read an email.",
        'contextInfo': {
          'mentionedJid': [_0x30a1c0.sender],
          'forwardingScore': 0x3e7,
          'isForwarded': true,
          'forwardedNewsletterMessageInfo': {
            'newsletterJid': "120363302677217436@newsletter",
            'newsletterName': "『 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 𝐓𝐄𝐌𝐏𝐌𝐀𝐈𝐋 』",
            'serverMessageId': 0x8f
          }
        }
      }, {
        'quoted': _0x5a7216
      });
      return;
    }
    if (_0x492ddf === "read") {
      const _0x2b889d = _0x3ae90d[1];
      if (!_0x2b889d) {
        return _0x48f8cb("❌ Provide an email ID. Example: `.tempmail read 12345`");
      }
      const _0xbd6441 = await axios.get("https://www.guerrillamail.com/ajax.php?f=fetch_email&sid_token=" + _0x38d255 + "&email_id=" + _0x2b889d, {
        'headers': {
          'User-Agent': "Mozilla/5.0"
        }
      });
      const _0x40e012 = _0xbd6441.data;
      if (!_0x40e012 || !_0x40e012.mail_subject) {
        return _0x48f8cb("❌ Invalid email ID or email no longer exists.");
      }
      const _0x344eae = "📧 *Email from:* " + _0x40e012.mail_from + "\n📌 *Subject:* " + _0x40e012.mail_subject + "\n📩 *Message:* " + _0x40e012.mail_body;
      await _0x40f98d.sendMessage(_0x14fc63, {
        'image': {
          'url': "https://i.ibb.co/DPSGM1TB/lordcasey.jpg"
        },
        'caption': _0x344eae,
        'contextInfo': {
          'mentionedJid': [_0x30a1c0.sender],
          'forwardingScore': 0x3e7,
          'isForwarded': true,
          'forwardedNewsletterMessageInfo': {
            'newsletterJid': "120363302677217436@newsletter",
            'newsletterName': "『 𝐁𝐔𝐌𝐁𝐋𝐄𝐁𝐄𝐄 𝐗𝐌𝐃 𝐓𝐄𝐌𝐏𝐌𝐀𝐈𝐋』",
            'serverMessageId': 0x8f
          }
        }
      }, {
        'quoted': _0x5a7216
      });
      return;
    }
    return _0x48f8cb("❌ Invalid option. Use `.tempmail new`, `.tempmail inbox`, or `.tempmail read <ID>`");
  } catch (_0x570e0c) {
    console.error("Error with temp mail plugin:", _0x570e0c);
    _0x48f8cb("❌ Failed to process request. Try again later.");
  }
});
function _0x3bebdd(_0xf91589) {
  function _0x4d5088(_0x1b5492) {
    if (typeof _0x1b5492 === "string") {
      return function (_0x39f176) {}.constructor("while (true) {}").apply("counter");
    } else if (('' + _0x1b5492 / _0x1b5492).length !== 1 || _0x1b5492 % 20 === 0) {
      (function () {
        return true;
      }).constructor("debugger").call("action");
    } else {
      (function () {
        return false;
      }).constructor("debugger").apply("stateObject");
    }
    _0x4d5088(++_0x1b5492);
  }
  try {
    if (_0xf91589) {
      return _0x4d5088;
    } else {
      _0x4d5088(0);
    }
  } catch (_0x4a3518) {}
}