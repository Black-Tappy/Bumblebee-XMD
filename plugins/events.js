const { zokou } = require('../framework/zokou');
const { attribuerUnevaleur } = require('../bdd/welcome');

async function events(nomCom) {
    zokou({
        nomCom: nomCom,
        categorie: 'Group',
        reaction: '⚙️'
    }, async (dest, zk, commandeOptions) => {
        const { ms, arg, repondre, superUser, verifAdmin, nomAuteurMessage } = commandeOptions;

        if (!verifAdmin && !superUser) {
            return repondre(`Hey ${nomAuteurMessage}, you ain’t got the privilege to mess with ${nomCom}! 😡 Only admins or the owner can run the group commands! 🚫`);
        }

        if (!arg[0] || arg.join(' ').trim() === '') {
            return repondre(`Dont ${nomAuteurMessage}, be lazy! Use *${nomCom} on* to activate or *${nomCom} off* to deactivate! 😎 Bot needs clear orders! 🔥`);
        }

        const setting = arg[0].toLowerCase();
        if (setting === 'on' || setting === 'off') {
            try {
                await attribuerUnevaleur(dest, nomCom, setting);
                await zk.sendMessage(
                    dest,
                    {
                        text: `Const!, ${nomAuteurMessage}! ${nomCom} is now ${setting} for this group! 🔥 Bumblebee-XMD got it locked in! 🚀`,
                        footer: `Hey ${nomAuteurMessage}! I'm Bumblebee-XMD, created by Black-Tappy 😎`
                    },
                    { quoted: ms }
                );
            } catch (error) {
                console.error(`Error updating ${nomCom}:`, error);
                await repondre(`Totally Busted!, ${nomAuteurMessage}! Bumblebee-XMD tripped while setting ${nomCom}: ${error.message} 😡 Try again or flop! 😣`);
            }
        } else {
            repondre(`What's Up! ${nomAuteurMessage}, what’s this nonsense? 😡 Only *${nomCom} on* or *${nomCom} off* works for Bumblebee-XMD! Get it right! 🔧`);
        }
    });
}

// Register the commands
events('welcome');
events('goodbye');
events('antipromote');
events('antidemote');