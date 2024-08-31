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

function get_background(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Background" ) {
      console.log(attributes[i].value);
      return attributes[i].value;
    }
  }

  return "Blue"; // default
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

  background = get_background(item.attributes);

  message.reply("_*say it back*_").catch(console.error);

  await sharp(`images/doges/${item.id}.png`)
  .resize(960, 960, {
    kernel: sharp.kernel.nearest
  })
  .toBuffer()
  .then(doge => {
    sharp(`images/attributes/background/${background.toLowerCase()}.png`)
    .composite([
      { input: doge, left: 1144, top: 533 },
      { input: `images/effects/gm/${background.toLowerCase()}.png` }
    ])
    .toBuffer((err, data, info) => {
      console.log(data);
      console.log(background);
      message.reply({ files: [{ attachment: data, name: `${item.id}-gm.png` }] }).catch(console.error);
    });
  });
}

exports.help = {
  name: "gm"
}
