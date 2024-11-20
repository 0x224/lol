const mineflayer = require('mineflayer');

function createBot() {
  const bot = mineflayer.createBot({
    host: 'play.strongcraft.org',
    port: 25565,
    auth: 'microsoft',
    version: '1.18.2'
  });

  bot.on('login', () => {
    console.log('Bot has logged in');

    bot.chat('/go sur');
    console.log('Command sent: /go sur');



    setInterval(checkMainHandItem, 180000);
  });
  
  bot.on('end', () => {
    console.log('Bot disconnected. Attempting to reconnect in 30 minutes...');
    setTimeout(createBot, 1800000); 
  });

  bot.on('kicked', (reason) => {
    console.log(`Bot was kicked for: ${reason}`);
    console.log('Attempting to reconnect in 5 minutes...');
    setTimeout(() => {
      createBot();
    }, 1800000);
  });

  bot.on('chat', (username, message) => {
    if (username !== bot.username) {
      console.log(`${username}: ${message}`);
    }
  });

  bot.on('error', (err) => {
    console.error(`Error: ${err}`);
  });

  function checkMainHandItem() {
    const item = bot.inventory.slots[bot.getEquipmentDestSlot('hand')]; 
    if (item && item.name === 'compass') {
      console.log('Main hand item is a compass. Sending /go sur...');
      bot.chat('/go sur');
    } else {
    }
  }
}

createBot();
