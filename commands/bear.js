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

function get_hat(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Hats" ) {
      console.log(attributes[i].value);
      return attributes[i].value;
    }
  }

  return "Red Cap"; // default
}

function get_type(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Type" ) {
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

  hat = get_hat(item.attributes);

  switch (hat) {
    case 'Blue Punk Hair':
    case 'Green Punk Hair':
    case 'Red Punk Hair':
      bear = 'punk';
      break;
    case 'Flower':
      bear = 'flower';
      break;
    case 'Space Warrior':
    case 'Thief Hat':
    case 'Bandana Ninja':
    case 'Black Bandana':
      bear = 'low';
      break;
    case 'None':
    case 'Halo':
      bear = 'full';
      break;
    default:
      bear = 'normal';
  }

  type = get_type(item.attributes);

  message.reply("_*bear with us*_").catch(console.error);

  await sharp(`images/doges/${item.id}.png`)
  .composite([
    { input: `images/effects/bear/${bear}/${type.toLowerCase()}.png`, gravity: 'northeast' },
  ])
  .toBuffer((err, data, info) => {
    console.log(data);
    console.log(bear);
    console.log(type);
    message.reply({ files: [{ attachment: data, name: `${item.id}-bear.png` }] }).catch(console.error);
  });
}

exports.help = {
  name: "bear"
}
