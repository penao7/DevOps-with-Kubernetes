const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const cron = require('node-cron');

const directory = path.join('/', 'usr', 'app');
const imagePath = path.join(directory, 'dailyImage.jpg');

const app = express();
const port = process.env.PORT || 8000

const imageAlreadyExists = async () => {
  try {
    await fs.promises.access(imagePath);
    return true;
  } catch (err) {
    return false;
  }
};

const getImage = async () => {
  try {
    const res = await axios.get('https://picsum.photos/1200', { responseType: 'stream' });
    await res.data.pipe(fs.createWriteStream(imagePath));
  } catch (err) {
    console.log(err);
  }
};

const removeImage = async () => {
  try {
    await fs.promises.unlink(imagePath);
  } catch (err) {
    console.log(err);
  }
};

const changeImage = async () => {
  if (await imageAlreadyExists()) {
      await removeImage();
      await getImage()
  } else {
    await getImage();
  }
};

cron.schedule('00 00 * * *', () => {
  console.log('scheduled tasks ran:');
  console.log(new Date().toString());
  changeImage();
});

app.use('/dailyimage', express.static(imagePath));

app.listen(port, async () => {
  if(await imageAlreadyExists()) {
    await getImage();
  } else {
    await changeImage();
  }
  console.log(`Server running at ${port}`);
});

