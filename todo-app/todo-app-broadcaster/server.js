const TelegramBot = require('node-telegram-bot-api');
const NATS = require('nats');
const nc = NATS.connect({
  url: process.env.NATS_URL || 'nats://nats:7777:'
});

const token = "1408137041:AAHTn0x42PVFV5dhli3pS0Oif97_p2LqJSA"

const telegram = new TelegramBot(token);

const hostname = process.env.HOSTNAME || 'hostname not defined'

let broadcastedBy = '';

nc.subscribe('get_name', { queue: "broadcasters", max: 1 }, (msg) => {
  broadcastedBy = `broadcasted by ${msg} @ ${hostname}`
  nc.publish('report_in', 'Broadcaster ' + msg + ' reporting for duty!'); 
});

nc.subscribe('todo_create', { queue: "broadcasters" }, (msg) => {
  telegram.sendMessage(-441829368, 'Todos broadcaster\n\n' + msg + '\n\n' + broadcastedBy );
});

nc.subscribe('todo_delete', { queue: "broadcasters" }, (msg) => {
  telegram.sendMessage(-441829368, 'Todos broadcaster\n\n' + msg + '\n\n' + broadcastedBy);
});

nc.subscribe('todo_edit', { queue: "broadcasters" }, (msg) => {
  telegram.sendMessage(-441829368, 'Todos broadcaster\n\n' + msg + '\n\n' + broadcastedBy);
});


