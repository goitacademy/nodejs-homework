const Jimp = require('jimp'); // Підключаємо бібліотеку Jimp для роботи з зображеннями

const resizeImage = async (sourcePath, destinationPath) => {
  const image = await Jimp.read(sourcePath); 
  image.resize(250, 250); 
  await image.writeAsync(destinationPath); // Зберігаємо зображення у вказаному шляху (destinationPath) за допомогою методу writeAsync()
};

module.exports = resizeImage;
