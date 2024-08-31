var rarity = require('../rarity.json');
const { MessageEmbed } = require('discord.js');
const { pipeline } = require('node:stream');
const { promisify } = require('node:util');
const { createWriteStream } = require('node:fs');
const streamPipeline = promisify(pipeline)

const fetch = require('node-fetch');
var looksSame = require('looks-same');
var fs = require('fs');

function getBase64Image(imgUrl, callback) {

    var img = new Image();

    // onload fires when the image is fully loadded, and has width and height

    img.onload = function(){

      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png"),
          dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

      callback(dataURL); // the base64 string

    };

    // set attributes and src 
    img.setAttribute('crossOrigin', 'anonymous'); //
    img.src = imgUrl;

}

function get_rarity(id){
  for ( var i = 0; i < rarity.length; i++ ) {
    if ( rarity[i].id == id ) {
      console.log(rarity[i]);
      return rarity[i];
    }
  }

  return false;
}

exports.run = async (bot, message, args) => {
  var attachments = message.attachments;

  if (attachments.size == 0) {
    console.log(attachments);
    return false;
  }

  console.log(attachments);

  const response = await fetch([...attachments][0][1].attachment);
  await streamPipeline(response.body, createWriteStream('./tmp/upload.png'))

  /*
  fetch([...attachments][0][1].attachment)
  .then(res => res.blob()) // Gets the response and returns it as a blob
  .then(blob => {
    // Here's where you get access to the blob
    // And you can use it for whatever you want
    // Like calling ref().put(blob)

    // Here, I use it to make an image appear on the page
    let objectURL = URL.createObjectURL(blob);
    let myImage = new Image();
    myImage.src = objectURL;
    console.log(myImage);
  });
  */

  var temp = './tmp/upload.png';

  for ( var x = 0; x < rarity.length; x++) {
    var source = `src/${x}.png`;
    looksSame(temp, source, function(error, {equal} = {}) {
      if (error) {
        console.log(error);
        return false;
      }

      if (equal) {
        console.log(`Checked ${x} (match found)`);
        return true;
      } else {
        console.log(`Checked ${x} (no match)`);
      }
    });
  }

  fs.unlinkSync(temp);

  /*
  item = get_rarity(args[0]);
  if (item === false) {

    var rarityEmbed = new MessageEmbed()
      .setColor('#ff0000')
      .setTitle('Error: WOOF (Doge not found)')
      .setDescription('Bad boi')
      .setImage('attachment://dogebonk.gif');

    message.channel.send({ embeds: [rarityEmbed], files: ['./dogebonk.gif'] });
    return false;
  }

  console.log(item);

  item.attributes.shift();
  for ( var i = 0; i < item.attributes.length; i++ ) {
    item.attributes[i].value = `${item.attributes[i].value} (${item.attributes[i].rarity}%)`;
    item.attributes[i].inline = true;
  }

  var tier = 'Common', color = '#ffffff'; // common

  rank = item.rank;
  if (rank <= 100) {
    tier = 'Mythic';
    color = '#ff0000'; // mythic
  } else if (rank <= 300) {
    tier = 'Legendary';
    color = '#ff9300'; // legendary
  } else if (rank <= 1000) {
    tier = 'Epic';
    color = '#b456f1'; // epic
  } else if (rank <= 2500) {
    tier = 'Rare';
    color = '#0086e4'; // rare
  }

  var rarityEmbed = new MessageEmbed()
    .setColor(color)
    .setTitle(item.name)
    .setURL(`https://magiceden.io/item-details/${item.mint}`)
    .addFields({ name: 'Rank', value: `${item.rank} (${tier})`})
    .addFields(item.attributes)
    .setImage(item.image)
    .setTimestamp();

  message.channel.send({ embeds: [rarityEmbed] });
  */
}

exports.help = {
  name: "match"
}
