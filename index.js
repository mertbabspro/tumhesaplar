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

// Güvenli chat fonksiyonu
function safeChat(bot, message) {
  try {
    if (typeof bot.chat === 'function') {
      bot.chat(message);
    } else if (bot._client && typeof bot._client.write === 'function') {
      bot._client.write('chat', { message });
    } else {
      console.log(`${bot.username} chat fonksiyonu bulunamadı.`);
    }
  } catch (err) {
    console.log(`${bot.username} mesaj gönderilemedi:`, err);
  }
}

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
      safeChat(bot, '/login benbitben');
      console.log(`${username} login yaptı`);

      // Login’den 10 saniye sonra /warp afk
      setTimeout(() => {
        safeChat(bot, '/warp afk');
        console.log(`${username} warp afk yaptı`);
      }, 10000);

      // Her 5 saniyede /shard pay obbyzz 1 gönder
      setInterval(() => {
        safeChat(bot, '/shard pay obbyzz 1');
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
