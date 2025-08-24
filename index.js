const mineflayer = require('mineflayer');

const accounts = [
  'obbyzzafk',
  'obbyzzafk2',
  'obbyzzafk3',
  'obbyzzafk4',
  'obbyzzafk5',
  'cengizpoyraz',
  'fiategeaafk1',
  'fiategeaafk2'
];

const bots = [];

function createBot(username) {
  const bot = mineflayer.createBot({
    host: 'zurnacraft.net',
    port: 25565,
    username: username,
    version: '1.19'
  });

  bots.push(bot);

  bot.on('login', () => {
    console.log(`${username} sunucuya giriş yaptı!`);

    setTimeout(() => {
      bot.chat('/login benbitben');
      console.log(`${username} login yaptı`);

      setTimeout(() => {
        bot.chat('/warp afk');
        console.log(`${username} warp afk yaptı`);
      }, 10000);

      setInterval(() => {
        bot.chat('/shard pay obbyzz 1');
      }, 5000);

    }, 10000);
  });

  // Sunucudan gelen tüm chat mesajlarını logla
  bot.on('chat', (username, message) => {
    console.log(`[CHAT] ${username}: ${message}`);
  });

  bot.on('whisper', (username, message) => {
    console.log(`[WHISPER] ${username}: ${message}`);
  });

  bot.on('error', err => console.log(`${username} hatası: ${err}`));
  bot.on('end', () => console.log(`${username} sunucudan çıktı`));
}

accounts.forEach(account => createBot(account));

// Her 20 saniyede bir rastgele bot mesaj atacak
setInterval(() => {
  if (bots.length === 0) return;
  const randomBot = bots[Math.floor(Math.random() * bots.length)];
  randomBot.chat('Elytra,V5 Servet 3 Kırılmazlık kazma satılır');
  console.log(`[BOT MESAJI] ${randomBot.username}: Elytra,V5 Servet 3 Kırılmazlık kazma satılır`);
}, 20000);
