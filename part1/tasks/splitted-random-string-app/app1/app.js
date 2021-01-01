const fs = require('fs');
const path = require('path');

const directory = path.join('/', 'usr', 'app')
const filePath = path.join(directory, 'date.txt')

console.log(filePath);

const checkFolderPath = async () => {
  try {
    await fs.promises.access(filePath);
    return true;
  } catch (err) {
    return false;
  };
};

const createFolder = () => {
  fs.mkdir(directory, { recursive: true }, (err) => {
    if(err) {
      console.log(err)
    } else {
      console.log("New directory created");
    }
  });
};

const output = () => {
  return new Date().toISOString();
};

const createLog = async () => {
  if(!await checkFolderPath()) {
    createFolder(); 
  };
  fs.writeFile(filePath, output(), (err) => {
    console.log('date generated');
    if(err) return console.log(err);
});
};

createLog();

setInterval(() => {
  createLog();
}, 5000);

