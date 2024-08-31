const { MessageEmbed } = require('discord.js');
const sharp = require('sharp');
const qrcode = require('easyqrcodejs-nodejs');
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

exports.run = async (bot, message, args) => {
  id = args[0];

  item = get_rarity(id);
  if (item === false) {

    var rarityEmbed = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Error: WOOF (Doge not found)')
      .setDescription('Bad boi')
      .setImage('attachment://dogebonk.gif');

    message.reply({ embeds: [rarityEmbed], files: ['./dogebonk.gif'] });
    return false;
  }

  message.reply("_*generating qr code*_");

  await sharp('images/effects/qr.png')
  .composite([
    { input: `images/doges/${item.id}.png` }
  ])
  .toBuffer()
  .then(doge => {
    var options = {
      text: `https://solscan.io/token/${item.mint}`,
      width: 1960,
      height: 1960,
      quietZone: 40,
      quietZoneColor: "rgba(255,255,255,1)",
      logo: doge,
      logoWidth: 680,
      logoHeight: 680
    };

    var qr = new qrcode(options);

    qr.toStream().then(res=>{
      message.reply({ files: [{ attachment: res, name: `${item.id}-qr.png` }] });
    });
  });
}

exports.help = {
  name: "qr"
}
