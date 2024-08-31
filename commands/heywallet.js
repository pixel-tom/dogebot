const { MessageEmbed } = require('discord.js');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.run = async (bot, message, args) => {
  var steps = [
    { name: '1. Visit https://heywallet.com', value: '-' },
    { name: '2. Create an account & sign in with your twitter', value: '-' },
    { name: '3. Tweet the verification Code - you may delete this after.', value: '-' },
    { name: '4. Try it out! Tweet "@hey_wallet send 100 $DAWG to \'@username\'"', value: '-' },
    { name: '5. If you\'d like to send $DAWG you\'ve received to your Phantom Wallet - DM @hey_wallet on twitter this message;', value: 'Send 100 $DAWG to "walletaddress"' }
  ]

  var heywalletEmbed = new MessageEmbed()
    .setColor('#f599af')
    .setTitle('Hey Wallet Setup')
    .setDescription('How to setup your Hey Wallet to send and receive $DAWG')
    .addFields(steps)
    .setImage('attachment://heywallet.png');

  message.reply({ embeds: [heywalletEmbed], files: ['./heywallet.png'] }).catch(console.error);
}

exports.help = {
  name: "heywallet"
}
