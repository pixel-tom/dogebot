const { MessageEmbed } = require('discord.js');
const sharp = require('sharp');

function isPositiveInteger(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const num = Number(str);

  if (Number.isInteger(num) && num >= 0) {
    return true;
  }

  return false;
}

exports.run = async (bot, message, args) => {
  id = args[0];

  if (!isPositiveInteger(id)) {
    var rarityEmbed = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Error: WOOF (Doge not found)')
      .setDescription('Bad boi')
      .setImage('attachment://dogebonk.gif');

    message.channel.send({ embeds: [rarityEmbed], files: ['./dogebonk.gif'] });
    return false;
  }

  message.channel.send("_*very rare*_");

  await sharp(`images/effects/vr.gif`, { animated: true, pages: -1 })
  .composite([
    { input: 'images/effects/vr.gif', tile: true, gravity: 'northwest' }
  ])
  .toBuffer((err, data, info) => {
    console.log(data);
    message.channel.send({ files: [{ attachment: data }] });
  });

  //message.channel.send({ files: [{ attachment: `src/$` }] });
}

exports.help = {
  name: "vr"
}
