const { Client, GatewayIntentBits } = require('discord.js');
const bot = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages,
  GatewayIntentBits.MessageContent,
  GatewayIntentBits.GuildMembers,] });
const fetch = require('node-fetch');
const config = require('./config.json');
const token = config.token;
const prefix = config.prefix;

const jokesAPI = 'https://official-joke-api.appspot.com/random_joke';

bot.on('ready', () => {
  console.log(`Successfully launched -> ${bot.user.tag}!`);
});

bot.on('messageCreate', async msg => { console.log('joke')
  if (msg.content.startsWith(prefix)) {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    switch (command) {
      case 'help':
        msg.channel.send(`A bot telling jokes, enter the command '-joke'`);
        break;
      case 'joke':
        const response = await fetch(jokesAPI);
        const joke = await response.json();
        msg.channel.send(`**${joke.setup}**\n${joke.punchline}`);
        break;
    }
  }
});

bot.login(token);
