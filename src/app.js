const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
console.log("-------------------- HERE --------------------");

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: './data-auth',
  }),
  puppeteer: {
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  }
});

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
  let dontWantTheseMessages = ['ok', 'esta bien'];
  
  from = from.replace("@c.us", "");
  body = body.toLowerCase();

  if (from.length <= 11) {
    
    switch (from) {
      case '51960802363':
        if (body === 'oe') {
          client.sendMessage(from, 'dímelo mi king');
        }
        break;
      case '51960596970':
        possibleMessages = ['que tal', 'que haces', 'que estabas haciendo'];
        body = body.toLowerCase();
        
        if (body.includes("hola") && body.includes("amor") && !body.includes("enrique")) {
          message.reply('Hola mi chica preciosa ❤️');
        } else if (body.includes('buenos días') && body.includes('buenos dias') && body.includes('amor')) {
          message.reply('Buenos días a la chica más hermosa ❤️');
          client.sendMessage('51960596970', 'Preciosa, churra 😍');
          client.sendMessage(51960596970, '❤️❤️❤️');
        } else if (possibleMessages.includes(body)) {
          message.reply('Pensando en ti, hermosa ❤️');
        } else if (dontWantTheseMessages.includes(body)) {
          message.reply('ujum');
        }
        break;
      default:
        if (body.includes("oe")) {
          client.sendMessage(from, 'Dímelo mi kong!');
        }
        break;
    }

  }
	
  // console.log(message);

});

client.initialize()
.catch(err => {
  console.log(err);
});
