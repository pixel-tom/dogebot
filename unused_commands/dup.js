var rarity = require('../rarity.json');
const { MessageEmbed } = require('discord.js');

exports.run = async (bot, message, args) => {
  for ( var i = 0; i < rarity.length; i++ ) {
    for ( var a = 0; a < rarity[i].attributes.length; a++ ) {
      if ( rarity[i].attributes[a].name == 'Type' ) {
        rarity[i].Type = rarity[i].attributes[a].value;
      } else if ( rarity[i].attributes[a].name == 'Hats' ) {
        rarity[i].Hats = rarity[i].attributes[a].value;
      } else if ( rarity[i].attributes[a].name == 'Clothes' ) {
        rarity[i].Clothes = rarity[i].attributes[a].value;
      } else if ( rarity[i].attributes[a].name == 'Eyes' ) {
        rarity[i].Eyes = rarity[i].attributes[a].value;
      } else if ( rarity[i].attributes[a].name == 'Mouth' ) {
        rarity[i].Mouth = rarity[i].attributes[a].value;
      }
    }

    //console.log(rarity[i]);
  }

  const newArrayOfObjects = 
    rarity.reduce((accumulator, object) => {
      if(objectFound = accumulator.find(arrItem => arrItem.Type === object.Type && arrItem.Hats === object.Hats && arrItem.Clothes === object.Clothes && arrItem.Eyes === object.Eyes && arrItem.Mouth === object.Mouth)) {
          objectFound.times++;
      } else {
          object.times = 1;
          accumulator.push(object);
      }
      return accumulator;
    }, []);

  //console.log(newArrayOfObjects.length);

  var dups = 0;

  for ( r = 0; r < newArrayOfObjects.length; r++ ) {
    if (newArrayOfObjects[r].times > 1) {
      console.log(`${newArrayOfObjects[r].times} doges have ${newArrayOfObjects[r].Type}/${newArrayOfObjects[r].Hats}/${newArrayOfObjects[r].Clothes}/${newArrayOfObjects[r].Eyes}/${newArrayOfObjects[r].Mouth}`);
      dups += newArrayOfObjects[r].times;
      dups -= 1;
    }
  }
  console.log(dups);
}

exports.help = {
  name: "dup"
}
