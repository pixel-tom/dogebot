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

  return "none"; // default
}

function get_hat(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Hats" ) {
      return attributes[i].value.toLowerCase().replaceAll(' ', '-');
    }
  }

  return "none"; // default
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

  background = get_background(item.attributes);
  type = get_type(item.attributes);
  clothes = get_clothes(item.attributes);
  hat = get_hat(item.attributes);
  eyes = get_eyes(item.attributes);
  mouth = get_mouth(item.attributes);

  message.reply('_*dark mode activated*_').catch(console.error);

  await sharp(`images/effects/darkmode/type/${type}.png`)
  .composite([
    { input: `images/effects/darkmode/clothes/${clothes}.png`, gravity: 'south' },
    { input: `images/effects/darkmode/hats/${hat}.png`, gravity: 'south' },
    { input: `images/effects/darkmode/eyes/${eyes}.png`, gravity: 'south' },
    { input: `images/effects/darkmode/mouth/${mouth}.png`, gravity: 'south' }
  ])
  .toBuffer()
  .then(doge => {
    sharp(doge)
    .negate({ alpha: false })
    .modulate({
      brightness: 0.7,
      saturation: 2,
      lightness: 10,
      hue: 180
    })
    .normalise()
    .toBuffer()
    .then(processed => {
      sharp(`images/effects/darkmode/background.png`)
      .composite([
        { input: processed, gravity: 'south' }
      ])
      .toBuffer((err, data, info) => {
        console.log(type);
        console.log(clothes);
        console.log(hat);
        console.log(eyes);
        console.log(mouth);
        console.log(data);
        message.reply({ files: [{ attachment: data, name: `${item.id}-darkmode.png` }] }).catch(console.error);
      });
    });
  });
}

exports.help = {
  name: "darkmode"
}
