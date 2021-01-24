const TelegramBot = require('node-telegram-bot-api');
const NATS = require('nats');

const natsConnection = async () => {
  try {
    await NATS.connect({ url: process.env.NATS_URL })
    console.log('succesfully connected to NATS');
  } catch (err) {
    console.log(err)
  }
};

natsConnection();

const token = process.env.BOT_TOKEN;
const url = process.env.NATS_URL;
const chatroom = process.env.CHATROOM;

if(!chatroom) {
  return console.log('ENV CHATROOM not provided, exiting...');
}

if(!url) {
  return console.log('ENV NATS_URL not provided, exiting...');
}

if(!token) {
  return console.log('ENV BOT_TOKEN not provided, exiting...');
}

console.log('TOKEN', token);
console.log('URL', url);
console.log('CHATROOM', chatroom);

const nc = NATS.connect({
  url: url
});

const telegram = new TelegramBot(token);

const hostname = process.env.HOSTNAME;

let broadcastedBy = '';

nc.subscribe('get_name', { queue: "broadcasters", max: 1 }, (msg) => {
  broadcastedBy = `broadcasted by ${msg} @ ${hostname}`
  nc.publish('report_in', 'Broadcaster ' + msg + ' reporting for duty!'); 
});

nc.subscribe('todo_create', { queue: "broadcasters" }, (msg) => {
  console.log('createmsg', msg);
  telegram.sendMessage(-441829368, 'Todos broadcaster\n\n' + msg + '\n\n' + broadcastedBy );
});

nc.subscribe('todo_delete', { queue: "broadcasters" }, (msg) => {
  telegram.sendMessage(-441829368, 'Todos broadcaster\n\n' + msg + '\n\n' + broadcastedBy);
});

nc.subscribe('todo_edit', { queue: "broadcasters" }, (msg) => {
  telegram.sendMessage(-441829368, 'Todos broadcaster\n\n' + msg + '\n\n' + broadcastedBy);
});


