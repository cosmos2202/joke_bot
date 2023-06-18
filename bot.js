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
const anekdotAPI = 'https://www.anekdot.ru/random/anekdot/';

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setPresence({
    status: 'online',
    activity: {
        type: 'WATCHING',
        name: 'Введите `!помощь`',
    },
  });
});

bot.on('messageCreate', msg => {
  if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;
  const [command, ...args] = msg.content.slice(PREFIX.length).trim().split(/ +/);

  switch (command.toLowerCase()) {

    /*-----------------------------joke---------------------------------*/
    case 'анекдот':
      handleAnekdotCommand(msg);
      break;
    case 'помощь':
      handleHelpCommand(msg);
      break;

    /*-------------------------------horoscope--------------------------------*/
    case 'овен':
        aries(msg);
      break;
    case 'телец':
        taurus(msg);
      break;
    case 'помощь':
        help(msg);
      break;
    case 'близницы':
        gemini(msg);
      break;
    case 'рак':
        cancer(msg);
      break;
    case 'лев':
        leo(msg);
      break;
    case 'дева':
        virgo(msg);
      break;
    case 'весы':
        libra(msg);
      break;
    case 'скорпион':
        scorpio(msg);
      break;
    case 'стрелец':
        sagittarius(msg);
      break;
    case 'козерог':
        capricorn(msg);
      break;
    case 'водолей':
        aquarius(msg);
      break;
    case 'рыбы':
        pisces(msg);
      break;
    
    /*------------------------fact-------------------------*/
    case 'факт':
      fact(msg);
    break;
    /*------------------------number---------------------*/
    case 'число':
      number(msg);
    break;
    /*--------------------------saying-----------------------*/
    case 'мудрость':
      saying(msg);
    break;
  }
});

/*-----------------------joke---------------------*/
async function handleAnekdotCommand(msg) {
  try {
    const response = await axios.get(anekdotAPI);
    const $ = cheerio.load(response.data);
    const jokeTextElement = $('.topicbox').find('.text')[0];
    let jokeText;
    if (jokeTextElement) {
      jokeText = $(jokeTextElement).text().trim();
      msg.channel.send(`${jokeText}`);
    } else {
       throw "Не удалось получить данные";
     }
   } catch (error) { 
     console.error(error);
     msg.reply("Произошла ошибка при запросе данных.");
   }
}

/*---------------------------------horoscope----------------------------------------*/
async function aries(msg) {
  try {
      const response = await axios.get("https://horo.mail.ru/prediction/aries/today/");
      const $ = cheerio.load(response.data);
      const horoscopeText = $('.article__item').first().text().trim();
      if (horoscopeText) {      
        msg.channel.send(`Гороскоп для Овен на ${new Date().toLocaleDateString()}: **${horoscopeText}**`);
       } else { 
         throw new Error("Не удалось найти текст гороскопа.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

async function taurus(msg) {
  try {
      const response = await axios.get("https://horo.mail.ru/prediction/taurus/today/");
      const $ = cheerio.load(response.data);
      const horoscopeText = $('.article__item').first().text().trim();
      if (horoscopeText) {      
        msg.channel.send(`Гороскоп для Тельца на ${new Date().toLocaleDateString()}: **${horoscopeText}**`);
       } else { 
         throw new Error("Не удалось найти текст гороскопа.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

async function gemini(msg) {
  try {
      const response = await axios.get("https://horo.mail.ru/prediction/gemini/today/");
      const $ = cheerio.load(response.data);
      const horoscopeText = $('.article__item').first().text().trim();
      if (horoscopeText) {      
        msg.channel.send(`Гороскоп для Близнецов на ${new Date().toLocaleDateString()}: **${horoscopeText}**`);
       } else { 
         throw new Error("Не удалось найти текст гороскопа.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

async function cancer(msg) {
  try {
      const response = await axios.get("https://horo.mail.ru/prediction/cancer/today/");
      const $ = cheerio.load(response.data);
      const horoscopeText = $('.article__item').first().text().trim();
      if (horoscopeText) {      
        msg.channel.send(`Гороскоп для Рака на ${new Date().toLocaleDateString()}: **${horoscopeText}**`);
       } else { 
         throw new Error("Не удалось найти текст гороскопа.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

async function leo(msg) {
  try {
      const response = await axios.get("https://horo.mail.ru/prediction/leo/today/");
      const $ = cheerio.load(response.data);
      const horoscopeText = $('.article__item').first().text().trim();
      if (horoscopeText) {      
        msg.channel.send(`Гороскоп для Льва на ${new Date().toLocaleDateString()}: **${horoscopeText}**`);
       } else { 
         throw new Error("Не удалось найти текст гороскопа.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

async function virgo(msg) {
  try {
      const response = await axios.get("https://horo.mail.ru/prediction/virgo/today/");
      const $ = cheerio.load(response.data);
      const horoscopeText = $('.article__item').first().text().trim();
      if (horoscopeText) {      
        msg.channel.send(`Гороскоп для Девы на ${new Date().toLocaleDateString()}: **${horoscopeText}**`);
       } else { 
         throw new Error("Не удалось найти текст гороскопа.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

async function libra(msg) {
  try {
      const response = await axios.get("https://horo.mail.ru/prediction/libra/today/");
      const $ = cheerio.load(response.data);
      const horoscopeText = $('.article__item').first().text().trim();
      if (horoscopeText) {      
        msg.channel.send(`Гороскоп для Весов на ${new Date().toLocaleDateString()}: **${horoscopeText}**`);
       } else { 
         throw new Error("Не удалось найти текст гороскопа.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

async function scorpio(msg) {
  try {
      const response = await axios.get("https://horo.mail.ru/prediction/scorpio/today/");
      const $ = cheerio.load(response.data);
      const horoscopeText = $('.article__item').first().text().trim();
      if (horoscopeText) {      
        msg.channel.send(`Гороскоп для Скорпионов на ${new Date().toLocaleDateString()}: **${horoscopeText}**`);
       } else { 
         throw new Error("Не удалось найти текст гороскопа.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

async function sagittarius(msg) {
  try {
      const response = await axios.get("https://horo.mail.ru/prediction/sagittarius/today/");
      const $ = cheerio.load(response.data);
      const horoscopeText = $('.article__item').first().text().trim();
      if (horoscopeText) {      
        msg.channel.send(`Гороскоп для Стрельца на ${new Date().toLocaleDateString()}: **${horoscopeText}**`);
       } else { 
         throw new Error("Не удалось найти текст гороскопа.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

async function capricorn(msg) {
  try {
      const response = await axios.get("https://horo.mail.ru/prediction/capricorn/today/");
      const $ = cheerio.load(response.data);
      const horoscopeText = $('.article__item').first().text().trim();
      if (horoscopeText) {      
        msg.channel.send(`Гороскоп для Козерога на ${new Date().toLocaleDateString()}: **${horoscopeText}**`);
       } else { 
         throw new Error("Не удалось найти текст гороскопа.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

async function aquarius(msg) {
  try {
      const response = await axios.get("https://horo.mail.ru/prediction/aquarius/today/");
      const $ = cheerio.load(response.data);
      const horoscopeText = $('.article__item').first().text().trim();
      if (horoscopeText) {      
        msg.channel.send(`Гороскоп для Водолеев на ${new Date().toLocaleDateString()}: **${horoscopeText}**`);
       } else { 
         throw new Error("Не удалось найти текст гороскопа.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

async function pisces(msg) {
  try {
      const response = await axios.get("https://horo.mail.ru/prediction/pisces/today/");
      const $ = cheerio.load(response.data);
      const horoscopeText = $('.article__item').first().text().trim();
      if (horoscopeText) {      
        msg.channel.send(`Гороскоп для Рыбы на ${new Date().toLocaleDateString()}: **${horoscopeText}**`);
       } else { 
         throw new Error("Не удалось найти текст гороскопа.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

/*-----------------------------------fact---------------------------------*/
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Host': 'randstuff.ru',
    'Origin': 'https://randstuff.ru',
    'Connection': 'keep-alive',
    "Referer": "https://randstuff.ru/fact/",
    "X-Requested-With": "XMLHttpRequest"
  },
  body: new URLSearchParams({
      count:1,
      from:'range', 
      start:1,
      end:100,
      list:'', 
      unique:false,
      tz:-180
  })
};

async function fact(msg) {
  try {
      const factResponse = await require('node-fetch')("https://randstuff.ru/fact/generate", options);
      const factData = await factResponse.json();
      if (factData) {      
        msg.channel.send(`**${factData.fact.text}**`);
       } else { 
         throw new Error("Не удалось найти факт.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

/*---------------------------number-------------------------*/
async function number(msg) {
  try {
      const factResponse = await require('node-fetch')("https://randstuff.ru/number/generate", options);
      const factData = await factResponse.json();
      if (factData) {      
        msg.channel.send(`Ваше случайное число: **${factData.number}**`);
       } else { 
         throw new Error("Не сгенерировать число.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

/*--------------------------------saying-------------------------------*/
async function saying(msg) {
  try {
      const factResponse = await require('node-fetch')("https://randstuff.ru/saying/generate", options);
      const factData = await factResponse.json();
      if (factData) {      
        msg.channel.send(`**${factData.saying.text}** Автор: **${factData.saying.author}**`);
       } else { 
         throw new Error("Произошла ошибка.");
       }
     } catch (error) { 
       console.error(error);
       msg.reply("Произошла ошибка при запросе данных.");
     }
};

async function handleHelpCommand(msg) {
  msg.channel.send(`Если необходимы анекдоты на русском введите "!анекдот"\nДля получения гороскопа введите "!знак задиака", например "!овен"\nДля получения интересного факта "!факт"\nДля получения случайного числа "!число"\nДля получения мудрости "!мудрость"`);
}

bot.login(TOKEN);
