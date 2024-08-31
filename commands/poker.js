const { MessageEmbed } = require('discord.js');
const sharp = require('sharp');
var rarity = require('../rarity.json');
const Pluralize = require('pluralize');

const suits = ['paws', 'hearts']

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
      return attributes[i].value.toLowerCase();
    }
  }

  return "blue"; // default
}

exports.run = async (bot, message, args) => {
  id = args[0];
  id2 = args[1];
  id3 = args[2];
  id4 = args[3];
  id5 = args[4];
  suit = Pluralize(args[args.length-1]);

  if (!suits.includes(suit)) suit = suits[0];
  console.log(suit);

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
  item4 = get_rarity(id4);
  item5 = get_rarity(id5);

  message.reply("_*shuffling deck*_").catch(console.error);

  background = get_background(item.attributes);
  await sharp(`images/doges/${item.id}.png`)
  .resize(216, 216, {
    kernel: sharp.kernel.nearest
  })
  .toBuffer()
  .then(doge => {
    sharp(doge)
    .rotate(180)
    .toBuffer()
    .then(dogef => {
      if (item2 !== false ) {
        background2 = get_background(item2.attributes);
        sharp(`images/doges/${item2.id}.png`)
        .resize(216, 216, {
          kernel: sharp.kernel.nearest
        })
        .toBuffer()
        .then(doge2 => {
          sharp(doge2)
          .rotate(180)
          .toBuffer()
          .then(dogef2 => {
            if (item3 !== false ) {
              background3 = get_background(item3.attributes);
              console.log('poker (3 doges)');
              sharp(`images/doges/${item3.id}.png`)
              .resize(216, 216, {
                kernel: sharp.kernel.nearest
              })
              .toBuffer()
              .then(doge3 => {
                sharp(doge3)
                .rotate(180)
                .toBuffer()
                .then(dogef3 => {
                  if (item4 !== false ) {
                    background4 = get_background(item4.attributes);
                    console.log('poker (4 doges)');
                    sharp(`images/doges/${item4.id}.png`)
                    .resize(216, 216, {
                      kernel: sharp.kernel.nearest
                    })
                    .toBuffer()
                    .then(doge4 => {
                      sharp(doge4)
                      .rotate(180)
                      .toBuffer()
                      .then(dogef4 => {
                        if (item5 !== false ) {
                          background5 = get_background(item5.attributes);
                          console.log('poker (5 doges)');
                          sharp(`images/doges/${item5.id}.png`)
                          .resize(216, 216, {
                            kernel: sharp.kernel.nearest
                          })
                          .toBuffer()
                          .then(doge5 => {
                            sharp(doge5)
                            .rotate(180)
                            .toBuffer()
                            .then(dogef5 => {
                              console.log('poker (5 doges)');
                              sharp(`images/effects/poker/5-${suit}.png`)
                              .composite([
                                { input: `images/effects/poker/${background}.png`, top: 108, left: 126 },
                                { input: doge, top: 117, left: 144 },
                                { input: dogef, top: 333, left: 144 },
                                { input: `images/effects/poker/${suit}.png`, top: 108, left: 126 },
                                { input: `images/effects/poker/${background2}.png`, top: 108, left: 540 },
                                { input: doge2, top: 117, left: 558 },
                                { input: dogef2, top: 333, left: 558 },
                                { input: `images/effects/poker/${suit}.png`, top: 108, left: 540 },
                                { input: `images/effects/poker/${background3}.png`, top: 108, left: 954 },
                                { input: doge3, top: 117, left: 972 },
                                { input: dogef3, top: 333, left: 972 },
                                { input: `images/effects/poker/${suit}.png`, top: 108, left: 954 },
                                { input: `images/effects/poker/${background4}.png`, top: 108, left: 1368 },
                                { input: doge4, top: 117, left: 1386 },
                                { input: dogef4, top: 333, left: 1386 },
                                { input: `images/effects/poker/${suit}.png`, top: 108, left: 1368 },
                                { input: `images/effects/poker/${background5}.png`, top: 108, left: 1782 },
                                { input: doge5, top: 117, left: 1800 },
                                { input: dogef5, top: 333, left: 1800 },
                                { input: `images/effects/poker/${suit}.png`, top: 108, left: 1782 }
                              ])
                              .toBuffer((err, data, info) => {
                                console.log(data);
                                message.reply({ files: [{ attachment: data, name: `${item.id}-${item2.id}-${item3.id}-${item4.id}-${item5.id}-poker.png` }] }).catch(console.error);
                              });
                            });
                          });
                        } else {
                          console.log('poker (4 doges)');
                          sharp(`images/effects/poker/4-${suit}.png`)
                          .composite([
                            { input: `images/effects/poker/${background}.png`, top: 108, left: 540 },
                            { input: doge, top: 117, left: 558 },
                            { input: dogef, top: 333, left: 558 },
                            { input: `images/effects/poker/${suit}.png`, top: 108, left: 540 },
                            { input: `images/effects/poker/${background2}.png`, top: 108, left: 954 },
                            { input: doge2, top: 117, left: 972 },
                            { input: dogef2, top: 333, left: 972 },
                            { input: `images/effects/poker/${suit}.png`, top: 108, left: 954 },
                            { input: `images/effects/poker/${background3}.png`, top: 108, left: 1368 },
                            { input: doge3, top: 117, left: 1386 },
                            { input: dogef3, top: 333, left: 1386 },
                            { input: `images/effects/poker/${suit}.png`, top: 108, left: 1368 },
                            { input: `images/effects/poker/${background4}.png`, top: 108, left: 1782 },
                            { input: doge4, top: 117, left: 1800 },
                            { input: dogef4, top: 333, left: 1800 },
                            { input: `images/effects/poker/${suit}.png`, top: 108, left: 1782 }
                          ])
                          .toBuffer((err, data, info) => {
                            console.log(data);
                            message.reply({ files: [{ attachment: data, name: `${item.id}-${item2.id}-${item3.id}-${item4.id}-poker.png` }] }).catch(console.error);
                          });
                        }
                      });
                    });
                  } else {
                    console.log('poker (3 doges)');
                    sharp(`images/effects/poker/3-${suit}.png`)
                    .composite([
                      { input: `images/effects/poker/${background}.png`, top: 108, left: 540 },
                      { input: doge, top: 117, left: 558 },
                      { input: dogef, top: 333, left: 558 },
                      { input: `images/effects/poker/${suit}.png`, top: 108, left: 540 },
                      { input: `images/effects/poker/${background2}.png`, top: 108, left: 954 },
                      { input: doge2, top: 117, left: 972 },
                      { input: dogef2, top: 333, left: 972 },
                      { input: `images/effects/poker/${suit}.png`, top: 108, left: 954 },
                      { input: `images/effects/poker/${background3}.png`, top: 108, left: 1368 },
                      { input: doge3, top: 117, left: 1386 },
                      { input: dogef3, top: 333, left: 1386 },
                      { input: `images/effects/poker/${suit}.png`, top: 108, left: 1368 }
                    ])
                    .toBuffer((err, data, info) => {
                      console.log(data);
                      message.reply({ files: [{ attachment: data, name: `${item.id}-${item2.id}-${item3.id}-poker.png` }] }).catch(console.error);
                    });
                  }
                });
              });
            } else {
              console.log('poker (2 doges)');
              sharp(`images/effects/poker/2-${suit}.png`)
              .composite([
                { input: `images/effects/poker/${background}.png`, top: 108, left: 1368 },
                { input: doge, top: 117, left: 1386 },
                { input: dogef, top: 333, left: 1386 },
                { input: `images/effects/poker/${suit}.png`, top: 108, left: 1368 },
                { input: `images/effects/poker/${background2}.png`, top: 108, left: 1782 },
                { input: doge2, top: 117, left: 1800 },
                { input: dogef2, top: 333, left: 1800 },
                { input: `images/effects/poker/${suit}.png`, top: 108, left: 1782 }
              ])
              .toBuffer((err, data, info) => {
                console.log(data);
                message.reply({ files: [{ attachment: data, name: `${item.id}-${item2.id}-poker.png` }] }).catch(console.error);
              });
            }
          });
        });
      } else {
        console.log('poker (1 doge)');
        sharp(`images/effects/poker/1-${suit}.png`)
        .composite([
          { input: `images/effects/poker/${background}.png`, top: 108, left: 1782 },
          { input: doge, top: 117, left: 1800 },
          { input: dogef, top: 333, left: 1800 },
          { input: `images/effects/poker/${suit}.png`, top: 108, left: 1782 },
        ])
        .toBuffer((err, data, info) => {
          console.log(data);
          message.reply({ files: [{ attachment: data, name: `${item.id}-poker.png` }] }).catch(console.error);
        });
      }
    });
  });
}

exports.help = {
  name: "poker"
}
