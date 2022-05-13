const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
console.log("-------------------- HERE --------------------");

let client;

try {
  
  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      puppeteer: {
    headless: false,
    executablePath:
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  },
    }
  });

} catch (error) {
  console.log("ERROR");
  console.log(error);
}

client.on('auth_failure', message => {
  console.log("Auth Error!");
  console.log(message);
});

client.on('authenticated', () => {    
  console.log("Authenticated!");
});

client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', async message => {
  let { body, from } = message;
  let possibleMessages = [];
  body = body.toLowerCase();

  switch (from) {
    case '51960802363@c.us':
      if (body === 'oe') {
        client.sendMessage(from, 'dímelo mi king');
      }
      break;
    case '51960596970@c.us':
      possibleMessages = ['que tal', 'que haces', 'que estabas haciendo'];
      body = body.toLowerCase();
      
      if (body.includes("hola") && !body.includes("enrique")) {
        message.reply('Hola mi chica preciosa ❤️');
      } else if (possibleMessages.includes(body)) {
        message.reply('Pensando en ti, hermosa ❤️');
      }
      break;
    case '51923367287@c.us':
      if (body.includes("quien es tu maestro")) {
        client.sendMessage(from, 'Tu lo eres');
      }
      break;
    default:
    if (body.includes("oe")) {
      client.sendMessage(from, 'Dímelo mi kong!');
    }
    break;
  }
	
  console.log(message);

});

client.initialize()
.catch(err => {
  console.log(err);
});
