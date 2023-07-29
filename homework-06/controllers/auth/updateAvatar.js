const { User } = require('../../models/user'); 
const path = require('path'); 
const fs = require('fs/promises'); 
const { HttpError, resizeImage } = require('../../helpers'); 
const avatarsDir = path.join(__dirname, '../../public/avatars'); 
const tempDir = path.join(__dirname, '../../temp'); 
const avatarExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff']; 

const updateAvatar = async (req, res) => {
  const { _id } = req.user; 
  const { path: tempUpload, originalname } = req.file; 
  const avatarName = `${_id}_${originalname}`; 

  const fileExtension = originalname.substring(originalname.lastIndexOf('.') + 1); 

  if (!avatarExtensions.includes(fileExtension.toLowerCase())) {
    // Перевірка, чи допустиме розширення файлу
    throw new HttpError(
      400,
      `${originalname} includes an invalid file extension! Must be: ${avatarExtensions.join(', or ')}`,
    );
  }

  const tempImagePath = path.join(tempDir, avatarName); 
  const resizedImagePath = path.join(avatarsDir, avatarName); 

  try {
    await fs.stat(tempImagePath); // Перевірка, чи існує тимчасовий файл з аватаркою
  } catch (error) {
    await fs.copyFile(tempUpload, tempImagePath); // Копіювання завантаженого тимчасового файлу в папку temp, якщо файлу ще немає
  }

  await resizeImage(tempImagePath, resizedImagePath); 

  const avatarURL = path.join('avatars', avatarName); // Формування шляху до аватарки для збереження в базу даних
  await User.findByIdAndUpdate(_id, { avatarURL }); // Оновлення запису користувача з новим посиланням на аватарку

  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar; 
