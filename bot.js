const { Client, GatewayIntentBits } = require('discord.js');
const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});
const fetch = require('node-fetch');
const config = require('./config.json');
const token = config.token;
const prefix = config.prefix;

const jokesAPI = 'https://official-joke-api.appspot.com/random_joke';

bot.on('ready', () => {
  console.log(`Successfully launched -> ${bot.user.tag}!`);
  bot.user.setPresence({
    status: 'online',
    activity: {
      name: '-help',
      type: 'PLAYING'
    }
  });
});

bot.on('messageCreate', async msg => {
  if (msg.content.startsWith(prefix)) {
    const args = msg.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
      case 'help':
        msg.channel.send(`A bot telling jokes, enter the command '-joke' <-> Либо просто '-анекдот'`);
        break;
      case 'joke':
        var response = await fetch(jokesAPI);
        const joke = await response.json();
        msg.channel.send(`**${joke.setup}**\n${joke.punchline}`);
        break;
      case 'анекдот':
        var response = await fetch('https://www.anekdot.ru/random/anekdot/');
        const html = await response.text();
        const regexp = /<div class="text">(.+)<\/div>/s;
        const match = html.match(regexp);
        if (match) {
          const anekdot = match[1]
            .replace(/<br>/g, '\n')
            .replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
          msg.channel.send(anekdot);
        } else {
          msg.channel.send('Не удалось получить анекдот :(');
        }
        break;
    }
  }
});

bot.login(token);
