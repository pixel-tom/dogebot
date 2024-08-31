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
      return attributes[i].value.toLowerCase().replaceAll(' ', '-');
    }
  }

  return "blue"; // default
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

  await sharp(`images/doges/${item.id}.png`)
  .negate({ alpha: false })
  .threshold(160)
  .toBuffer()
  .then(outline => {
    sharp(outline)
    .composite([
      { input: outline }
    ])
    .toBuffer((err, data, info) => {
      console.log(data);
      message.reply({ files: [{ attachment: data, name: `${item.id}-neon.png` }] }).catch(console.error);
    });
  });
}

exports.help = {
  name: "neon"
}
