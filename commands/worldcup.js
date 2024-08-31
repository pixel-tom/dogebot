const { MessageEmbed } = require('discord.js');
const sharp = require('sharp');
var rarity = require('../rarity.json');

const teams = ['wales', 'tunisia', 'uruguay', 'usa', 'korea', 'spain', 'switzerland', 'serbia', 'portugal', 'qatar', 'saudiarabia', 'senegal', 'netherlands', 'poland', 'morocco', 'ghana', 'iran', 'japan', 'mexico', 'germany', 'france', 'england', 'denmark', 'ecuador', 'croatia', 'costarica', 'canada', 'cameroon', 'brazil', 'belgium', 'australia', 'argentina'];

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

function get_type(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Type" ) {
      return attributes[i].value.toLowerCase().replaceAll(' ', '-');
    }
  }

  return "orange"; // default
}

function get_hat(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Hats" ) {
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
  team = args[1];
  
  if (typeof args[2] !== 'undefined')
    team = args[1] + args[2];

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

  if (typeof team !== 'undefined') team = team.toLowerCase().replaceAll(' ', '').replaceAll('brasil', 'brazil').replaceAll('southkorea', 'korea').replaceAll('thenetherlands', 'netherlands').replaceAll('unitedstates', 'usa');

  if (!teams.includes(team)) team = teams[Math.floor(Math.random() * teams.length)];

  type = get_type(item.attributes);
  hat = get_hat(item.attributes);
  eyes = get_eyes(item.attributes);
  mouth = get_mouth(item.attributes);

  console.log(team);

  await sharp(`images/effects/worldcup/background/${team}.png`)
  .composite([
    { input: `images/attributes/type/${type}.png`, gravity: 'northeast' },
    { input: `images/effects/worldcup/clothes/${team}.png`, gravity: 'northeast' },
    { input: `images/attributes/hats/${hat}.png`, gravity: 'northeast' },
    { input: `images/attributes/eyes/${eyes}.png`, gravity: 'northeast' },
    { input: `images/attributes/mouth/${mouth}.png`, gravity: 'northeast' }
  ])
  .toBuffer((err, data, info) => {
    console.log(data);
    console.log('WC');
    message.channel.send({ files: [{ attachment: data, name: `${item.id}-worldcup.png` }] });
  });
}

exports.help = {
  name: "worldcup"
}
