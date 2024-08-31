const { MessageEmbed } = require('discord.js');
const sharp = require('sharp');
const fs = require('fs');
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
  cached = false;

  if (id === undefined) {
    id = db[message.author.id];
    cached = true;
  }

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

  user = message.author;

  await sharp(`images/doges/${item.id}.png`)
  .toBuffer((err, data, info) => {
    console.log(data);

    if (!cached) {
      fs.readFile('db.json', (err, dbdata) => {
        if (err) throw err;
        let doges = JSON.parse(dbdata);

        doges[message.author.id] = item.id;
        let dogedb = JSON.stringify(doges);
        fs.writeFileSync('db.json', dogedb);

        console.log(doges);
      });
    }

    message.reply({ content: `_*doge saved as default for ${user.username}*_`, files: [{ attachment: data, name: `${item.id}-doge.png`  }] }).catch(console.error);
  });
}

exports.help = {
  name: "doge"
}
