var rarity = require('../rarity.json');
const { MessageEmbed } = require('discord.js');
const { Metaplex, keypairIdentity, bundlrStorage } = require('@metaplex-foundation/js');
const { Connection, clusterApiUrl, Keypair, PublicKey } = require('@solana/web3.js');

function get_rarity(id) {
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

function get_lvl(attributes) {
  for ( var i = 0; i < attributes.length; i++ ) {
    if ( attributes[i].trait_type == "lvl" ) {
      return attributes[i].value;
    }
  }

  return 0; // default
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

  console.log(item);

  attributes = JSON.parse(JSON.stringify(item.attributes))

  attributes.shift();
  for ( var i = 0; i < attributes.length; i++ ) {
    attributes[i].value = `${attributes[i].value} (${attributes[i].rarity}%)`;
    attributes[i].inline = true;
  }

  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const metaplex = new Metaplex(connection);
  let mint = new PublicKey(item.mint);
  let nft = await metaplex.nfts().findByMint(mint).run();
  let lvl = get_lvl(nft.json.attributes);

  console.log(nft.json);

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
    .setTitle(`${item.name} - LVL ${lvl}`)
    .setURL(`https://magiceden.io/item-details/${item.mint}`)
    .addFields({ name: 'Rank', value: `${item.rank} (${tier})`})
    .addFields(attributes)
    .setImage(item.image)
    .setTimestamp();

  message.reply({ embeds: [rarityEmbed] }).catch(console.error);
}

exports.help = {
  name: "rarity"
}
