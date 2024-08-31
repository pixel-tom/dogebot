require('dotenv').config();

const { prefix } = require("./config.json");

const { Client, Intents, Collection, MessageEmbed } = require('discord.js');

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const fs = require("fs");

const https = require('https')

const PORT = process.env.PORT || 3000;

const ticker_bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_PRESENCES] });

const axios = require('axios');

const coins = [1, 5426, 15175]

const collections = [
  {
    symbol: 'doge_capital',
    display: '🐶'
  },
  {
    symbol: 'the_golden_woofers',
    display: '🪙'
  }
]

var i = 0;
var j = 0;
var me_cache = {
  'doge_capital': 0,
  'the_golden_woofers': 0,
};
var cmc_cache = [];

async function getJSONResponse(body) {
  let fullBody = '';

  for await (const data of body) {
    fullBody += data.toString();
  }
  return JSON.parse(fullBody);
}

function getCoinPrices() {
  let response = null, coin = coins[j % coins.length];

  new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=${coins.join()}&convert=usd`, {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.CMC_API_KEY
        },
      });
    } catch(ex) {
      response = null;
      // error
      console.log('CMC API error');
    }
    if (response) {
      // success
      const json = response.data;
      cmc_cache = json.data;
      resolve(json);
    }
  });
}

function getNextCollection() {
  let response = null, collection = collections[i % collections.length];

  new Promise(async (resolve, reject) => {
    try {
      response = await axios.get(`https://api-mainnet.magiceden.dev/v2/collections/${collection.symbol}/stats`);
    } catch(ex) {
      response = null;
      // error
      console.log('ME API error');
    }
    if (response) {
      // success
      const json = response.data;
      let sol = json.floorPrice * .000000001;

      console.log(`${collection.display} ${sol.toFixed(2)} ◎`);
      me_cache[collection.symbol] = sol.toFixed(2);
      resolve(json);
    }
  });

  console.log(me_cache);

  i++;
}

function refreshCoin() {
  if (Object.keys(cmc_cache).length === 0) return;

  let coin = coins[j % coins.length], symbol = cmc_cache[coin].symbol, usd = cmc_cache[coin].quote.USD;

  if (usd.price < 1) {
    cents = usd.price * 100;
    price = `${cents.toFixed(2)}¢`
  } else if (usd.price < 1000) {
    price = `$${usd.price.toFixed(2)}`
  } else {
    price = `$${usd.price.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
  }

  console.log(`${symbol} ${price} ${usd.percent_change_24h >= 0 ? '▴' : '▾'}${Math.abs(usd.percent_change_24h.toFixed(1))}%`);
  ticker_bot.user.setActivity(`${symbol} ${price} ${usd.percent_change_24h >= 0 ? '▴' : '▾'}${Math.abs(usd.percent_change_24h.toFixed(1))}%`, { type: 'WATCHING' });
}

function showNextCoin() {
  refreshCoin();
  j++;
}

function refreshCollections() {
  let nickname = '';
  for(let i = 0; i < collections.length; i++) {
    nickname += `${collections[i].display} ${me_cache[collections[i].symbol]} `
  }
  nickname = nickname.trim();

  ticker_bot.guilds.cache.forEach((guild) => {
    guild.me.setNickname(nickname).catch((error) => {});
  });
}

https.createServer(function (req, res) {
}).listen(PORT, function() {

  bot.once('ready', () => {
    console.log('Ready!');
  });

  bot.commands = new Collection();

  const commandFiles = fs.readdirSync('./commands/').filter(f => f.endsWith('.js'))
  for (const file of commandFiles) {
      const props = require(`./commands/${file}`)
      console.log(`${file} loaded`)
      bot.commands.set(props.help.name, props)
  }

  //Command Manager
  bot.on("messageCreate", async message => {
      //Check if author is a bot or the message was sent in dms and return
      if(message.author.bot) return;
      if(message.channel.type === "dm") return;

      //get prefix from config and prepare message so it can be read as a command
      let messageArray = message.content.split(" ");
      let cmd = messageArray[0];
      let args = messageArray.slice(1);

      //Check for prefix
      if(!cmd.startsWith(prefix)) return;

      //Get the command from the commands collection and then if the command is found run the command file
      let commandfile = bot.commands.get(cmd.slice(prefix.length));
      if (commandfile) {

        // Only run command in UFO Labs during development
        if (typeof process.env.GUILD_ID !== 'undefined' && message.guild.id !== process.env.GUILD_ID) return;

        // Run the command
        console.log(`RUNNING COMMAND: ${message.content}`);
        commandfile.run(bot,message,args);
      }

  });

  //Token needed in config.json
  bot.login(process.env.TOKEN);

  ticker_bot.once('ready', () => {
    console.log('Ready!');
    ticker_bot.user.setActivity('Magic Eden', { type: 'WATCHING' });
    getCoinPrices();
    getNextCollection();
    var t = setInterval(getCoinPrices,300000); // update CMC cache every 5 minutes
    var t = setInterval(getNextCollection,10000); // get next collection from ME every 10 seconds
    var t = setInterval(showNextCoin,5000); // rotate displaying coins every 5 seconds
    var t = setInterval(refreshCollections,20000); // refresh collection prices every 20 seconds
  });

  //Token needed in config.json
  ticker_bot.login(process.env.TICKER_TOKEN);
});
