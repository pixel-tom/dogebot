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

function get_clothes(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Clothes" ) {
      console.log(attributes[i].value);
      return attributes[i].value;
    }
  }

  return "Black Smoking"; // default
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

  hat = get_hat(item.attributes);

  switch (hat) {
    case 'Admiral Hat':
    case 'Pirate Hat':
      mchat = 'mcpirate';
      break;
    case 'Bandana Ninja':
      mchat = 'mcninja';
      break;
    case 'Biege Tophat':
    case 'Black Tophat':
    case 'Green Tophat':
      mchat = 'mctophat';
      break;
    case 'Black Backwards Cap':
    case 'Blue Backwards Cap':
    case 'Green Backwards Cap':
    case 'Orange Cap Backwards':
    case 'Purple Backwards Cap':
    case 'Red Backwards Cap':
    case 'Solana Backwards Cap':
      mchat = 'mcreverse';
      break;
    case 'Black Bandana':
      mchat = 'mcbandana';
      break;
    case 'Black Cap':
    case 'Blue Cap':
    case 'Green Cap':
    case 'Orange Cap':
    case 'Purple Cap':
    case 'Red Cap':
    case 'Solana Cap':
      mchat = 'mccap';
      break;
    case 'Black Fedora 1':
    case 'Mugiwara Hat':
    case 'White Fedora 2':
      mchat = 'mcfedora1';
      break;
    case 'Black Fedora 2':
    case 'White Fedora 1':
      mchat = 'mcfedora2';
      break;
    case 'Black Protagonist Hat':
    case 'White Protagonist Hat':
      mchat = 'mchero';
      break;
    case 'Cop Hat':
      mchat = 'mcpig';
      break;
    case 'Cowboy Hat':
      mchat = 'mcbeef';
      break;
    case 'Crown':
      mchat = 'mcking';
      break;
    case 'Firefighter Hat':
    case 'Mining Hat':
      mchat = 'mcminer';
      break;
    case 'Flower':
      mchat = 'mcflower';
      break;
    case 'Green Beret':
    case 'Red Beret':
      mchat = 'mcberet';
      break;
    case 'Halo':
      mchat = 'mchalo';
      break;
    case 'Military Hat':
      mchat = 'mcarmy';
      break;
    case 'Sailor Cap':
      mchat = 'mcfish';
      break;
    case 'Blue Punk Hair':
    case 'Green Punk Hair':
    case 'Red Punk Hair':
      mchat = 'mcfro';
      break;
    case 'Sombrero':
      mchat = 'mctaco';
      break;
    case 'Space Warrior':
      mchat = 'mcvisor';
      break;
    case 'Thief Hat':
      mchat = 'mcrobber';
      break;
    case 'Viking Helmet':
      mchat = 'mcviking';
      break;
    case 'None':
      mchat = 'mcheadset';
      break;
    default:
      mchat = 'mccap';
  }

  clothes = get_clothes(item.attributes);

  switch (clothes) {
    case 'Biege Smoking':
    case 'Black Smoking':
    case 'Green Smoking':
      mcclothes = 'mcsmoking';
      break;
    case 'Biker Vest':
      mcclothes = 'mcbiker';
      break;
    case 'Black Kimono':
    case 'Orange Kimono':
      mcclothes = 'mcsushi';
      break;
    case 'Cop Vest':
      mcclothes = 'mcpig';
      break;
    case 'Diamond':
      mcclothes = 'mcruby';
      break;
    case 'Brown Jacket':
    case 'Green Jacket':
    case 'Orange Jacket':
      mcclothes = 'mcjacket';
      break;
    case 'Blue Shirt':
    case 'Green Shirt':
    case 'Red Shirt':
    case 'Purple Shirt':
      mcclothes = 'mcshirt1';
      break;
    case 'Military Vest':
      mcclothes = 'mcarmy';
      break;
    case 'Orange Shirt':
      mcclothes = 'mcshirt2';
      break;
    case 'Pirate Vest':
      mcclothes = 'mcpirate';
      break;
    case 'Poncho':
      mcclothes = 'mctaco';
      break;
    case 'Roman Armor':
      mcclothes = 'mchero';
      break;
    case 'Sailor Vest':
      mcclothes = 'mcfish';
      break;
    case 'White Shirt':
      mcclothes = 'mcshirt3';
      break;
    default:
      mcclothes = 'mcnaked';
  }
  
  eyes = get_eyes(item.attributes);
  mouth = get_mouth(item.attributes);

  message.reply("_*i'm lovin' it*_").catch(console.error);

  await sharp(`images/doges/${item.id}.png`)
  .composite([
    { input: `images/effects/fastfood/hats/${mchat}.png`, gravity: 'northeast' },
    { input: `images/effects/fastfood/clothes/${mcclothes}.png`, gravity: 'northeast' },
    { input: `images/attributes/eyes/${eyes}.png`, gravity: 'northeast' },
    { input: `images/attributes/mouth/${mouth}.png`, gravity: 'northeast' }
  ])
  .toBuffer((err, data, info) => {
    console.log(data);
    console.log(mchat);
    console.log(mcclothes);
    message.reply({ files: [{ attachment: data, name: `${item.id}-fastfood.png` }] }).catch(console.error);
  });
}

exports.help = {
  name: "fastfood"
}
