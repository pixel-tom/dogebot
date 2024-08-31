const { MessageEmbed } = require('discord.js');
const sharp = require('sharp');
var rarity = require('../rarity.json');

function get_rarity(id){
  for ( var i = 0; i < rarity.length; i++ ) {
    if ( rarity[i].id == id ) {
      console.log(rarity[i]);
      return rarity[i];
    }
  }

  for ( var i = 0; i < rarity.length; i++ ) {
    if ( rarity[i].mint == id ) {
      console.log(rarity[i]);
      return rarity[i];
    }
  }

  return false;
}

function isPositiveInteger(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const num = Number(str);

  if (Number.isInteger(num) && num >= 0) {
    return true;
  }

  return false;
}

exports.run = async (bot, message, args) => {
  id = args[0];

  item = get_rarity(id);
  if (item === false) {

    var rarityEmbed = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Error: WOOF (Doge not found)')
      .setDescription('Bad boi')
      .setImage('attachment://dogebonk.gif');

    message.reply({ embeds: [rarityEmbed], files: ['./dogebonk.gif'] }).catch(console.error);
    return false;
  }

  message.reply("_*taste the rainbow*_").catch(console.error);

  await sharp(`images/doges/${item.id}.png`)
  .composite([
    { input: 'images/effects/candy/screen.png', gravity: 'southwest', blend: 'screen' },
    { input: 'images/effects/candy/multiply.png', gravity: 'southwest', blend: 'multiply' }
  ])
  .toBuffer((err, data, info) => {
    console.log(data);
    message.reply({ files: [{ attachment: data, name: `${item.id}-candy.png`  }] }).catch(console.error);
  });
}

exports.help = {
  name: "candy"
}
