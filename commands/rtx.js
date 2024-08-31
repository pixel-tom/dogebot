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

  message.reply("_*it's on*_").catch(console.error);

  await sharp(`images/doges/${item.id}.png`)
  .resize(1080, 1080, {
    kernel: sharp.kernel.nearest
  })
  .composite([
    { input: 'images/effects/rtx/on.png', gravity: 'northwest' },
    { input: 'images/effects/rtx/gradient.png', gravity: 'northwest', blend: 'overlay' }
  ])
  .toBuffer((err, data, info) => {
    console.log(data);
    message.reply({ files: [{ attachment: data, name: `${item.id}-rtx.png`  }] }).catch(console.error);
  });
}

exports.help = {
  name: "rtx"
}
