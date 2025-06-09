const { zokou } = require("../framework/zokou");
const { Sticker, StickerTypes, createSticker } = require('wa-sticker-formatter');
const {
  ajouterOuMettreAJourJid,
  mettreAJourAction,
  verifierEtatJid
} = require("../bdd/antilien");
const { downloadMediaMessage, downloadContentFromMessage } = require("@whiskeysockets/baileys");

const {isUserBanned , addUserToBanList , removeUserFromBanList} = require("../bdd/banUser");
const  {addGroupToBanList,isGroupBanned,removeGroupFromBanList} = require("../bdd/banGroup");
const {isGroupOnlyAdmin,addGroupToOnlyAdminList,removeGroupFromOnlyAdminList} = require("../bdd/onlyAdmin");
const {removeSudoNumber,addSudoNumber,issudo} = require("../bdd/sudo");
const {
  atbajouterOuMettreAJourJid,
  atbverifierEtatJid
} = require("../bdd/antibot");
const { exec } = require('child_process');

const traduire = require("../framework/traduction");
const { search, download } = require('aptoide-scraper');
const fs = require('fs-extra');
const conf = require('../set');
const { default: axios } = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const { Catbox } = require("node-catbox");
const catbox = new Catbox();

// Upload file to Catbox and return the URL
async function uploadToCatbox(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }
  try {
    const uploadResult = await catbox.uploadFile({ path: filePath });
    if (uploadResult) {
      return uploadResult;
    } else {
      throw new Error("Error retrieving file link");
    }
  } catch (error) {
    throw new Error(String(error));
  }
}
const { getBinaryNodeChild, getBinaryNodeChildren } = require('@whiskeysockets/baileys')['default'];
const sleep =  (ms) =>{
  return new Promise((resolve) =>{ setTimeout (resolve, ms)})
   } ; 

// Broadcast Command
zokou({
  nomCom: 'broadcast',
  aliase: 'spread',
  categorie: "Group",
  reaction: '⚪'
}, async (bot, client, context) => {
  const {
    ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser
  } = context;

  let message = arg.join(" ");
  if (!arg[0]) {
    repondre("After the command *broadcast*, type your message to be sent to all groups you are in.");
    return;
  }

  if (!superUser) {
    repondre("You are too weak to do that");
    return;
  }

  let groups = await client.groupFetchAllParticipating();
  let groupIds = Object.entries(groups).map(group => group[1].id);
  await repondre("*Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ is sending your message to all groups ,,,💀*...");

  for (let groupId of groupIds) {
    let broadcastMessage = `*🌟𝗕𝗨𝗠𝗕𝗟𝗘𝗕𝗘𝗘 𝗫𝗠𝗗 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓🌟*\n\n🀄 Message: ${message}\n\n🗣️ Author: ${nomAuteurMessage}`;
    await client.sendMessage(groupId, {
      image: { url: 'https://i.imgur.com/HDLN3If.jpeg' },
      caption: broadcastMessage
    });
  }
});

// Disappearing Messages Off Command
zokou({
  nomCom: "disap-off",
  categorie: "Group",
  reaction: '㋛'
}, async (chatId, client, context) => {
  const { ms, repondre, verifGroupe, verifAdmin } = context;

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  if (!verifAdmin) {
    repondre("You are not an admin here!");
    return;
  }

  await client.groupToggleEphemeral(chatId, 0);
  repondre("Disappearing messages successfully turned off!");
});

// Disappearing Messages Setup Command
zokou({
  nomCom: 'disap',
  categorie: "Group",
  reaction: '❦'
}, async (chatId, client, context) => {
  const { ms, repondre, verifGroupe, verifAdmin } = context;

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  if (!verifAdmin) {
    repondre("You are not an admin here!");
    return;
  }

  repondre("*Do you want to turn on disappearing messages?*\n\nIf yes, type _*disap1* for messages to disappear after 1 day.\nOr type *disap7* for messages to disappear after 7 days.\nOr type *disap90* for messages to disappear after 90 days.\n\nTo turn it off, type *disap-off*");
});

// Requests Command
zokou({
  nomCom: 'req',
  alias: 'requests',
  categorie: "Group",
  reaction: "⚪"
}, async (chatId, client, context) => {
  const {
    ms, repondre, arg, verifGroupe, verifAdmin
  } = context;

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  if (!verifAdmin) {
    repondre("You are not an admin here, what will you do if there are pending requests?");
    return;
  }

  const pendingRequests = await client.groupRequestParticipantsList(chatId);
  if (pendingRequests.length === 0) {
    return repondre("There are no pending join requests.");
  }

  let requestList = '';
  pendingRequests.forEach((request, index) => {
    requestList += `+${request.jid.split('@')[0]}`;
    if (index < pendingRequests.length - 1) {
      requestList += "\n";
    }
  });

  client.sendMessage(chatId, {
    text: `Pending Participants:- 🕓\n${requestList}\n\nUse the command approve or reject to approve or reject these join requests.`
  });
  repondre(requestList);
});

// Reject Requests Command
zokou({
  nomCom: 'reject',
  categorie: "Group",
  reaction: '⚪'
}, async (chatId, client, context) => {
  const {
    ms, repondre, verifGroupe, verifAdmin
  } = context;

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  if (!verifAdmin) {
    repondre("You are not an admin here!");
    return;
  }

  const pendingRequests = await client.groupRequestParticipantsList(chatId);
  if (pendingRequests.length === 0) {
    return repondre("There are no pending join requests for this group.");
  }

  for (const request of pendingRequests) {
    await client.groupRequestParticipantsUpdate(chatId, [request.jid], "reject");
  }

  repondre("All pending join requests have been rejected.");
});

// Disappearing Messages for 90 Days Command
zokou({
  nomCom: "disap90",
  categorie: 'Group',
  reaction: '⚪'
}, async (chatId, client, context) => {
  const {
    ms, repondre, verifGroupe, verifAdmin
  } = context;

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  if (!verifAdmin) {
    repondre("You are not an admin here!");
    return;
  }

  await client.groupToggleEphemeral(chatId, 7776000); // 90 days in seconds
  repondre("Disappearing messages successfully turned on for 90 days!");
});

zokou({
  nomCom: "disap7",
  categorie: 'Group',
  reaction: '⚪'
}, async (client, message, context) => {
  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin } = context;

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  if (!verifAdmin) {
    repondre("You are not an admin here!");
    return;
  }

  await client.groupToggleEphemeral(message, 604800); // Set disappearing messages for 7 days
  client("Dissapearing messages successfully turned on for 7 days!");
});

// Command to enable disappearing messages for 24 hours
zokou({
  nomCom: "disap1",
  categorie: "Group",
  reaction: '⚪'
}, async (client, message, context) => {
  const { ms, repondre, arg, verifGroupe, verifAdmin } = context;

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  if (!verifAdmin) {
    repondre("You are not an admin here!");
    return;
  }

  await client.groupToggleEphemeral(message, 86400); // Set disappearing messages for 24 hours
  client("Dissapearing messages successfully turned on for 24 hours");
});

// Command to approve all pending join requests in a group
zokou({
  nomCom: "approve",
  categorie: "Group",
  reaction: "⚪"
}, async (client, message, context) => {
  const { ms, repondre, verifGroupe, verifAdmin } = context;

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  if (!verifAdmin) {
    repondre("You are not an admin here!");
    return;
  }

  const pendingRequests = await client.groupRequestParticipantsList(message);
  if (pendingRequests.length === 0) {
    return repondre("There are no pending join requests.");
  }

  for (const request of pendingRequests) {
    await client.groupRequestParticipantsUpdate(message, [request.jid], "approve");
  }

  repondre("All pending participants have been approved to join.");
});

// Command to generate a vCard (VCF) with group participants
zokou({
  nomCom: 'vcf',
  categorie: "Group",
  reaction: '⚪'
}, async (client, message, context) => {
  const { ms, repondre, verifGroupe, verifAdmin } = context;

  if (!verifAdmin) {
    repondre("You are not an admin here!");
    return;
  }

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  let groupMetadata = await client.groupMetadata(message);
  let vCardData = "XMD";
  let contactIndex = 0;

  for (let participant of groupMetadata.participants) {
    vCardData += `BEGIN:VCARD\nVERSION:3.0\nFN:[${contactIndex++}] +${participant.id.split('@')[0]} \nTEL;type=CELL;type=VOICE;waid=${participant.id.split('@')[0]}:+${participant.id.split('@')[0]}\nEND:VCARD\n`;
  }

  repondre(`A moment, *Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ* is compiling ${groupMetadata.participants.length} contacts into a vcf...`);
  await fs.writeFileSync('./contacts.vcf', vCardData.trim());

  await client.sendMessage(message, {
    document: fs.readFileSync('./contacts.vcf'),
    mimetype: 'text/vcard',
    fileName: `${groupMetadata.subject}.Vcf`,
    caption: `VCF for ${groupMetadata.subject}\nTotal Contacts: ${groupMetadata.participants.length}\n*KEEP USING B.M.B-XMD*`
  });

  fs.unlinkSync('./contacts.vcf');
});

// Command to tag all group members with a custom message
zokou({
  nomCom: 'tagall',
  categorie: "Group",
  reaction: '⚪'
}, async (client, message, context) => {
  const { ms, repondre, arg, verifGroupe, verifAdmin, nomGroupe, infosGroupe, nomAuteurMessage } = context;

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  if (!verifAdmin) {
    repondre("Command reserved for admins");
    return;
  }

  let groupParticipants = await infosGroupe.participants;
  let messageText = arg && arg.length > 0 ? arg.join(" ") : "Aucun Message";
  let formattedMessage = `========================\n  \n        ✨ *Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ* ✨\n========================\n\n👥 Group: ${nomGroupe} 🚀 \n👤 Author: *${nomAuteurMessage}* 👋 \n📜 Message: *${messageText}* 📝\n========================\n\n`;

  let emojiList = ['🦴', '👀', '😮‍💨', '❌', '✔️', '😇', '⚙️', '🔧', '🎊', '😡', '🙏🏿', '⛔️', '$', '😟', '🥵', '🐅'];
  let randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

  for (let participant of groupParticipants) {
    formattedMessage += `${randomEmoji} @${participant.id.split('@')[0]}\n`;
  }

  await client.sendMessage(message, {
    text: formattedMessage,
    mentions: groupParticipants.map(participant => participant.id)
  });
});

// Command to generate an invite link to the group
zokou({
  nomCom: "invite",
  categorie: "Group",
  reaction: '⚪'
}, async (client, message, context) => {
  const { repondre, nomGroupe, nomAuteurMessage, verifGroupe } = context;

  if (!verifGroupe) {
    repondre("This command works in groups only");
    return;
  }

  const inviteCode = await client.groupInviteCode(message);
  const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;
  repondre(`Hello ${nomAuteurMessage}, here is the group link for ${nomGroupe}:\n\nClick here to join: ${inviteLink}`);
});

// Command to promote a member to admin
zokou({
  nomCom: "promote",
  categorie: "Group",
  reaction: "⚪"
}, async (client, message, context) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser } = context;
  let groupParticipants = verifGroupe ? await infosGroupe.participants : '';

  if (!verifGroupe) {
    return repondre("For groups only");
  }

  const isMemberInGroup = (jid) => {
    return groupParticipants.some(participant => participant.id === jid);
  };

  const getAdmins = (participants) => {
    return participants.filter(participant => participant.admin !== null).map(admin => admin.id);
  };

  const groupAdmins = getAdmins(groupParticipants);

  if (groupAdmins.includes(auteurMsgRepondu)) {
    if (msgRepondu) {
      if (isMemberInGroup(auteurMsgRepondu)) {
        await client.groupParticipantsUpdate(message, [auteurMsgRepondu], 'promote');
        client.sendMessage(message, {
          text: `🎊🍾 @${auteurMsgRepondu.split('@')[0]} has been promoted as a group admin.`,
          mentions: [auteurMsgRepondu]
        });
      } else {
        repondre("This user is not part of the group.");
      }
    } else {
      repondre("Please tag the member to be promoted.");
    }
  } else {
    repondre("Sorry, you cannot perform this action because you are not an admin.");
  }
});

// Command to demote a group admin
zokou({
  nomCom: "demote",
  categorie: "Group",
  reaction: '⚪'
}, async (client, message, context) => {
  let { repondre, msgRepondu, infosGroupe, auteurMsgRepondu, verifGroupe, auteurMessage, superUser } = context;
  let groupParticipants = verifGroupe ? await infosGroupe.participants : '';

  if (!verifGroupe) {
    return repondre("For groups only");
  }

  const isMemberInGroup = (jid) => {
    return groupParticipants.some(participant => participant.id === jid);
  };

  const getAdmins = (participants) => {
    return participants.filter(participant => participant.admin !== null).map(admin => admin.id);
  };

  const groupAdmins = getAdmins(groupParticipants);

  if (groupAdmins.includes(auteurMsgRepondu)) {
    if (msgRepondu) {
      if (isMemberInGroup(auteurMsgRepondu)) {
        await client.groupParticipantsUpdate(message, [auteurMsgRepondu], 'demote');
        client.sendMessage(message, {
          text: `🙁 @${auteurMsgRepondu.split('@')[0]} has been demoted from group admin.`,
          mentions: [auteurMsgRepondu]
        });
      } else {
        repondre("This user is not part of the group.");
      }
    } else {
      repondre("Please tag the admin to be demoted.");
    }
  } else {
    repondre("Sorry, you cannot perform this action because you are not an admin.");
  }
});

// Remove Member Command
zokou({
  'nomCom': "remove",
  'alias': "kik",
  'categorie': "Group",
  'reaction': "⚪"
}, async (msg, client, context) => {
  const {
    repondre: respond,
    msgRepondu: repliedMessage,
    infosGroupe: groupInfo,
    auteurMsgRepondu: repliedBy,
    verifGroupe: isGroup,
    nomAuteurMessage: authorName,
    auteurMessage: authorJid,
    superUser: isSuperUser,
    idBot: botJid
  } = context;

  let groupParticipants = isGroup ? await groupInfo.participants : '';
  if (!isGroup) {
    return respond("This command is for groups only");
  }

  const isMemberInGroup = (jid) => {
    return groupParticipants.some(participant => participant.id === jid);
  };

  const getAdmins = (participants) => {
    return participants.filter(p => p.admin !== null).map(p => p.id);
  };

  const admins = isGroup ? getAdmins(groupParticipants) : '';
  let isAdmin = isGroup ? admins.includes(repliedBy) : false;
  let isUserInGroup = isGroup ? isMemberInGroup(repliedBy) : false;
  let isBotAdmin = isGroup ? admins.includes(botJid) : false;

  try {
    if (isUserInGroup || isSuperUser) {
      if (repliedMessage) {
        if (isBotAdmin) {
          if (isUserInGroup && !isAdmin) {
            const sticker = new Sticker("https://raw.githubusercontent.com/Black-Tappy/Bunblebee-XMD/main/media/remover.gif", {
              'pack': 'Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ',
              'author': authorName,
              'type': StickerTypes.FULL,
              'categories': ['🤩', '🎉'],
              'id': "12345",
              'quality': 0x32,
              'background': "#000000"
            });

            await sticker.toFile("st.webp");
            const message = `@${repliedBy.split('@')[0]} was removed from the group.`;
            await client.groupParticipantsUpdate(msg, [repliedBy], "remove");
            client.sendMessage(msg, {
              'text': message,
              'mentions': [repliedBy]
            });
          } else {
            respond("This member cannot be removed because they are an administrator.");
          }
        } else {
          respond("Sorry, I cannot perform this action because I am not an administrator.");
        }
      } else {
        respond("Please tag the member to be removed.");
      }
    } else {
      respond("Sorry, you cannot perform this action because you are not an administrator.");
    }
  } catch (error) {
    respond(`Oops! Error: ${error}`);
  }
});


// Add Member Command
zokou({
  'nomCom': "add",
  'categorie': "Group",
  'reaction': '⚪'
}, async (msg, client, context) => {
  const {
    repondre: respond,
    msgRepondu: repliedMessage,
    infosGroupe: groupInfo,
    auteurMsgRepondu: repliedBy,
    verifGroupe: isGroup,
    nomAuteurMessage: authorName,
    auteurMessage: authorJid,
    superUser: isSuperUser,
    idBot: botJid
  } = context;

  if (!isGroup) {
    return respond("This command works only in groups.");
  }

  const groupMetadata = await client.groupMetadata(msg);
  const isBotAdmin = await isAdmin(groupMetadata, client.user.jid);
  if (!isBotAdmin) {
    return await client.sendMessage(msg, "_I'm not an admin._");
  }

  let match = repliedMessage || msg;
  if (!match) {
    return await client.sendMessage(msg, "Example: add 254759000340");
  }

  match = jidToNum(match);
  const result = await client.addMember(match);
  if (result === "403") {
    return await client.sendMessage(msg, "_Failed, invite sent_");
  } else if (result && result !== '200') {
    return await client.sendMessage(msg, result);
  }
});


// Delete Message Command
zokou({
  'nomCom': "del",
  'categorie': 'super-User',
  'reaction': '⚪'
}, async (msg, client, context) => {
  const {
    ms: message,
    repondre: respond,
    verifGroupe: isGroup,
    auteurMsgRepondu: repliedBy,
    idBot: botJid,
    msgRepondu: repliedMessage,
    verifAdmin: isAdmin,
    superUser: isSuperUser
  } = context;

  if (!repliedMessage) {
    respond("Please mention the message to delete.");
    return;
  }

  if (isSuperUser && repliedBy === botJid) {
    const deleteMessage = {
      'remoteJid': msg,
      'fromMe': true,
      'id': message.message.extendedTextMessage.contextInfo.stanzaId
    };
    await client.sendMessage(msg, { 'delete': deleteMessage });
    return;
  }

  if (isGroup && (isAdmin || isSuperUser)) {
    try {
      const deleteMessage = {
        'remoteJid': msg,
        'id': message.message.extendedTextMessage.contextInfo.stanzaId,
        'fromMe': false,
        'participant': message.message.extendedTextMessage.contextInfo.participant
      };
      await client.sendMessage(msg, { 'delete': deleteMessage });
    } catch (error) {
      respond("I need admin rights.");
    }
  } else {
    respond("Sorry, you are not an administrator of the group.");
  }
});


// Group Information Command
zokou({
  'nomCom': "ginfo",
  'categorie': "Group"
}, async (msg, client, context) => {
  const {
    ms: message,
    repondre: respond,
    verifGroupe: isGroup
  } = context;

  if (!isGroup) {
    respond("This command works only in groups.");
    return;
  }

  try {
    let groupPic = await client.profilePictureUrl(msg, "image");
  } catch {
    groupPic = conf.IMAGE_MENU;
  }

  const groupMetadata = await client.groupMetadata(msg);
  const groupInfo = {
    'image': {
      'url': groupPic
    },
    'caption': `*━━━━『GROUP INFO』━━━━*\n\n*🎐Name:* ${groupMetadata.subject}\n\n*🔩Group's ID:* ${msg}\n\n*🔍Desc:*\n\n${groupMetadata.desc}`
  };
  client.sendMessage(msg, groupInfo, { 'quoted': message });
});


// Anti-Link Command
zokou({
  'nomCom': "antilink",
  'categorie': 'Group',
  'reaction': '🔗'
}, async (msg, client, context) => {
  const {
    repondre: respond,
    arg: args,
    verifGroupe: isGroup,
    superUser: isSuperUser,
    verifAdmin: isAdmin
  } = context;

  if (!isGroup) {
    return respond("This command works only in groups.");
  }

  if (isSuperUser || isAdmin) {
    const isAntilinkEnabled = await verifierEtatJid(msg);
    try {
      if (!args || !args[0] || args[0] === " ") {
        respond("antilink on to activate the anti-link feature\nantilink off to deactivate it\nantilink action/remove to directly remove the link\nantilink action/warn to give warnings");
        return;
      }

      if (args[0] === 'on') {
        if (isAntilinkEnabled) {
          respond("Antilink is already activated for this group.");
        } else {
          await ajouterOuMettreAJourJid(msg, "oui");
          respond("Antilink has been successfully activated.");
        }
      } else if (args[0] === 'off') {
        if (isAntilinkEnabled) {
          await ajouterOuMettreAJourJid(msg, "non");
          respond("Antilink has been successfully deactivated.");
        } else {
          respond("Antilink is not activated for this group.");
        }
      } else if (args.join('').startsWith('action')) {
        const action = args[1].toLowerCase();
        if (['remove', 'warn'].includes(action)) {
          if (action === 'remove') {
            await ajouterOuMettreAJourJid(msg, 'remove');
            respond("Antilink is now set to remove the link.");
          } else if (action === 'warn') {
            await ajouterOuMettreAJourJid(msg, 'warn');
            respond("Antilink is now set to warn the user.");
          }
        } else {
          respond("Invalid action.");
        }
      } else {
        respond("Invalid command. Use: antelink on/off or antelink action/remove/warn");
      }
    } catch (error) {
      respond(`Error: ${error.message}`);
    }
  } else {
    respond("You need to be an administrator or a super user to run this command.");
  }
});


// Anti-Bot Command
zokou({
  'nomCom': "antibot",
  'categorie': "Group",
  'reaction': "⚪"
}, async (msg, client, context) => {
  const {
    repondre: respond,
    arg: args,
    superUser: isSuperUser
  } = context;

  if (!isSuperUser) {
    return respond("You need to be a super user to run this command.");
  }

  if (!args[0]) {
    return respond("To activate, use: antibot on\nTo deactivate, use: antibot off");
  }

  if (args[0] === "on") {
    await atbajouterOuMettreAJourJid(msg, "on");
    respond("Antibot has been activated.");
  } else if (args[0] === "off") {
    await atbajouterOuMettreAJourJid(msg, "off");
    respond("Antibot has been deactivated.");
  } else {
    respond("Invalid command. Use: antibot on/off");
  }
});

zokou({
  'nomCom': 'group',
  'categorie': 'Group'
}, async (groupId, client, context) => {
  const { repondre, verifGroupe, verifAdmin, superUser, arg } = context;
  
  if (!verifGroupe) {
    repondre("Order reserved for groups only.");
    return;
  }

  if (superUser || verifAdmin) {
    if (!arg[0]) {
      repondre("Instructions: Type 'group open' or 'group close'");
      return;
    }
    const action = arg.join(" ");
    
    switch (action) {
      case "open":
        await client.groupSettingUpdate(groupId, "not_announcement");
        repondre("Group opened successfully. Participants can now send messages.");
        break;
      case "close":
        await client.groupSettingUpdate(groupId, "announcement");
        repondre("Group closed successfully.");
        break;
      default:
        repondre("Invalid option. Use 'open' or 'close'.");
    }
  } else {
    repondre("This command is for admins only!");
    return;
  }
});

// Command to change the group name
zokou({
  'nomCom': 'gname',
  'categorie': "Group"
}, async (groupId, client, context) => {
  const { arg, repondre, verifAdmin } = context;
  
  if (!verifAdmin) {
    repondre("Command reserved for administrators.");
    return;
  }

  if (!arg[0]) {
    repondre("Please enter the group name.");
    return;
  }

  const newName = arg.join(" ");
  await client.groupUpdateSubject(groupId, newName);
  repondre(`Group name updated to: *${newName}*`);
});

// Command to change the group description
zokou({
  'nomCom': "gdesc",
  'categorie': 'Group'
}, async (groupId, client, context) => {
  const { arg, repondre, verifAdmin } = context;

  if (!verifAdmin) {
    repondre("Command reserved for administrators.");
    return;
  }

  if (!arg[0]) {
    repondre("Please enter the group description.");
    return;
  }

  const newDesc = arg.join(" ");
  await client.groupUpdateDescription(groupId, newDesc);
  repondre(`Group description updated to: *${newDesc}*`);
});

// Command to revoke a group invite link
zokou({
  'nomCom': "revoke",
  'categorie': "Group"
}, async (groupId, client, context) => {
  const { arg, repondre, verifGroupe, verifAdmin } = context;

  if (!verifAdmin) {
    repondre("Command reserved for admins.");
    return;
  }

  if (!verifGroupe) {
    repondre("This command is only allowed in groups.");
  }

  await client.groupRevokeInvite(groupId);
  repondre("Group link revoked.");
});

// Command to change group profile picture
zokou({
  'nomCom': "gpp",
  'categorie': "Group"
}, async (groupId, client, context) => {
  const { repondre, msgRepondu, verifAdmin } = context;

  if (!verifAdmin) {
    repondre("Command reserved for admins.");
    return;
  }

  if (msgRepondu.imageMessage) {
    const imageFilePath = await client.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
    await client.updateProfilePicture(groupId, { 'url': imageFilePath }).then(() => {
      client.sendMessage(groupId, { 'text': "Group profile picture changed." });
      fs.unlinkSync(imageFilePath); // Clean up file after use
    }).catch(err => client.sendMessage(groupId, { 'text': err }));
  } else {
    repondre("Please mention an image.");
  }
});

// Command to send a message to all group members (via tag)
zokou({
  'nomCom': "hidetag",
  'categorie': "Group",
  'reaction': '🎤'
}, async (groupId, client, context) => {
  const { repondre, msgRepondu, verifGroupe, arg, verifAdmin, superUser } = context;

  if (!verifGroupe) {
    repondre("This command is only allowed in groups.");
  }

  if (verifAdmin || superUser) {
    let groupMetadata = await client.groupMetadata(groupId);
    let participantIds = groupMetadata.participants.map(participant => participant.id);

    if (msgRepondu) {
      let mediaMessage;
      if (msgRepondu.imageMessage) {
        mediaMessage = await client.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        await client.sendMessage(groupId, {
          'image': { 'url': mediaMessage },
          'caption': msgRepondu.imageMessage.caption,
          'mentions': participantIds
        });
      } else if (msgRepondu.videoMessage) {
        mediaMessage = await client.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
        await client.sendMessage(groupId, {
          'video': { 'url': mediaMessage },
          'caption': msgRepondu.videoMessage.caption,
          'mentions': participantIds
        });
      } else if (msgRepondu.audioMessage) {
        mediaMessage = await client.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
        await client.sendMessage(groupId, {
          'audio': { 'url': mediaMessage },
          'mentions': participantIds
        });
      } else if (msgRepondu.stickerMessage) {
        mediaMessage = await client.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
        const sticker = new Sticker(mediaMessage, {
          'pack': "Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ-tag",
          'type': StickerTypes.CROPPED,
          'categories': ['🤩', '🎉'],
          'id': "12345",
          'quality': 70,
          'background': "transparent"
        });
        const buffer = await sticker.toBuffer();
        await client.sendMessage(groupId, {
          'sticker': buffer,
          'mentions': participantIds
        });
      } else {
        await client.sendMessage(groupId, {
          'text': msgRepondu.conversation,
          'mentions': participantIds
        });
      }
    } else {
      if (!arg[0]) {
        repondre("Please provide text or mention the message you want to send.");
        return;
      }
      await client.sendMessage(groupId, {
        'text': arg.join(" "),
        'mentions': participantIds
      });
    }
  } else {
    repondre("Command reserved for administrators.");
  }
});

const cron = require("../bdd/cron");

// Automute Command
zokou({
  nomCom: "automute",
  categorie: 'Group'
}, async (groupId, client, commandData) => {
  const { arg, repondre, verifAdmin } = commandData;

  if (!verifAdmin) {
    repondre("You are not an administrator of the group");
    return;
  }

  const groupCron = await cron.getCronById(groupId);
  if (!arg || arg.length === 0) {
    let muteStatus = groupCron && groupCron.mute_at ? 
      `The group will be muted at ${groupCron.mute_at.split(':')[0]} ${groupCron.mute_at.split(':')[1]}` :
      "No time set for automatic mute";
    
    const instructions = `
      *State:* ${muteStatus}
      *Instructions:* 
      To activate automatic mute, add the minute and hour after the command separated by ':'
      Example: automute 9:30
      To delete the automatic mute, use the command *automute del*
    `;
    repondre(instructions);
    return;
  }

  const timeSetting = arg.join(" ");
  if (timeSetting.toLowerCase() === 'del') {
    if (!groupCron) {
      repondre("No automatic mute is active");
    } else {
      await cron.delCron(groupId);
      repondre("The automatic mute has been removed; restart to apply changes").then(() => {
        exec("pm2 restart all");
      });
    }
  } else if (timeSetting.includes(':')) {
    await cron.addCron(groupId, "mute_at", timeSetting);
    repondre(`Setting up automatic mute for ${timeSetting}; restart to apply changes`).then(() => {
      exec("pm2 restart all");
    });
  } else {
    repondre("Please enter a valid time with hour and minute separated by :");
  }
});

// Autounmute Command
zokou({
  nomCom: "autounmute",
  categorie: 'Group'
}, async (groupId, client, commandData) => {
  const { arg, repondre, verifAdmin } = commandData;

  if (!verifAdmin) {
    repondre("You are not an administrator of the group");
    return;
  }

  const groupCron = await cron.getCronById(groupId);
  if (!arg || arg.length === 0) {
    let unmuteStatus = groupCron && groupCron.unmute_at ?
      `The group will be un-muted at ${groupCron.unmute_at.split(':')[0]}H ${groupCron.unmute_at.split(':')[1]}` :
      "No time set for autounmute";

    const instructions = `
      *State:* ${unmuteStatus}
      *Instructions:* 
      To activate autounmute, add the minute and hour after the command separated by ':'
      Example: autounmute 7:30
      To delete autounmute, use the command *autounmute del*
    `;
    repondre(instructions);
    return;
  }

  const timeSetting = arg.join(" ");
  if (timeSetting.toLowerCase() === 'del') {
    if (!groupCron) {
      repondre("No autounmute is active");
    } else {
      await cron.delCron(groupId);
      repondre("The autounmute has been removed; restart to apply changes").then(() => {
        exec("pm2 restart all");
      });
    }
  } else if (timeSetting.includes(':')) {
    await cron.addCron(groupId, "unmute_at", timeSetting);
    repondre(`Setting up autounmute for ${timeSetting}; restart to apply changes`).then(() => {
      exec("pm2 restart all");
    });
  } else {
    repondre("Please enter a valid time with hour and minute separated by :");
  }
});

// Fkick Command
zokou({
  nomCom: 'fkick',
  categorie: "Group"
}, async (groupId, client, commandData) => {
  const { arg, repondre, verifAdmin, superUser, verifZokouAdmin } = commandData;

  if (!verifAdmin && !superUser) {
    repondre("Sorry, you are not an administrator of the group");
    return;
  }

  if (!verifZokouAdmin) {
    repondre("You need administrative rights to perform this command");
    return;
  }

  if (!arg || arg.length === 0) {
    repondre("Please enter the country code whose members will be removed");
    return;
  }

  const groupMetadata = await client.groupMetadata(groupId);
  const participants = groupMetadata.participants;
  
  for (let participant of participants) {
    if (participant.id.startsWith(arg[0]) && !participant.admin) {
      await client.groupParticipantsUpdate(groupId, [participant.id], "remove");
    }
  }
});

// NSFW Command
zokou({
  nomCom: 'nsfw',
  categorie: "Group"
}, async (groupId, client, commandData) => {
  const { arg, repondre, verifAdmin } = commandData;

  if (!verifAdmin) {
    repondre("Sorry, you cannot enable NSFW content without being an administrator of the group");
    return;
  }

  const hentaiService = require('../bdd/hentai');
  const isNSFWActive = await hentaiService.checkFromHentaiList(groupId);

  if (arg[0] === 'on') {
    if (isNSFWActive) {
      repondre("NSFW content is already active for this group");
    } else {
      await hentaiService.addToHentaiList(groupId);
      repondre("NSFW content is now active for this group");
    }
  } else if (arg[0] === 'off') {
    if (!isNSFWActive) {
      repondre("NSFW content is already disabled for this group");
    } else {
      await hentaiService.removeFromHentaiList(groupId);
      repondre("NSFW content is now disabled for this group");
    }
  } else {
    repondre("You must enter \"on\" or \"off\"");
  }
});

// Antiword Command
zokou({
  nomCom: "antiword",
  categorie: "Group",
  reaction: '🔗'
}, async (groupId, client, commandData) => {
  const { repondre, arg, verifGroupe, superUser, verifAdmin } = commandData;

  if (!verifGroupe) {
    return repondre("*This command is for groups only*");
  }

  if (!superUser && !verifAdmin) {
    repondre("You are not authorized to use this command");
    return;
  }

  const antiwordState = await verifierEtatJid(groupId);

  try {
    if (!arg || !arg[0] || arg === " ") {
      repondre(`
        antiword on to activate the anti-word feature
        antiword off to deactivate the anti-word feature
        antiword action/remove to directly remove the sender without notice
        antiword action/warn to give warnings
        antiword action/delete to remove the word without any sanctions
        By default, the anti-word feature is set to delete.
      `);
      return;
    }

    if (arg[0] === 'on') {
      if (antiwordState) {
        repondre("The anti-word feature is already activated for this group");
      } else {
        await ajouterOuMettreAJourJid(groupId, "oui");
        repondre("The anti-word feature has been successfully activated");
      }
    } else if (arg[0] === "off") {
      if (antiwordState) {
        await ajouterOuMettreAJourJid(groupId, "non");
        repondre("The anti-word feature has been successfully deactivated");
      } else {
        repondre("Antiword is not activated for this group");
      }
    } else if (arg.join('').split('/')[0] === "action") {
      let action = arg.join('').split('/')[1].toLowerCase();
      if (["remove", "warn", "delete"].includes(action)) {
        await mettreAJourAction(groupId, action);
        repondre(`The anti-word action has been updated to ${action}`);
      } else {
        repondre("The only actions available are warn, remove, and delete");
      }
    } else {
      repondre(`
        antiword on to activate the anti-word feature
        antiword off to deactivate the anti-word feature
        antiword action/remove to directly remove the sender without notice
        antiword action/warn to give warnings
        antiword action/delete to remove the word without any sanctions
        By default, the anti-word feature is set to delete.
      `);
    }
  } catch (error) {
    repondre(error.message);
  }
});

// Antilink-all Command
zokou({
  nomCom: "antilink-all",
  categorie: 'Group',
  reaction: '🔗'
}, async (groupId, client, commandData) => {
  const { repondre, arg, verifGroupe, superUser, verifAdmin } = commandData;

  if (!verifGroupe) {
    return repondre("*This command works only in groups*");
  }

  if (!superUser && !verifAdmin) {
    repondre("You are not allowed to use this command");
    return;
  }

  const antilinkState = await verifierEtatJid(groupId);

  try {
    if (!arg || !arg[0] || arg === " ") {
      repondre(`
        antilink-all on to activate the anti-link feature
        antilink-all off to deactivate the anti-link feature
        antilink-all action/remove to directly remove the link without notice
        antilink-all action/warn to give warnings
        antilink-all action/delete to remove the link without any sanctions
        By default, the anti-link feature is set to delete.
      `);
      return;
    }

    if (arg[0] === 'on') {
      if (antilinkState) {
        repondre("Antilink-all is already activated for this group");
      } else {
        await ajouterOuMettreAJourJid(groupId, "oui");
        repondre("The anti-link-all feature is activated successfully");
      }
    } else if (arg[0] === 'off') {
      if (!antilinkState) {
        repondre("Antilink-all is not activated for this group");
      } else {
        await ajouterOuMettreAJourJid(groupId, "non");
        repondre("The anti-link-all feature has been deactivated successfully");
      }
    } else if (arg.join('').split('/')[0] === "action") {
      let action = arg.join('').split('/')[1].toLowerCase();
      if (["remove", "warn", "delete"].includes(action)) {
        await mettreAJourAction(groupId, action);
        repondre(`The anti-link action has been updated to ${action}`);
      } else {
        repondre("The only actions available are warn, remove, and delete");
      }
    } else {
      repondre(`
        antilink-all on to activate the anti-link feature
        antilink-all off to deactivate the anti-link feature
        antilink-all action/remove to directly remove the link without notice
        antilink-all action/warn to give warnings
        antilink-all action/delete to remove the link without any sanctions
        By default, the anti-link feature is set to delete.
      `);
    }
  } catch (error) {
    repondre(error.message);
  }
});
//crew command 
zokou({
  nomCom: "crew",
  categorie: "Mods"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, auteurMessage, superUser, auteurMsgRepondu, msgRepondu } = commandeOptions;

  if (!superUser) {
    repondre("only mods can use this command");
    return;
  }

  if (!arg[0]) {
    repondre('Please enter the name of the group to create');
    return;
  }

  if (!msgRepondu) {
    repondre('Please mention a member to add');
    return;
  }

  const name = arg.join(" ");
  const group = await zk.groupCreate(name, [auteurMessage, auteurMsgRepondu]);
  console.log("created group with id: " + group.gid);
  zk.sendMessage(group.id, { text: `Bienvenue dans ${name}` });
});
//lef command 
zokou({
  nomCom: "left",
  categorie: "Mods"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!verifGroupe) {
    repondre("group only");
    return;
  }

  if (!superUser) {
    repondre("order reserved for the owner");
    return;
  }

  await zk.groupLeave(dest);
});
// join command 
zokou({
  nomCom: "join",
  categorie: "Mods"
}, async (dest, zk, commandeOptions) => {
  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage } = commandeOptions;

  if (!superUser) {
    repondre("command reserved for the bot owner");
    return;
  }

  let result = arg[0].split('https://chat.whatsapp.com/')[1];
  await zk.groupAcceptInvite(result);
  repondre(`Success`).catch((e) => {
    repondre('Unknown error');
  });
});
//jid command 
zokou({
  nomCom: "jid",
  categorie: "Mods"
}, async (dest, zk, commandeOptions) => {
  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage, auteurMsgRepondu } = commandeOptions;

  if (!superUser) {
    repondre("command reserved for the bot owner");
    return;
  }

  let jid = msgRepondu ? auteurMsgRepondu : dest;
  zk.sendMessage(dest, { text: jid }, { quoted: ms });
});
//block command 
zokou({
  nomCom: "block",
  categorie: "Mods"
}, async (dest, zk, commandeOptions) => {
  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage, auteurMsgRepondu } = commandeOptions;

  if (!superUser) {
    repondre("command reserved for the bot owner");
    return;
  }

  let jid = msgRepondu ? auteurMsgRepondu : dest;

  if (verifGroupe && !msgRepondu) {
    repondre('Be sure to mention the person to block');
    return;
  }

  await zk.updateBlockStatus(jid, "block")
    .then(repondre('Success'));
});
//unblock command 
zokou({
  nomCom: "unblock",
  categorie: "Mods"
}, async (dest, zk, commandeOptions) => {
  const { arg, ms, repondre, verifGroupe, msgRepondu, verifAdmin, superUser, auteurMessage, auteurMsgRepondu } = commandeOptions;

  if (!superUser) {
    repondre("command reserved for the bot owner");
    return;
  }

  let jid = msgRepondu ? auteurMsgRepondu : dest;

  if (verifGroupe && !msgRepondu) {
    repondre('Please mention the person to be unlocked');
    return;
  }

  await zk.updateBlockStatus(jid, "unblock")
    .then(repondre('Success'));
});
//kickall command 
zokou({
  nomCom: "kickall",
  categorie: 'Group',
  reaction: "📣"
}, async (dest, zk, commandeOptions) => {
  const { auteurMessage, ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser, prefixe } = commandeOptions;

  const metadata = await zk.groupMetadata(dest);

  if (!verifGroupe) {
    repondre("✋🏿This command is reserved for groups ❌");
    return;
  }

  if (superUser || auteurMessage == metadata.owner) {
    repondre('No-admin members will be removed from the group. You have 5 seconds to reclaim your choice by restarting the bot.');
    await sleep(5000);

    let membersGroup = verifGroupe ? await infosGroupe.participants : "";
    try {
      let users = membersGroup.filter((member) => !member.admin);

      for (const user of users) {
        await zk.groupParticipantsUpdate(dest, [user.id], "remove");
        await sleep(500);
      }
    } catch (e) {
      repondre("I need administration rights");
    }
  } else {
    repondre("Order reserved for the group owner for security reasons");
    return;
  }
});
// ban command 
zokou({
  nomCom: 'ban',
  categorie: 'Mods',
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, auteurMsgRepondu, msgRepondu, repondre, prefixe, superUser } = commandeOptions;

  if (!superUser) {
    repondre('This command is only allowed to the bot owner');
    return;
  }

  if (!arg[0]) {
    repondre(`Mention the victim by typing ${prefixe}ban add/del to ban/unban the victim`);
    return;
  }

  if (msgRepondu) {
    switch (arg.join(' ')) {
      case 'add':
        let youareban = await isUserBanned(auteurMsgRepondu);
        if (youareban) {
          repondre('This user is already banned');
          return;
        }
        addUserToBanList(auteurMsgRepondu);
        break;

      case 'del':
        let estbanni = await isUserBanned(auteurMsgRepondu);
        if (estbanni) {
          removeUserFromBanList(auteurMsgRepondu);
          repondre('This user is now free.');
        } else {
          repondre('This user is not banned.');
        }
        break;

      default:
        repondre('Bad option');
        break;
    }
  } else {
    repondre('Mention the victim');
    return;
  }
});
// ban group command 
zokou({
  nomCom: 'bangroup',
  categorie: 'Mods',
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, auteurMsgRepondu, msgRepondu, repondre, prefixe, superUser, verifGroupe } = commandeOptions;

  if (!superUser) {
    repondre('This command is only allowed to the bot owner');
    return;
  }

  if (!verifGroupe) {
    repondre('Order reserved for groups');
    return;
  }

  if (!arg[0]) {
    repondre(`Type ${prefixe}bangroup add/del to ban/unban the group`);
    return;
  }

  const groupAlreadyBanned = await isGroupBanned(dest);

  switch (arg.join(' ')) {
    case 'add':
      if (groupAlreadyBanned) {
        repondre('This group is already banned');
        return;
      }
      addGroupToBanList(dest);
      break;

    case 'del':
      if (groupAlreadyBanned) {
        removeGroupFromBanList(dest);
        repondre('This group is now free.');
      } else {
        repondre('This group is not banned.');
      }
      break;

    default:
      repondre('Bad option');
      break;
  }
});
//only admins command 
zokou({
  nomCom: 'onlyadmin',
  categorie: 'Group',
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, auteurMsgRepondu, msgRepondu, repondre, prefixe, superUser, verifGroupe, verifAdmin } = commandeOptions;

  if (superUser || verifAdmin) {
    if (!verifGroupe) {
      repondre('Order reserved for groups');
      return;
    }

    if (!arg[0]) {
      repondre(`Type ${prefixe}onlyadmin add/del to ban/unban the group`);
      return;
    }

    const groupAlreadyInOnlyAdmin = await isGroupOnlyAdmin(dest);

    switch (arg.join(' ')) {
      case 'add':
        if (groupAlreadyInOnlyAdmin) {
          repondre('This group is already in onlyadmin mode');
          return;
        }
        addGroupToOnlyAdminList(dest);
        break;

      case 'del':
        if (groupAlreadyInOnlyAdmin) {
          removeGroupFromOnlyAdminList(dest);
          repondre('This group is now free.');
        } else {
          repondre('This group is not in onlyadmin mode.');
        }
        break;

      default:
        repondre('Bad option');
        break;
    }
  } else {
    repondre('You are not entitled to this order');
  }
});
// sudo command 
zokou({
  nomCom: 'sudo',
  categorie: 'Mods',
}, async (dest, zk, commandeOptions) => {
  const { ms, arg, auteurMsgRepondu, msgRepondu, repondre, prefixe, superUser } = commandeOptions;

  if (!superUser) {
    repondre('This command is only allowed to the bot owner');
    return;
  }

  if (!arg[0]) {
    repondre(`Mention the person by typing ${prefixe}sudo add/del`);
    return;
  }

  if (msgRepondu) {
    switch (arg.join(' ')) {
      case 'add':
        let youaresudo = await issudo(auteurMsgRepondu);
        if (youaresudo) {
          repondre('This user is already sudo');
          return;
        }
        addSudoNumber(auteurMsgRepondu);
        repondre('Success');
        break;

      case 'del':
        let estsudo = await issudo(auteurMsgRepondu);
        if (estsudo) {
          removeSudoNumber(auteurMsgRepondu);
          repondre('This user is now non-sudo.');
        } else {
          repondre('This user is not sudo.');
        }
        break;

      default:
        repondre('Bad option');
        break;
    }
  } else {
    repondre('Mention the victim');
    return;
  }
});
//save command 
zokou({
  nomCom: "save",
  categorie: "Mods"
}, async (dest, zk, commandeOptions) => {
  const { repondre, msgRepondu, superUser, auteurMessage } = commandeOptions;

  if (superUser) {
    if (msgRepondu) {
      let msg;
      if (msgRepondu.imageMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        msg = {
          image: { url: media },
          caption: msgRepondu.imageMessage.caption,
        };
      } else if (msgRepondu.videoMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
        msg = {
          video: { url: media },
          caption: msgRepondu.videoMessage.caption,
        };
      } else if (msgRepondu.audioMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
        msg = {
          audio: { url: media },
          mimetype: 'audio/mp4',
        };
      } else if (msgRepondu.stickerMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
        let stickerMess = new Sticker(media, {
          pack: 'Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠD',
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });
        const stickerBuffer2 = await stickerMess.toBuffer();
        msg = { sticker: stickerBuffer2 };
      } else {
        msg = {
          text: msgRepondu.conversation,
        };
      }

      zk.sendMessage(auteurMessage, msg);
    } else {
      repondre('Mention the message that you want to save');
    }
  } else {
    repondre('Only mods can use this command');
  }
});
//mention
zokou({
  nomCom: 'mention',
  categorie: 'Mods',
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, superUser, arg } = commandeOptions;

  if (!superUser) {
    repondre('You do not have the rights to use this command.');
    return;
  }

  const mbdd = require('../bdd/mention');
  const alldata = await mbdd.recupererToutesLesValeurs();
  const data = alldata[0];

  // If no arguments are passed, show the current mention status
  if (!arg || arg.length < 1) {
    let etat = data.status === 'non' ? 'Deactivated' : 'Activated';
    let mtype = data.type || 'No data';
    let url = data.url || 'No data';

    let msg = `
      Status: ${etat}
      Type: ${mtype}
      Link: ${url}

      *Instructions:*

      To activate or modify the mention, follow this syntax:
      mention link type message

      The available types are: audio, video, image, and sticker.
      Example: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is adams.

      To stop the mention, use: mention stop`;

    repondre(msg);
    return;
  }

  // If there are arguments for updating the mention
  if (arg.length >= 2) {
    if (arg[0].startsWith('http') && ['image', 'audio', 'video', 'sticker'].includes(arg[1])) {
      const message = arg.slice(2).join(' ') || '';
      await mbdd.addOrUpdateDataInMention(arg[0], arg[1], message);
      await mbdd.modifierStatusId1('oui')
        .then(() => {
          repondre('Mention updated.');
        });
    } else {
      repondre(`*Instructions:*
      To activate or modify the mention, follow this syntax:
      mention link type message.

      The available types are: audio, video, image, and sticker.`);
    }
  } else if (arg.length === 1 && arg[0] === 'stop') {
    // If the 'stop' command is issued
    await mbdd.modifierStatusId1('non')
      .then(() => {
        repondre('Mention stopped.');
      });
  } else {
    repondre('Please make sure to follow the instructions.');
  }
});

// Anime random command
zokou({
  nomCom: "ranime",
  categorie: "Fun",
  reaction: "📺"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const jsonURL = "https://api.jikan.moe/v4/random/anime";

  try {
    const response = await axios.get(jsonURL);
    const data = response.data.data;

    const message = `📺 Titre: ${data.title}\n🎬 Épisodes: ${data.episodes}\n📡 Statut: ${data.status}\n📝 Synopsis: ${data.synopsis}\n🔗 URL: ${data.url}`;

    // Send image and information
    await zk.sendMessage(origineMessage, {
      image: { url: data.images.jpg.image_url },
      caption: message
    }, { quoted: ms });
  } catch (error) {
    console.error('Error retrieving data from JSON:', error);
    repondre('Error retrieving data from the anime API.');
  }
});

// Google search command
zokou({
  nomCom: "google",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Give me a query.\n*Example: .google What is a bot.*");
    return;
  }

  const google = require('google-it');
  try {
    const results = await google({ query: arg.join(" ") });
    let msg = `Google search for: ${arg.join(" ")}\n\n`;

    results.forEach(result => {
      msg += `➣ Title: ${result.title}\n`;
      msg += `➣ Description: ${result.snippet}\n`;
      msg += `➣ Link: ${result.link}\n\n────────────────────────\n\n`;
    });

    repondre(msg);
  } catch (error) {
    console.error('Google search error:', error);
    repondre("An error occurred during Google search.");
  }
});

// Movie/Series search command (IMDb)
zokou({
  nomCom: "movie",
  aliases: ["series", "imdb"],
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;

  if (!arg[0]) {
    repondre("Give the name of a series or movie.");
    return;
  }

  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg.join(" ")}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = `
⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍
\`\`\` 𝕀𝕄𝔻𝔹 𝕊𝔼𝔸ℝℂℍ\`\`\`
⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎
🎬 Title: ${imdbData.Title}
📅 Year: ${imdbData.Year}
⭐ Rating: ${imdbData.Rated}
📆 Release: ${imdbData.Released}
⏳ Runtime: ${imdbData.Runtime}
🌀 Genre: ${imdbData.Genre}
👨🏻‍💻 Director: ${imdbData.Director}
✍ Writers: ${imdbData.Writer}
👨‍🎬 Actors: ${imdbData.Actors}
📃 Synopsis: ${imdbData.Plot}
🌐 Language: ${imdbData.Language}
🌍 Country: ${imdbData.Country}
🎖️ Awards: ${imdbData.Awards}
📦 Box Office: ${imdbData.BoxOffice}
🏙️ Production: ${imdbData.Production}
🌟 Score: ${imdbData.imdbRating}
❎ IMDb Votes: ${imdbData.imdbVotes}`;

    await zk.sendMessage(dest, {
      image: { url: imdbData.Poster },
      caption: imdbInfo
    }, { quoted: ms });
  } catch (error) {
    console.error('IMDb search error:', error);
    repondre("An error occurred while searching IMDb.");
  }
});

// Emojimix command
zokou({
  nomCom: "emomix",
  aliases: ["emix", "emojimix"],
  categorie: "Conversion"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;

  if (!arg[0] || arg.length !== 1) {
    repondre("Incorrect use. Example: .emojimix 😀;🥰");
    return;
  }

  const emojis = arg.join(" ").split(";");
  
  if (emojis.length !== 2) {
    repondre("Please specify two emojis using a ';' as a separator.");
    return;
  }

  const [emoji1, emoji2] = emojis.map(e => e.trim());

  try {
    const response = await axios.get(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

    if (response.data.status) {
      const sticker = new Sticker(response.data.result, {
        pack: "Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ",
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });
      const stickerBuffer = await sticker.toBuffer();
      await zk.sendMessage(dest, { sticker: stickerBuffer }, { quoted: ms });
    } else {
      repondre("Unable to create emoji mix.");
    }
  } catch (error) {
    console.error('Emoji mix error:', error);
    repondre("An error occurred while creating the emoji mix.");
  }
});


// Convert media (image/video) to sticker
zokou({
  nomCom: 'sticker',
  aliases: ['s'],
  categorie: "Converter",
  reaction: "💧"
}, async (message, bot, context) => {
  const {
    ms: messageData,
    mtype: messageType,
    arg: arguments,
    repondre: reply,
    nomAuteurMessage: authorName
  } = context;

  const messageString = JSON.stringify(messageData.message);
  const isImageMessage = messageType === "extendedTextMessage" && messageString.includes('imageMessage');
  const isVideoMessage = messageType === "extendedTextMessage" && messageString.includes("videoMessage");

  const randomFileName = `${Math.floor(Math.random() * 10000)}.webp`;
  let mediaBuffer = Buffer.from([]);
  let mediaContent;
  let media;

  try {
    if (messageType === "imageMessage" || isImageMessage) {
      media = messageData.message.imageMessage || messageData.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
      mediaContent = await downloadContentFromMessage(media, "image");
      for await (const chunk of mediaContent) {
        mediaBuffer = Buffer.concat([mediaBuffer, chunk]);
      }
      const sticker = new Sticker(mediaBuffer, {
        pack: 'Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ',
        author: authorName,
        type: arguments.includes("crop") || arguments.includes('c') ? StickerTypes.CROPPED : StickerTypes.FULL,
        quality: 70
      });
      await sticker.toFile(randomFileName);
    } else if (messageType === "videoMessage" || isVideoMessage) {
      media = messageData.message.videoMessage || messageData.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;
      mediaContent = await downloadContentFromMessage(media, "video");
      const tempVideoFile = `${Math.floor(Math.random() * 10000)}.mp4`;
      for await (const chunk of mediaContent) {
        mediaBuffer = Buffer.concat([mediaBuffer, chunk]);
      }
      await fs.promises.writeFile(tempVideoFile, mediaBuffer);
      await new Promise((resolve, reject) => {
        ffmpeg(tempVideoFile).outputOptions([
          "-vcodec", "libwebp", 
          '-vf', "fps=15,scale=512:512:force_original_aspect_ratio=decrease", 
          "-loop", '0', "-preset", "default", "-an", "-vsync", '0', '-s', "512:512"
        ]).save(randomFileName).on("end", async () => {
          await fs.promises.unlink(tempVideoFile);
          resolve();
        }).on("error", reject);
      });
      const sticker = new Sticker(await fs.promises.readFile(randomFileName), {
        pack: "Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ",
        author: authorName,
        type: arguments.includes("crop") || arguments.includes('c') ? StickerTypes.CROPPED : StickerTypes.FULL,
        quality: 70
      });
      await sticker.toFile(randomFileName);
    } else {
      reply("Please mention an image or video!");
      return;
    }

    await bot.sendMessage(message, { sticker: await fs.promises.readFile(randomFileName) }, { quoted: messageData });
    await fs.promises.unlink(randomFileName);
  } catch (error) {
    reply("An error occurred while processing your sticker: " + error.message);
  }
});

// Crop media and send as a sticker
zokou({
  nomCom: 'crop',
  categorie: "Converter",
  reaction: '🎀'
}, async (message, bot, context) => {
  const { ms: messageData, msgRepondu: repliedMessage, arg: arguments, repondre: reply, nomAuteurMessage: authorName } = context;

  if (!repliedMessage) {
    reply("Please mention the media");
    return;
  }

  const packName = arguments.length ? arguments.join(" ") : authorName;
  let mediaMessage;

  if (repliedMessage.imageMessage) {
    mediaMessage = repliedMessage.imageMessage;
  } else if (repliedMessage.videoMessage) {
    mediaMessage = repliedMessage.videoMessage;
  } else if (repliedMessage.stickerMessage) {
    mediaMessage = repliedMessage.stickerMessage;
  } else {
    reply("Please mention a media message");
    return;
  }

  const mediaPath = await bot.downloadAndSaveMediaMessage(mediaMessage);
  let sticker = new Sticker(mediaPath, {
    pack: "XMD",
    type: StickerTypes.CROPPED,
    categories: ['🤩', '🎉'],
    id: "12345",
    quality: 70,
    background: "transparent"
  });

  const stickerBuffer = await sticker.toBuffer();
  await bot.sendMessage(message, { sticker: stickerBuffer }, { quoted: messageData });
});

// Convert media to sticker with custom text
zokou({
  nomCom: "write",
  categorie: "Converter",
  reaction: "📸"
}, async (message, bot, context) => {
  const { ms: messageData, msgRepondu: repliedMessage, arg: arguments, repondre: reply, nomAuteurMessage: authorName } = context;

  if (!repliedMessage) {
    reply("Please mention an image");
    return;
  }

  if (!repliedMessage.imageMessage) {
    reply("This command only works with images");
    return;
  }

  const text = arguments.join(" ");
  if (!text) {
    reply("Please provide some text");
    return;
  }

  const imageMessage = repliedMessage.imageMessage;
  const mediaPath = await bot.downloadAndSaveMediaMessage(imageMessage);
  const formData = new FormData();
  formData.append("image", fs.createReadStream(mediaPath));

  const headers = {
    'Authorization': "Client-ID b40a1820d63cd4e",
    ...formData.getHeaders()
  };

  const requestOptions = {
    method: "post",
    url: "https://api.imgur.com/3/image",
    headers,
    data: formData
  };

  try {
    const response = await axios(requestOptions);
    const imageLink = response.data.data.link;
    const memeUrl = `https://api.memegen.link/images/custom/-/${text}.png?background=${imageLink}`;

    const sticker = new Sticker(memeUrl, {
      pack: authorName,
      author: 'Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ',
      type: StickerTypes.FULL,
      categories: ['🤩', '🎉'],
      id: "12345",
      quality: 70,
      background: 'transparent'
    });

    const stickerBuffer = await sticker.toBuffer();
    await bot.sendMessage(message, { sticker: stickerBuffer }, { quoted: messageData });
  } catch (error) {
    console.error("Error uploading to Imgur:", error);
    reply("An error occurred while creating the meme.");
  }
});

// Convert sticker to image
zokou({
  nomCom: "photo",
  categorie: "Converter",
  reaction: "📥"
}, async (message, bot, context) => {
  const { ms: messageData, msgRepondu: repliedMessage, arg: arguments, repondre: reply, nomAuteurMessage: authorName } = context;

  if (!repliedMessage) {
    reply("Please reply to a sticker");
    return;
  }

  if (!repliedMessage.stickerMessage) {
    reply("Please reply to a non-animated sticker");
    return;
  }

  const stickerPath = await bot.downloadAndSaveMediaMessage(repliedMessage.stickerMessage);
  const outputImageFile = `${Math.floor(Math.random() * 10000)}.png`;

  exec(`ffmpeg -i ${stickerPath} ${outputImageFile}`, (error) => {
    fs.unlinkSync(stickerPath);

    if (error) {
      bot.sendMessage(message, { text: "Error: Please reply to a non-animated sticker" }, { quoted: messageData });
      return;
    }

    const imageBuffer = fs.readFileSync(outputImageFile);
    bot.sendMessage(message, { image: imageBuffer }, { quoted: messageData });
    fs.unlinkSync(outputImageFile);
  });
});

// Translate text in a conversation
zokou({
  nomCom: 'translate',
  aliases: ['traduire'],
  categorie: "Converter",
  reaction: '😂'
}, async (message, bot, context) => {
  const { ms: messageData, repondre: reply, arg: arguments } = context;
  
  if (!arguments.length) {
    reply("Please provide some text to translate");
    return;
  }

  const text = arguments.join(" ");
  try {
    const translationResult = await traduire(text, 'fr'); // Change 'fr' for other language codes
    reply(translationResult);
  } catch (error) {
    console.error(error);
    reply("An error occurred during translation");
  }
});
adams({
  'nomCom': 'url',       // Command to trigger the function
  'categorie': "General", // Command category
  'reaction': '👨🏿‍💻'    // Reaction to use on command
}, async (groupId, client, context) => {
  const { msgRepondu, repondre } = context;

  // If no message (image/video) is mentioned, prompt user
  if (!msgRepondu) {
    return repondre("Please mention an image or video.");
  }

  let mediaPath;

  // Check if the message contains a video
  if (msgRepondu.videoMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
  }
  // Check if the message contains an image
  else if (msgRepondu.imageMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
  } else {
    // If no image or video is found, prompt user
    return repondre("Please mention an image or video.");
  }

  try {
    // Upload the media to Catbox and get the URL
    const fileUrl = await uploadToCatbox(mediaPath);

    // Delete the local media file after upload
    fs.unlinkSync(mediaPath);

    // Respond with the URL of the uploaded file
    repondre(fileUrl);
  } catch (error) {
    console.error("Error while creating your URL:", error);
    repondre("Oops, there was an error.");
  }
});


zokou({
  'nomCom': 'apk3',
  'aliases': ['app', 'playstore'],
  'reaction': '✨',
  'categorie': 'Download'
}, async (groupId, client, context) => {
  const { repondre, arg, ms } = context;

  try {
    // Check if app name is provided
    const appName = arg.join(" ");
    if (!appName) {
      return repondre("Please provide an app name.");
    }

    // Fetch app search results from the BK9 API
    const searchResponse = await axios.get(`https://bk9.fun/search/apk?q=${appName}`);
    const searchData = searchResponse.data;

    // Check if any results were found
    if (!searchData.BK9 || searchData.BK9.length === 0) {
      return repondre("No app found with that name, please try again.");
    }

    // Fetch the APK details for the first result
    const appDetailsResponse = await axios.get(`https://bk9.fun/download/apk?id=${searchData.BK9[0].id}`);
    const appDetails = appDetailsResponse.data;

    // Check if download link is available
    if (!appDetails.BK9 || !appDetails.BK9.dllink) {
      return repondre("Unable to find the download link for this app.");
    }

    // Send the APK file to the group
    await client.sendMessage(
      groupId,
      {
        document: { url: appDetails.BK9.dllink },
        fileName: `${appDetails.BK9.name}.apk`,
        mimetype: "application/vnd.android.package-archive",
        caption: "Downloaded by Ᏼᴜᴍʙʟᴇʙᴇᴇ-ХᴍᎠ"
      },
      { quoted: ms }
    );

  } catch (error) {
    // Catch any errors and notify the user
    console.error("Error during APK download process:", error);
    repondre("APK download failed. Please try again later.");
  }
});
