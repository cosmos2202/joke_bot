const { Client, Intents } = require('discord.js');
const { TOKEN, PREFIX } = require("./config.json")
const bot = new Client({intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_PRESENCES
]});
const axios = require('axios');
const cheerio = require('cheerio');

const jokesAPI = 'https://official-joke-api.appspot.com/random_joke';
const anekdotAPI = 'https://www.anekdot.ru/random/anekdot/';

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setPresence({
    activity: { name: '!help', type: 'PLAYING' },
    status: 'online'
  });
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
    const response = await axios.get(anekdotAPI);
    const $ = cheerio.load(response.data);
    const jokeTextElement = $('.topicbox').find('.text')[0];
    let jokeText;
    if (jokeTextElement) {
      jokeText = $(jokeTextElement).text().trim();
      message.channel.send(`${jokeText}`);
    } else {
       throw "Не удалось получить данные";
     }
   } catch (error) { 
     console.error(error);
     message.reply("Произошла ошибка при запросе данных.");
   }
}

async function handleHelpCommand(message) {
  message.channel.send(`The command for issuing a joke -> !joke \nЕсли необходимы анекдоты на русском введите -> !анекдот`);
}

bot.login(TOKEN);
