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

  await sharp(`images/doges/${item.id}.png`)
  .resize(300, 300, {
    kernel: sharp.kernel.nearest
  })
  .toBuffer()
  .then(doge => {
    sharp(`images/effects/agent/${background.toLowerCase()}.png`)
    .composite([
      { input: doge, top: 46, left: 601 },
      { input: `images/effects/agent/${background.toLowerCase()}.png`, gravity: 'southwest' }
    ])
    .toBuffer((err, data, info) => {
      console.log(data);
      console.log(background);
      message.reply({ files: [{ attachment: data, name: `${item.id}-agent.png` }] }).catch(console.error);
    });
  });
}

exports.help = {
  name: "agent"
}
