const apolloServer = require('./graphql/apollo');
const NATS = require('nats')
const nc = NATS.connect({
  url: process.env.NATS_URL || 'nats://nats:4222'
})

nc.subscribe('report_in', (msg) => {
  console.log(msg); 
});

const nameList = [
  'Daedalus',
  'Odyssey',
  'Apollo',
  'Phoenix',
  'Orion',
  'Challenger'
];

const assignNames = () => {
  for(let i = 0; i < nameList.length; i++) {
    nc.publish('get_name', nameList[i]);
  };
};

(async () => {
  try {
    const { url } = await apolloServer.listen();
    assignNames();
    console.log(`Server ready at ${url}`);
  } catch (err) {
    console.log('error', err.message)
  }
})();
