const { MessageEmbed } = require('discord.js');

function errorMessage(message, title = "There has been an error. Please try again later.") {
  console.log(`Error: ${title}`);
  var embed = new MessageEmbed()
    .setColor('#ff0000')
    .setTitle(title)
    .setImage('attachment://error.png');

  message.reply({ embeds: [embed], files: ['./images/error.png'] }).catch(console.error);
  return false;
}

module.exports = errorMessage;