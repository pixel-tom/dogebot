const getImage = require("./lib/getImage.js");
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const sharp = require('sharp');
const palette = ['#003f00', '#2e7320', '#8cbf0a', '#a0cf0a'];

exports.run = async (bot, message, args) => {
  collection = 'dogecapital';
  id = args[0];
  var image = await getImage(message, collection, id);

  if (!image) return;

  await sharp({
    create: {
      width: 2160,
      height: 2160,
      channels: 3,
      background: palette[3]
    }
  })
  .png()
  .toBuffer()
  .then(bg => {
    sharp(image)
    .png()
    .resize(160, 160, {
      kernel: sharp.kernel.nearest
    })
    .normalize()
    .toBuffer()
    .then(image => {
      sharp({
        create: {
          width: 160,
          height: 160,
          channels: 3,
          background: palette[2]
        }
      })
      .png()
      .toBuffer()
      .then(lightcolor => {
        sharp(image)
        .threshold(192)
        .composite([
          { input: lightcolor, blend: 'screen' }
        ])
        .toBuffer()
        .then(light => {
          sharp({
            create: {
              width: 160,
              height: 160,
              channels: 3,
              background: palette[1]
            }
          })
          .png()
          .toBuffer()
          .then(midcolor => {
            sharp(image)
            .threshold(128)
            .composite([
              { input: midcolor, blend: 'screen' }
            ])
            .toBuffer()
            .then(mid => {
              sharp({
                create: {
                  width: 160,
                  height: 160,
                  channels: 3,
                  background: palette[0]
                }
              })
              .png()
              .toBuffer()
              .then(darkcolor => {
                sharp(image)
                .threshold(64)
                .composite([
                  { input: darkcolor, blend: 'screen' }
                ])
                .toBuffer()
                .then(dark => {
                  sharp({
                    create: {
                      width: 160,
                      height: 160,
                      channels: 3,
                      background: palette[3]
                    }
                  })
                  .png()
                  .composite([
                    { input: light, blend: 'darken' },
                    { input: mid, blend: 'darken' },
                    { input: dark, blend: 'darken' }
                  ])
                  .toBuffer()
                  .then(image => {
                    sharp(image)
                    .resize(1280, 1280, {
                      kernel: sharp.kernel.nearest
                    })
                    .toBuffer()
                    .then(image => {
                      sharp(bg)
                      .composite([
                        { input: image },
                        { input: 'images/effects/gb.png' }
                      ])
                      .toBuffer((err, data, info) => {
                        message.reply({ files: [{ attachment: data, name: `${collection}-${id}-gb.png` }] });
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
  });
}

exports.help = {
  name: "gb"
}