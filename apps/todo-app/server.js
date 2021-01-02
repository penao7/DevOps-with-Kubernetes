const express = require('express');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const directory = path.join('/', 'usr', 'app');
const imagePath = path.join(directory, 'dailyImage.jpg');
const dayPath = path.join(directory, 'day.txt');

const app = express();
const port = process.env.PORT || 8000

let day = '';

const getDay = () => {
  return new Date().getDay().toString();
};

const saveDay = async () => {
  try {
    await fs.promises.writeFile(dayPath, getDay())
  } catch (err) {
    console.log(err);
  };
};

const getSavedDay = async () => {
  try {
    const savedDay = await fs.promises.readFile(dayPath, 'utf-8');
    day = savedDay;
  } catch (err) {
    console.log(err);
  };
};

const imageAlreadyExists = async () => {
  try {
    await fs.promises.access(imagePath);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const dateAlreadyExists = async () => {
  try {
    await fs.promises.access(dayPath);
    return true;
  } catch (err) {
    console.log(err);
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

const compareDay = () => {
  if (day === getDay()) {
    return true;
  };
  return false;
};

const handleApp = async () => {
  console.log('refreshed');
  if (await dateAlreadyExists()) {
    await getSavedDay();
  } else {
    await saveDay();
  };

  if (await imageAlreadyExists()) {
    if (!compareDay()) {
      await saveDay();
      await removeImage();
      await getImage();
    };
  } else {
    await getImage();
  }
};

const handleAppMiddleware = async (req, res, next) => {
  await handleApp();
  next();
};

app.use(express.static('build'));
app.use('/image', handleAppMiddleware, express.static(imagePath));

app.listen(port, async () => {
  console.log(`Server running at ${port}`);
});

