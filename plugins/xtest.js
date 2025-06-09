const { zokou } = require("../framework/zokou");

zokou({
  nomCom: "xtest",
  categorie: "Fun",
  reaction: "🤓"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  // Array of 10+ realistic, casual replies with the fancy font for branding
  const replies = [
    "Hey, Im just testing things!! How’s your day going? 😊",
    "Oooh! you want to test me? I’m ready! What’s up? 🤔",
    "Bumblebee-XMD here! Just messing around with some test replies. You good? 😎",
    "Lets see… Yup, I’m working fine! How about you, what’s cooking? 🍳",
    "Test, Test, Test 1,2,3! Haha, just kidding—how’s my favorite user doing? 😉",
    "Bumblebee-XMD cheking in! Everything’s running smoothly. What’s on your mind? 🧠",
    "Hmmm! Lets test this out… Yup, I’m still awesome! How about you? 😏",
    "Testing mode activated! I’m feeling chatty today—how about you? 🗣️",
    "Bumblebee-XMD is saying Hi👋! Just testing some replies. What’s up with you? 👋",
    "Im doing a quick test—looks like I’m still the coolest bot around! What do you think? 😜",
    "Test run successful! I’m here for you—how’s your day going? 🌟",
    "Bumblebee-XMD is online and alive! Got any fun ideas for me to try? 🤗",
    "Hey im just messing up with some replies! What’s new with you? 🫶"
  ];

  // Pick a random reply from the array
  const randomReply = replies[Math.floor(Math.random() * replies.length)];

  // Send the random reply
  repondre(randomReply);
});