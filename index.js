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

// Bot oluşturma fonksiyonu
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

    // Sunucuya girişten 10 saniye sonra /login komutu
    setTimeout(() => {
      try {
        bot.chat('/login benbitben');
        console.log(`${username} login yaptı`);
      } catch (err) {
        console.log(`${username} login gönderilemedi:`, err);
      }

      // Login’den 10 saniye sonra /warp afk
      setTimeout(() => {
        try {
          bot.chat('/warp afk');
          console.log(`${username} warp afk yaptı`);
        } catch (err) {
          console.log(`${username} warp afk gönderilemedi:`, err);
        }
      }, 10000);

      // Her 5 saniyede /shard pay obbyzz 1 gönder
      setInterval(() => {
        try {
          bot.chat('/shard pay obbyzz 1');
        } catch (err) {
          console.log(`${username} shard komutu gönderilemedi:`, err);
        }
      }, 5000);

    }, 10000);
  });

  // Sunucudan gelen chat mesajlarını logla
  bot.on('chat', (username, message) => {
    console.log(`[CHAT] ${username}: ${message}`);
  });

  bot.on('whisper', (username, message) => {
    console.log(`[WHISPER] ${username}: ${message}`);
  });

  // Hataları ve sunucudan çıkışları yakala
  bot.on('error', err => console.log(`${username} hatası:`, err));
  bot.on('end', () => {
    console.log(`${username} sunucudan çıktı, 10 saniye sonra yeniden bağlanacak...`);
    setTimeout(() => createBot(username), 10000);
  });
}

// Botları sırayla başlat (5 saniye arayla)
accounts.forEach((account, index) => {
  setTimeout(() => createBot(account), index * 5000);
});
