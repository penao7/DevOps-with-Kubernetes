const Client = require('kubernetes-client').Client
const express = require('express');
const app = express();
const crd = require('./scraper-crd.json')
const port = process.env.PORT || 6000;

app.use(express.static('public'));

const scrapeUrl = require('./scraper'); 

async function watchWebScrapers (client) {
  const stream = await client.apis['stable.dwk'].v1.watch.webscrapers.getObjectStream();

  stream.on('data', async ({ type, object }) => {
    if(type === 'ADDED') {
      try {
        await scrapeUrl(object.spec.web_url, port);
        console.log(`cleaning up... deleting ${object.metadata.name}`);
        await client.apis['stable.dwk'].v1.namespaces(object.metadata.namespace).webscrapers(object.metadata.name).delete()
      } catch (err) {
        console.log('could not scrape, Error:', err);
      }
    } else if (type === 'DELETED') {
      console.log(`${object.metadata.name} succesfully deleted`);
    }
  });
};

async function main () {
  try {
    const client = new Client();
    await client.loadSpec();
    
    try {
    const create = await client.apis['apiextensions.k8s.io'].v1.customresourcedefinitions.post({ body: crd })
    } catch (err) {
      // Error 409 = CRD already exists
      if(err.statusCode !== 409) throw err;
    }

    client.addCustomResourceDefinition(crd);

    watchWebScrapers(client);
  } catch (err) {
    console.log(err)
  }
};

main();

app.listen(port, () => {
  console.log(`server running at ${port}`);  
});
