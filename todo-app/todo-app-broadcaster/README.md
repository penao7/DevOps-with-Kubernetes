# Broadcaster

This service is used to receive messages from [the GraphQL service](/todo-app/todo-app-graphql) sent through [NATS](https://nats.io/). 
When a CRUD operation occures in the GraphQL, a message is received and the payload is forwarded to Telegram group using [Telegram Bot API](https://github.com/tdlib/telegram-bot-api).

## Requirements

[NATS installed to a cluster](https://docs.nats.io/nats-server/installation)

## ENV
```
BOT_TOKEN: <Token for the Telegram bot>
CHATROOM: <Telegram chatroom ID>
```


