const Jimp = require('jimp'); // Підключення бібліотеки Jimp для роботи з зображеннями

const resizeImage = async (sourcePath, destinationPath) => {
  // Асинхронна функція для зміни розміру зображення
  const image = await Jimp.read(sourcePath); // Зчитування вихідного зображення з вказаного шляху
  image.resize(250, 250);
  await image.writeAsync(destinationPath); // Збереження зменшеного зображення за вказаним шляхом
};

module.exports = resizeImage;
