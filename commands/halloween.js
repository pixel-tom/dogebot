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

function get_type(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Type" ) {
      return attributes[i].value.toLowerCase().replaceAll(' ', '-');
    }
  }

  return "orange"; // default
}

function get_clothes(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Clothes" ) {
      return attributes[i].value.toLowerCase().replaceAll(' ', '-');
    }
  }

  return "black-smoking"; // default
}

function get_eyes(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Eyes" ) {
      return attributes[i].value.toLowerCase().replaceAll(' ', '-');
    }
  }

  return "none"; // default
}

function get_mouth(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Mouth" ) {
      return attributes[i].value.toLowerCase().replaceAll(' ', '-');
    }
  }

  return "none"; // default
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
  type = get_type(item.attributes);
  clothes = get_clothes(item.attributes);

  console.log(clothes);

  switch (clothes) {
    case 'red-shirt':
      costume = 'mario';
      break;
    case 'biker-vest':
      costume = 'jason';
      break;
    case 'blue-shirt':
    case 'cop-vest':
      costume = 'pocoyo';
      break;
    case 'black-smoking':
      costume = 'mib';
      break;
    case 'roman-armor':
      costume = 'batman';
      break;
    case 'green-smoking':
    case 'green-jacket':
    case 'green-shirt':
      costume = 'luigi';
      break;
    case 'orange-jacket':
    case 'orange-shirt':
    case 'orange-kimono':
      costume = 'pumpkin';
      break;
    case 'biege-smoking':
      costume = 'aladdin';
      break;
    case 'sailor-vest':
      costume = 'nurse';
      break;
    case 'black-kimono':
    case 'military-vest':
      costume = 'snake';
      break;
    case 'white-shirt':
      costume = 'chef';
      break;
    case 'poncho':
      costume = 'wario';
      break;
    case 'diamond':
      costume = 'robber';
      break;
    case 'purple-shirt':
      costume = 'wizard';
      break;
    case 'brown-jacket':
      costume = 'detective';
      break;
    case 'pirate-vest':
      costume = 'pirate';
      break;
    default:
      costume = type;
  }
  

  background = get_background(item.attributes);
  mouth = get_mouth(item.attributes);

  message.reply("_*trick or treat*_").catch(console.error);

  await sharp(`images/attributes/background/${background}.png`)
  .composite([
    { input: `images/effects/halloween/bg.png`, gravity: 'northeast' },
    { input: `images/attributes/type/${type}.png`, gravity: 'northeast' },
    { input: `images/effects/halloween/${costume}.png`, gravity: 'northeast' },
    { input: `images/attributes/mouth/${mouth}.png`, gravity: 'northeast' }
  ])
  .toBuffer((err, data, info) => {
    console.log(data);
    console.log(costume);
    message.reply({ files: [{ attachment: data, name: `${item.id}-halloween.png` }] }).catch(console.error);
  });
}

exports.help = {
  name: "halloween"
}
