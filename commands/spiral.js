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

  message.reply("_*generating spiral*_").catch(console.error);

  await sharp(`images/doges/${item.id}.png`)
  .resize(816, 816, {
    kernel: sharp.kernel.nearest
  })
  .toBuffer()
  .then(doge1 => {
    sharp(`images/doges/${item.id}.png`)
    .resize(504, 504, {
      kernel: sharp.kernel.nearest
    })
    .rotate(90)
    .toBuffer()
    .then(doge2 => {
      sharp(`images/doges/${item.id}.png`)
      .resize(312, 312, {
        kernel: sharp.kernel.nearest
      })
      .rotate(180)
      .toBuffer()
      .then(doge3 => {
        sharp(`images/doges/${item.id}.png`)
        .resize(192, 192, {
          kernel: sharp.kernel.nearest
        })
        .rotate(270)
        .toBuffer()
        .then(doge4 => {
          sharp(`images/doges/${item.id}.png`)
          .resize(120, 120, {
            kernel: sharp.kernel.nearest
          })
          .toBuffer()
          .then(doge5 => {
            sharp(`images/doges/${item.id}.png`)
            .resize(72, 72, {
              kernel: sharp.kernel.nearest
            })
            .rotate(90)
            .toBuffer()
            .then(doge6 => {
              sharp(`images/doges/${item.id}.png`)
              .resize(48, 48, {
                kernel: sharp.kernel.nearest
              })
              .rotate(180)
              .toBuffer()
              .then(doge7 => {
                sharp(`images/doges/${item.id}.png`)
                .resize(24, 24, {
                  kernel: sharp.kernel.nearest
                })
                .rotate(270)
                .toBuffer()
                .then(doge8 => {
                  sharp(`images/doges/${item.id}.png`)
                  .resize(24, 24, {
                    kernel: sharp.kernel.nearest
                  })
                  .toBuffer()
                  .then(doge9 => {
                    sharp('images/effects/spiral.png')
                    .composite([
                      { input: doge1, top: 5, left: 5, blend: 'screen' },
                      { input: doge2, top: 5, left: 821, blend: 'screen' },
                      { input: doge3, top: 509, left: 1013, blend: 'screen' },
                      { input: doge4, top: 629, left: 821, blend: 'screen' },
                      { input: doge5, top: 509, left: 821, blend: 'screen' },
                      { input: doge6, top: 509, left: 941, blend: 'screen' },
                      { input: doge7, top: 581, left: 965, blend: 'screen' },
                      { input: doge8, top: 605, left: 941, blend: 'screen' },
                      { input: doge9, top: 581, left: 941, blend: 'screen' }
                    ])
                    .toBuffer((err, data, info) => {
                      console.log(data);
                      message.reply({ files: [{ attachment: data, name: `${item.id}-spiral.png` }] }).catch(console.error);
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
}

exports.help = {
  name: "spiral"
}

//24 48 72 120 192 312 504 816 1320
