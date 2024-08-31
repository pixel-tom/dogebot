const { MessageEmbed } = require('discord.js');
const sharp = require('sharp');
var rarity = require('../rarity.json');
const colors = {
  blue: '#e4e8f4',
  yellow: '#f0ecac',
  green: '#a4d6b0',
  orange: '#f7c091',
  purple: '#c5afd4',
  red: '#f599af'
}

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

    message.channel.send({ embeds: [rarityEmbed], files: ['./dogebonk.gif'] });
    return false;
  }

  background = get_background(item.attributes);
  color = colors[background.toLowerCase()];

  await sharp(`images/doges/${item.id}.png`)
  .resize(400, 400, {
    kernel: sharp.kernel.cubic
  })
  .rotate(-30, {background: color})
  .toBuffer()
  .then(doge => {
    sharp(`images/effects/ufo/${background.toLowerCase()}.png`)
    .composite([
      { input: doge, top: 165, left: 195 },
      { input: `images/effects/ufo/ufo.png` }
    ])
    .toBuffer((err, data, info) => {
      console.log(data);
      console.log('UFO');
      message.channel.send({ files: [{ attachment: data, name: `${item.id}-ufo.png` }] });
    });
  });
}

exports.help = {
  name: "ufo"
}
