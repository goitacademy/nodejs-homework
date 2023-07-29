const { User } = require('../../models/user');
const path = require('path');
const fs = require('fs/promises');
const { HttpError, resizeImage } = require('../../helpers');

const avatarsDir = path.join(__dirname, '../../public/avatars');

// Тимчасова директорія для завантаження аватарів перед зміною розміру
const tempDir = path.join(__dirname, '../../temp');

const avatarExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff'];

const updateAvatar = async (req, res) => {
  const { _id } = req.user;

  // Отримання даних про завантажений аватар з об'єкту файлу, що був завантажений з допомогою multer
  const { path: tempUpload, originalname } = req.file;

  const avatarName = `${_id}_${originalname}`;

  const fileExtension = originalname.substring(originalname.lastIndexOf('.') + 1);

  // Перевірка, чи відповідне розширення файлу знаходиться серед дозволених
  if (!avatarExtensions.includes(fileExtension.toLowerCase())) {
    throw new HttpError(
      400,
      `${originalname} includes an invalid file extension! Must be: ${avatarExtensions.join(', or ')}`,
    );
  }

  // Формуємо шлях до тимчасового файлу з аватаром
  const tempImagePath = path.join(tempDir, avatarName);

  // Формуємо шлях до файлу з зміненим розміром (аватаром) у директорії public/avatars
  const resizedImagePath = path.join(avatarsDir, avatarName);

  try {
    // Перевіряємо, чи файл з аватаром вже існує у тимчасовій директорії
    await fs.stat(tempImagePath);
  } catch (error) {
    // Якщо файл відсутній, це означає, що це перший раз завантажується аватар,
    // тому ми копіюємо його без зміни розміру в тимчасову директорію
    await fs.copyFile(tempUpload, tempImagePath);
  }

  await resizeImage(tempImagePath, resizedImagePath);

  // Оновлюємо поле avatarURL в об'єкті користувача в базі даних за допомогою методу findByIdAndUpdate
  await User.findByIdAndUpdate(_id, { avatarURL: path.join('avatars', avatarName) });

  res.json({
    avatarURL: path.join('avatars', avatarName),
  });
};

module.exports = updateAvatar;
