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
  type = get_type(item.attributes);
  clothes = get_clothes(item.attributes);
  hat = get_hat(item.attributes);

  console.log(clothes);

  switch (type) {
    case 'zombie':
      clothes_src = `images/attributes/clothes/${clothes}.png`;
      hat_src = `images/effects/xmas/santa.png`;
      break;
    case 'solana':
      clothes_src = `images/attributes/clothes/${clothes}.png`;
      hat_src = `images/effects/xmas/santa.png`;
      break;
    case 'skeleton':
      clothes_src = `images/attributes/clothes/${clothes}.png`;
      hat_src = `images/effects/xmas/tree.png`;
      break;
    case 'red':
      clothes_src = `images/attributes/clothes/${clothes}.png`;
      hat_src = `images/effects/xmas/elf.png`;
      break;
    case 'purple':
      clothes_src = `images/effects/xmas/snowman.png`;
      hat_src = `images/attributes/hats/${hat}.png`;
      break;
    case 'orange':
      clothes_src = `images/attributes/clothes/none.png`;
      hat_src = `images/effects/xmas/angelwings.png`;
      break;
    case 'dark':
      clothes_src = `images/attributes/clothes/${clothes}.png`;
      hat_src = `images/effects/xmas/lamp.png`;
      break;
    case 'brown':
      clothes_src = `images/attributes/clothes/${clothes}.png`;
      hat_src = `images/effects/xmas/reindeer.png`;
      break;
    case 'alien':
      clothes_src = `images/attributes/clothes/${clothes}.png`;
      hat_src = `images/effects/xmas/snowed.png`;
      break;
    default:
      clothes_src = `images/attributes/clothes/${clothes}.png`;
      hat_src = `images/attributes/hats/${hat}.png`;
      break;
  }
  
  background = get_background(item.attributes);
  eyes = get_eyes(item.attributes);
  mouth = get_mouth(item.attributes);

  await sharp(`images/attributes/background/${background}.png`)
  .composite([
    { input: `images/effects/xmas/bg.png`, gravity: 'northeast' },
    { input: `images/attributes/type/${type}.png`, gravity: 'northeast' },
    { input: clothes_src, gravity: 'northeast' },
    { input: hat_src, gravity: 'northeast' },
    { input: `images/attributes/eyes/${eyes}.png`, gravity: 'northeast' },
    { input: `images/attributes/mouth/${mouth}.png`, gravity: 'northeast' }
  ])
  .toBuffer((err, data, info) => {
    console.log(data);
    message.reply({ files: [{ attachment: data, name: `${item.id}-xmas.png` }] }).catch(console.error);
  });
}

exports.help = {
  name: "xmas"
}
