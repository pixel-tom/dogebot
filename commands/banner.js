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
  id2 = args[1];
  id3 = args[2];

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

  item2 = get_rarity(id2);
  item3 = get_rarity(id3);

  background = get_background(item.attributes);

  message.reply("_*generating banner*_").catch(console.error);

  await sharp(`images/doges/${item.id}.png`)
  .resize(600, 600, {
    kernel: sharp.kernel.nearest
  })
  .toBuffer()
  .then(doge => {
    if (item2 !== false ) {
      sharp(`images/doges/${item2.id}.png`)
      .resize(600, 600, {
        kernel: sharp.kernel.nearest
      })
      .toBuffer()
      .then(doge2 => {
        if (item3 !== false ) {
          console.log('banner (3 doges)');
          sharp(`images/doges/${item3.id}.png`)
          .resize(600, 600, {
            kernel: sharp.kernel.nearest
          })
          .toBuffer()
          .then(doge3 => {
            sharp(`images/effects/banner/${background.toLowerCase()}.png`)
            .composite([
              { input: doge, gravity: 'south' },
              { input: doge2, gravity: 'southeast' },
              { input: doge3, gravity: 'southwest' }
            ])
            .toBuffer((err, data, info) => {
              console.log(data);
              console.log(background);
              message.reply({ files: [{ attachment: data, name: `${item.id}-${item2.id}-${item3.id}-banner.png` }] }).catch(console.error);
            });
          });
        } else {
          console.log('banner (2 doges)');
          sharp(`images/effects/banner/${background.toLowerCase()}.png`)
          .composite([
            { input: doge, gravity: 'south' },
            { input: doge2, gravity: 'southeast' }
          ])
          .toBuffer((err, data, info) => {
            console.log(data);
            console.log(background);
            message.reply({ files: [{ attachment: data, name: `${item.id}-${item2.id}-banner.png` }] }).catch(console.error);
          });
        }
      });
    } else {
      console.log('banner (1 doge)');
      sharp(`images/effects/banner/${background.toLowerCase()}.png`)
      .composite([
        { input: doge, gravity: 'south' }
      ])
      .toBuffer((err, data, info) => {
        console.log(data);
        console.log(background);
        message.reply({ files: [{ attachment: data, name: `${item.id}-banner.png` }] }).catch(console.error);
      });
    }
  });
}

exports.help = {
  name: "banner"
}
