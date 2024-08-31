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
      return attributes[i].value.replaceAll(' ', '-');
    }
  }

  return "blue"; // default
}

function get_type(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Type" ) {
      return attributes[i].value.replaceAll(' ', '-');
    }
  }

  return "orange"; // default
}

function get_clothes(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Clothes" ) {
      return attributes[i].value.replaceAll(' ', '-');
    }
  }

  return "none"; // default
}

function get_hat(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Hats" ) {
      return attributes[i].value.replaceAll(' ', '-');
    }
  }

  return "none"; // default
}

function get_eyes(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Eyes" ) {
      return attributes[i].value.replaceAll(' ', '-');
    }
  }

  return "none"; // default
}

function get_mouth(attributes){
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].name == "Mouth" ) {
      return attributes[i].value.replaceAll(' ', '-');
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

  //message.reply("very rare").catch(console.error);

  await sharp(`images/effects/shiba/background/${background}.png`)
  .resize(1080, 1080, {
    kernel: sharp.kernel.cubic
  })
  .toBuffer()
  .then(backgroundi => {
    //.composite([
      //{ input: `images/effects/shiba/type/${type}.png`, gravity: 'south' },
      //{ input: `images/effects/shiba/clothes/${clothes}.png`, gravity: 'south' },
      //{ input: `images/effects/shiba/hats/${hat}.png`, gravity: 'south' },
      //{ input: `images/effects/shiba/eyes/${eyes}.png`, gravity: 'south' },
      //{ input: `images/effects/shiba/mouth/${mouth}.png`, gravity: 'south' }
    //])
    sharp(`images/effects/shiba/type/${type}.png`)
    .resize(1080, 1080, {
      kernel: sharp.kernel.cubic
    })
    .toBuffer()
    .then(typei => {
      sharp(`images/effects/shiba/clothes/${clothes}.png`)
      .resize(1080, 1080, {
        kernel: sharp.kernel.cubic
      })
      .toBuffer()
      .then(clothesi => {
        sharp(`images/effects/shiba/eyes/${eyes}.png`)
        .resize(1080, 1080, {
          kernel: sharp.kernel.cubic
        })
        .toBuffer()
        .then(eyesi => {
          sharp(`images/effects/shiba/mouth/${mouth}.png`)
          .resize(1080, 1080, {
            kernel: sharp.kernel.cubic
          })
          .toBuffer()
          .then(mouthi => {
            sharp(backgroundi)
            .composite([
              { input: typei },
              { input: clothesi },
              { input: eyesi },
              { input: mouthi }
            ])
            .toBuffer((err, data, info) => {
              console.log(background);
              console.log(type);
              console.log(clothes);
              //console.log(hat);
              console.log(eyes);
              console.log(mouth);
              console.log(data);
              message.reply({ files: [{ attachment: data, name: `${item.id}-shiba.png` }] }).catch(console.error);
            });
          });
        });
      });
    });
  });
}

exports.help = {
  name: "shiba"
}
