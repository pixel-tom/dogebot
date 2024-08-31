const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const sharp = require('sharp');
const rarity = require('../rarity.json');
const { Metaplex, keypairIdentity, bundlrStorage } = require('@metaplex-foundation/js');
const { Connection, clusterApiUrl, Keypair, PublicKey } = require('@solana/web3.js');

function get_rarity(id){
  for ( var i = 0; i < rarity.length; i++ ) {
    if ( rarity[i].id == id ) {
      return rarity[i];
    }
  }

  for ( var i = 0; i < rarity.length; i++ ) {
    if ( rarity[i].mint == id ) {
      return rarity[i];
    }
  }

  return false;
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

  const connection = new Connection(clusterApiUrl("mainnet-beta"));
  const metaplex = new Metaplex(connection);
  let mint = new PublicKey(item.mint);
  let nft = await metaplex.nfts().findByMint(mint).run();
  let attributes = nft.json.attributes;

  console.log(nft.json);

  lvl = 0;

  console.log(`doge #${lvl} (lvl ${lvl})`);

  /*
  await sharp(fimgb)
  .resize(600, 600, {
    kernel: ( style === 'hd' ? sharp.kernel.cubic : sharp.kernel.nearest )
  })
  .toBuffer()
  .then(doge => {
    sharp(`images/effects/banner/${background}-${style}.png`)
    .composite([
      { input: doge, gravity: 'south' }
    ])
    .toBuffer((err, data, info) => {
      console.log(data);
      message.reply({ files: [{ attachment: data, name: `noot-${item.id}-banner.png` }] }).catch(console.error);
    });
  });
  */
}

exports.help = {
  name: "lvl"
}
