const errorMessage = require("./errorMessage.js");
const { MessageEmbed } = require('discord.js');
const { Metaplex } = require('@metaplex-foundation/js');
const { Connection, clusterApiUrl, PublicKey } = require('@solana/web3.js');

async function getImage(message, collection, id) {
  var items = null;
  var item = null;

  if (message.attachments.size > 0) {
    image = [...message.attachments][0][1].attachment;
  } else {
    if (typeof id === "undefined") {
      token = collection;
    } else {
      await fetch(`https://api.howrare.is/v0.1/collections/${collection}`, { method: "Get" })
      .then(res => res.json())
      .then((json) => {
        if (json.result.api_code === 404) {
          return false;
        } else {
          items = json.result.data.items;

          for ( var i = 0; i < items.length; i++ ) {
            if ( items[i].id == id ) {
              item = items[i];
              break;
            }
          }
        }
      });

      console.log(item);

      if (items === null) {
        return errorMessage(message, `Error: Collection "${collection}" not found.`);
      } else if (item === null) {
        return errorMessage(message, `Invalid ID for ${collection}: ${id}`);
      }

      token = item.mint;
    }

    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const metaplex = new Metaplex(connection);

    let mint = new PublicKey(token);
    let nft = await metaplex.nfts().findByMint(mint).run();

    if (!nft.json) {
      return errorMessage(message, `Metaplex connection timed out. Please try again later.`);
    }

    image = nft.json.image;
  }

  let fimg = await fetch(image);

  if (fimg.status != 200) {
    return errorMessage(message, `Timed out waiting for on-chain image. Please try again later.`);
  }

  return await fimg.buffer();
}

module.exports = getImage;