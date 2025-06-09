const { zokou } = require('../framework/zokou');
const { default: axios } = require('axios');
const pkg = require('@whiskeysockets/baileys');
const { generateWAMessageFromContent, proto } = pkg;

// Use your Consumer Key, Consumer Secret, and Shortcode
const consumerKey = 'QGaqwC8O8nJev72LGOiUxEBZe3ZTVo9wEfGkWAEaTgrZlAC5'; // Replace with your actual Consumer Key
const consumerSecret = 'MANcOYqdyGatG7AXPrckj5AtQnvLWEKxJtxibgJqFxtgUxiiAAqwOlbb3WE2gAeP'; // Replace with your actual Consumer Secret
const shortcode = 'N/A'; // Replace with your actual Shortcode
const BaseUrl = process.env.GITHUB_GIT;
const adamsapikey = process.env.BOT_OWNER;
const initiatorName = 'testapi'; // Placeholder for sandbox testing

// Generate OAuth token for M-Pesa API
async function getOAuthToken() {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  try {
    const response = await axios.get(
      'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
      { headers: { Authorization: `Basic ${auth}` } }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error generating OAuth token:', error.message);
    throw new Error('Failed to authenticate with M-Pesa API.');
  }
}

// M-Pesa Top-Up Airtime Function
async function topUpAirtime(phoneNumber, amount) {
  const token = await getOAuthToken();
  const payload = {
    CommandID: 'CustomerPayBillOnline',
    Amount: amount,
    Msisdn: phoneNumber,
    BillRefNumber: 'TopUp',
  };

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error performing top-up:', error.message);
    throw new Error('Failed to top-up airtime.');
  }
}

// M-Pesa Send Money Function
async function sendMoney(phoneNumber, amount) {
  const token = await getOAuthToken();
  const payload = {
    CommandID: 'Pay',
    Amount: amount,
    Msisdn: phoneNumber,
    BillRefNumber: 'Transfer',
  };

  try {
    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/sendmoney/v1/processrequest',
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending money:', error.message);
    throw new Error('Failed to send money.');
  }
}

// Command handler for M-Pesa Menu
const validPins = new Set(); // This set can be populated with valid PINs for demo purposes

zokou({ nomCom: "mpesa", reaction: "💵", categorie: "mpesa" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;
  const subCommand = arg[0];

  try {
    switch (subCommand) {
      case 'menu':
        const pin = arg[1]; // Assuming the pin is the 1st argument after 'menu'
        if (!pin) {
          return repondre('Usage: .mpesa menu [PIN]');
        }

        // Validate the PIN
        if (!validPins.has(pin)) {
          return repondre('Invalid PIN. Access denied.');
        }

        // Display M-Pesa menu after successful PIN verification
        await repondre(`M-Pesa Menu:
- *Top-Up Airtime*: .mpesa topup [phone] [amount]
- *Send Money*: .mpesa send [phone] [amount]
- *Check Balance*: .mpesa balance
        `);
        break;

      case 'topup':
        const topupPhone = arg[1];
        const topupAmount = arg[2];
        if (!topupPhone || !topupAmount) {
          return repondre('Usage: .mpesa topup [phone] [amount]');
        }

        await repondre('Processing your airtime top-up...');
        const topupResponse = await topUpAirtime(topupPhone, topupAmount);
        await repondre(`Top-up response: ${JSON.stringify(topupResponse)}`);
        break;

      case 'send':
        const sendPhone = arg[1];
        const sendAmount = arg[2];
        if (!sendPhone || !sendAmount) {
          return repondre('Usage: .mpesa send [phone] [amount]');
        }

        await repondre('Processing your money transfer...');
        const sendResponse = await sendMoney(sendPhone, sendAmount);
        await repondre(`Send money response: ${JSON.stringify(sendResponse)}`);
        break;

      case 'balance':
        await repondre('Checking your M-Pesa balance...');
        // Placeholder for balance check
        await repondre('To check your balance, please visit the M-Pesa app or dial *100#.');
        break;

      default:
        await repondre('Unknown command. Please use .mpesa menu to see available options.');
    }
  } catch (error) {
    console.error('Error processing M-Pesa command:', error.message);
    repondre('Error processing M-Pesa command.');
  }
});
