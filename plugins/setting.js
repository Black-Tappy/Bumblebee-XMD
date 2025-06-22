const { zokou } = require("../framework/zokou");
const s = require("../set");

// 💡 Stylish Box Formatter
const createBox = (title, lines = []) => {
  const lineStr = lines.map(line => `┃ ${line}`).join("\n");
  return `┏━━━『 *${title.toUpperCase()}* 』━━━\n${lineStr}\n┗━━━━━━━━━━━━━━━`;
};

// 🧠 Generic Setting Handler
async function handleSettingCommand({ repondre, arg, superUser }, label, key, responses = {}) {
  if (!superUser) {
    return repondre("🚫 *ACCESS DENIED!*\nOnly the bot owner is allowed to use this command.");
  }

  if (!arg[0]) {
    const usage = createBox(`${label} SETTINGS`, [
      `🟢 ${s.PREFIXE}${key} yes     - Enable`,
      `🔴 ${s.PREFIXE}${key} no      - Disable`,
      `📊 ${s.PREFIXE}${key} status  - Show status`
    ]);
    return repondre(usage);
  }

  const option = arg[0].toLowerCase();
  const status = s[key] === 'yes' ? '✅ ENABLED' : '❌ DISABLED';

  let msg = '';
  switch (option) {
    case "yes":
      s[key] = 'yes';
      msg = responses.enabled || `✅ *${label} Enabled Successfully!*`;
      break;
    case "no":
      s[key] = 'no';
      msg = responses.disabled || `❌ *${label} Disabled Successfully!*`;
      break;
    case "status":
      msg = createBox(`${label} STATUS`, [
        `📌 Current Status: ${status}`
      ]);
      break;
    default:
      msg = `❗ Invalid option!\nUse: *${s.PREFIXE}${key} yes | no | status*`;
  }

  await repondre(msg);
}

// ⚙️ Quick Creator Function
const createSettingCommand = (name, label, key, emoji, desc, responses) => {
  zokou({
    nomCom: name,
    categorie: "Settings",
    reaction: emoji,
    desc: desc
  }, async (dest, zk, opts) => {
    await handleSettingCommand(opts, label, key, responses);
  });
};

// 🔧 Basic Settings Commands
createSettingCommand("anticall", "Anti-call", "ANTI_CALL", "📵", "Block calls to bot");
createSettingCommand("autoreact", "Auto-react", "AUTO_REACT", "💖", "React to messages automatically");
createSettingCommand("autoreadstatus", "Auto-read Status", "AUTO_READ_STATUS", "👀", "Read status updates automatically");

// 🔐 Private Mode with Custom Responses
createSettingCommand("privatemode", "Private Mode", "PRIVATE_MODE", "🔒", "Restrict bot to owner only", {
  enabled: "🔒 *Private Mode Activated:*\nOnly the owner can use the bot now.",
  disabled: "🌍 *Public Mode Activated:*\nBot is now accessible by everyone."
});

// ⚡ ETAT-based Feature Toggles
const etatFeatures = [
  { name: "autorecord", etat: "3", label: "Auto-record", emoji: "🎙️", desc: "Fake voice recording" },
  { name: "autotyping", etat: "2", label: "Auto-typing", emoji: "⌨️", desc: "Simulate typing indicator" },
  { name: "alwaysonline", etat: "1", label: "Always Online", emoji: "🌐", desc: "Stay online always" }
];

etatFeatures.forEach(({ name, etat, label, emoji, desc }) => {
  zokou({
    nomCom: name,
    categorie: "Settings",
    reaction: emoji,
    desc: desc
  }, async (dest, zk, { repondre, arg, superUser }) => {
    if (!superUser) {
      return repondre("🚫 *ACCESS DENIED!*\nOnly the bot owner is allowed to use this command.");
    }

    const usage = createBox(`${label} SETTINGS`, [
      `🟢 ${s.PREFIXE}${name} yes  - Enable`,
      `🔴 ${s.PREFIXE}${name} no   - Disable`
    ]);

    if (!arg[0]) return repondre(usage);

    const option = arg[0].toLowerCase();

    if (option === "yes") {
      s.ETAT = etat;
      return repondre(`✅ *${label} is now enabled!*`);
    } else if (option === "no") {
      s.ETAT = 'no';
      return repondre(`❌ *${label} is now disabled!*`);
    } else {
      return repondre(`❗ Invalid option!\nUse: *${s.PREFIXE}${name} yes | no*`);
    }
  });
});
