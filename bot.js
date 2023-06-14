const { Client, Intents, Collection } = require('discord.js');
const { TOKEN, PREFIX } = require("./config.json")
const bot = new Client({intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_PRESENCES
]});
const { parseString } = require('xml2js');

const jokesAPI = 'https://official-joke-api.appspot.com/random_joke';
const anekdotAPI = 'http://rzhunemogu.ru/RandJSON.aspx?CType=1';

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('messageCreate', message => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;
  const [command, ...args] = message.content.slice(PREFIX.length).trim().split(/ +/);

  switch (command.toLowerCase()) {
    case 'joke':
      handleJokeCommand(message);
      break;
    case 'анекдот':
      handleAnekdotCommand(message);
      break;
    case 'help':
      handleHelpCommand(message);
      break;
  }
});

async function handleJokeCommand(message) {
  const response = await fetch(jokesAPI);
  const joke = await response.json(); 
  message.channel.send(`**${joke.setup}**\n${joke.punchline}`);
}

async function handleAnekdotCommand(message) {
  try {
    const response = await fetch(anekdotAPI, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept-Charset': 'utf-8'
      }
    });
    const joke = await response.json(); 
    message.channel.send(`**${joke.content}**`);
  } catch (err) {
      console.error(err);
      message.channel.send('Произошла ошибка при получении анекдота :(');
  }
}

async function handleHelpCommand(message) {
  message.channel.send(`The command for issuing a joke -> !joke`);
}

bot.login(TOKEN);
