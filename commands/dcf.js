const { MessageEmbed } = require('discord.js');
const sharp = require('sharp');
var rarity = require('../rarity.json');

const styles = ['dcf', 'pink', 'blue', 'diamond', 'mythic', 'death']

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
  style = args[1];

  if (!styles.includes(style)) style = 'dcf';

  console.log(style);

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
  .resize(672, 672, {
    kernel: sharp.kernel.nearest
  })
  .toBuffer()
  .then(doge => {
    sharp(`images/effects/dcf/bg.png`)
    .composite([
      { input: doge, top: 40, left: 130 },
      { input: `images/effects/dcf/${style}.png` }
    ])
    .toBuffer((err, data, info) => {
      console.log(data);
      console.log('DCF');
      message.channel.send({ files: [{ attachment: data, name: `${item.id}-dcf.png` }] });
    });
  });
}

exports.help = {
  name: "dcf"
}
