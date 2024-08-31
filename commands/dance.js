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

function get_type(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Type" ) {
      console.log(attributes[i].value);
      return attributes[i].value;
    }
  }

  return "Orange"; // default
}

function get_clothes(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Clothes" ) {
      console.log(attributes[i].value);
      return attributes[i].value;
    }
  }

  return "Clothes None"; // default
}

function get_hat(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Hats" ) {
      console.log(attributes[i].value);
      return attributes[i].value;
    }
  }

  return "Hats None"; // default
}

function get_eyes(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Eyes" ) {
      console.log(attributes[i].value);
      return attributes[i].value;
    }
  }

  return "Eyes None"; // default
}

function get_mouth(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Mouth" ) {
      console.log(attributes[i].value);
      return attributes[i].value;
    }
  }

  return "Mouth None"; // default
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
  type = get_type(item.attributes);
  clothes = get_clothes(item.attributes);
  hat = get_hat(item.attributes);
  eyes = get_eyes(item.attributes);
  mouth = get_mouth(item.attributes);

  console.log(clothes.replaceAll(' ', '-').toLowerCase());

  if (item.id == '1207') {
    message.reply({ files: [{ attachment: `images/effects/dance/special/${item.id}.gif`, name: `${item.id}-dance.gif` }] }).catch(console.error);
  } else {
    await sharp(`images/effects/dance/background/${background.replaceAll(' ', '-').toLowerCase()}.gif`, { animated: true })
    .composite([
      { input: `images/effects/dance/type/${type.replaceAll(' ', '-').toLowerCase()}.gif`, gravity: 'south', animated: true },
      { input: `images/effects/dance/clothes/${clothes.replaceAll(' ', '-').toLowerCase()}.gif`, gravity: 'south', animated: true },
      { input: `images/effects/dance/head/${type.replaceAll(' ', '-').toLowerCase()}.gif`, gravity: 'south', animated: true },
      { input: `images/effects/dance/hats/${hat.replaceAll(' ', '-').toLowerCase()}.gif`, gravity: 'south', animated: true },
      { input: `images/effects/dance/eyes/${eyes.replaceAll(' ', '-').toLowerCase()}.gif`, gravity: 'south', animated: true },
      { input: `images/effects/dance/mouth/${mouth.replaceAll(' ', '-').toLowerCase()}.gif`, gravity: 'south', animated: true }
    ])
    .toBuffer((err, data, info) => {
      message.reply({ files: [{ attachment: data, name: `${item.id}-dance.gif` }] }).catch(console.error);
    });
  }
}

exports.help = {
  name: "dance"
}
