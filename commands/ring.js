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

exports.run = async (bot, message, args) => {
  id = args[0];

  item = get_rarity(id);
  if (item === false) {

    var rarityEmbed = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Error: WOOF (Doge not found)')
      .setDescription('Bad boi')
      .setImage('attachment://dogebonk.gif');

    message.channel.send({ embeds: [rarityEmbed], files: ['./dogebonk.gif'] });
    return false;
  }

  await sharp(`images/effects/ring.png`)
  .composite([
    { input: `images/doges/${item.id}.png`, top: 170, left: 170 },
    { input: `images/effects/ring.png` }
  ])
  .toBuffer((err, data, info) => {
    console.log(data);
    console.log('Ring');
    message.channel.send({ files: [{ attachment: data, name: `${item.id}-ring.png` }] });
  });
}

exports.help = {
  name: "ring"
}
