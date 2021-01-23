const scrape = require('website-scraper');
const { exec } = require('child_process');

const cleanScrapeFolder = () => {
  console.log("deleting previous webscrape files...");
  exec("rm -rf ./public", (error, stdout, stderr) => {
    if(error) {
      console.log(`error: ${error.message}`)
      return;
    }
      if(stderr) {
        console.log(`srderr: ${stderr}`)
        return;
    }
      console.log("previous webscrape files deleted!");
  });
};

const scrapeUrl = async (url, port) => {

  let options = {
    urls: [`${url}`],
    directory: './public',
  };

  try {
    cleanScrapeFolder();
    console.log(`scraping url: ${url}`);
    const result = await scrape(options);
    console.log(`Website succesfully scraped! Page is available at http://localhost:${port}`);
  } catch (err) {
    console.log('error occured', err.message);
  }
};

module.exports = scrapeUrl;
