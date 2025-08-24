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

    // Sunucuya girişten 10 saniye sonra /login komutu gönder
    setTimeout(() => {
      bot.chat('/login benbitben');
      console.log(`${username} login yaptı`);

      // Login komutundan 10 saniye sonra /warp afk gönder
      setTimeout(() => {
        bot.chat('/warp afk');
        console.log(`${username} warp afk yaptı`);
      }, 10000);

      // Her 5 saniyede /shard pay obbyzz 1 gönder
      setInterval(() => {
        bot.chat('/shard pay obbyzz 1');
      }, 5000);

    }, 10000);
  });

  bot.on('error', err => console.log(`${username} hatası: ${err}`));
  bot.on('end', () => console.log(`${username} sunucudan çıktı`));
}

// 8 hesabı aynı anda başlat
accounts.forEach(account => createBot(account));

// Her 20 saniyede bir rastgele bot mesaj atacak
setInterval(() => {
  if (bots.length === 0) return;
  const randomBot = bots[Math.floor(Math.random() * bots.length)];
  randomBot.chat('Elytra,V5 Servet 3 Kırılmazlık kazma satılır');
  console.log(`${randomBot.username} mesaj attı`);
}, 20000);
