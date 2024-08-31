const { MessageEmbed } = require('discord.js');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

exports.run = async (bot, message, args) => {
  var commands = [
    { name: '!banner *id* *id2* *id3*', value: 'Twitter banner of your doge(s).', inline: true },
    { name: '!wallpaper *id*', value: 'Mobile wallpaper of your doge.', inline: true },
    { name: '!gun *id*', value: 'Adds a gun to your doge.', inline: true },
    { name: '!fastfood *id*', value: 'Turns your doge into fast food art.', inline: true },
    { name: '!dcf *id* *style*', value: 'Puts your doge onto a DCF coin.', inline: true },
    { name: '!lego *id*', value: 'Turns your doge into LEGO art.', inline: true },
    { name: '!ring *id*', value: 'Adds a Solana ring around your doge.', inline: true },
    { name: '!space *id*', value: 'Turns your doge into an astronaut.', inline: true },
    { name: '!spiral *id*', value: 'Arranges your doge into a spiral.', inline: true },
    { name: '!candy *id*', value: 'Turns your doge into a mosaic of candy.', inline: true },
    { name: '!fu *id*', value: 'Add some skeleton fingers to your doge.', inline: true },
    { name: '!agent *id*', value: 'Turns your doge into a secret agent.', inline: true },
    { name: '!bear *id*', value: 'Puts your doge in a bear costume.', inline: true },
    { name: '!dance *id*', value: 'Invites your doge to a dance party.', inline: true },
    { name: '!qr *id*', value: 'Generates a QR code for your doge.', inline: true },
    { name: '!poker *id* *id2* *id3* *id4* *id5* *suit*', value: 'Deals a poker hand with your doges.', inline: true }
  ]

  var commandsEmbed = new MessageEmbed()
    .setColor('#f599af')
    .setTitle('Doge Commands Reference')
    .setDescription('Try these commands on your doge! (replace *id* with your doge number or token address)')
    .addFields({ name: '!rarity *id*', value: 'Displays the rarity rank and attributes of your doge.'})
    .addFields(commands)
    .setImage('attachment://commands.png')
    .setFooter({ text: "If the doge you'd like is renamed and you don't know the number, just enter the full token address after your command. " });

  message.reply({ embeds: [commandsEmbed], files: ['./commands.png'] }).catch(console.error);
}

exports.help = {
  name: "commands"
}
