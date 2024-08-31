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

  message.channel.send("_*flip responsibly*_");

  await sharp(`images/doges/${item.id}.png`)
  .resize(600, 600, {
    kernel: sharp.kernel.nearest
  })
  .toBuffer()
  .then(doge => {
    sharp(`images/effects/test.gif`, { animated: true })
    .composite([
      { input: doge, top: 76, left: 164 },
      { input: `images/effects/test.gif` }
    ])
    .toBuffer((err, data, info) => {
      console.log(data);
      console.log('DCF');
      message.channel.send({ files: [{ attachment: data, name: `${item.id}-test.gif` }] });
    });
  });
}

exports.help = {
  name: "test"
}
