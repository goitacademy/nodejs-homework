const fs = require('fs/promises'); // Підключення модуля fs/promises для роботи з файловою системою (асинхронний підхід)
const path = require('path'); // Підключення модуля path для роботи зі шляхами файлів та каталогів
const { nanoid } = require('nanoid'); // Підключення функції nanoid з модуля nanoid для генерації унікальних ідентифікаторів

const contactsPath = path.join(__dirname, 'contacts.json'); // Встановлення шляху до файлу contacts.json з використанням модуля path

const listContacts = async () => {
  // Функція для отримання списку контактів
  const list = await fs.readFile(contactsPath, 'utf-8'); // Асинхронне читання файлу contacts.json
  return JSON.parse(list); // Парсинг отриманого списку з формату JSON в об'єкт JavaScript
};

const getContactById = async contactId => {
  // Функція для отримання контакту за його ідентифікатором
  const list = await listContacts(); // Отримання списку контактів

  const contact = list.find(item => item.id === contactId); // Пошук контакту за його ідентифікатором

  return contact || null; // Повернення знайденого контакту або значення null, якщо контакт не знайдено
};

const addContact = async body => {
  // Функція для додавання контакту
  const list = await listContacts(); // Отримання списку контактів

  const newContact = {
    // Створення нового контакту з унікальним ідентифікатором та даними з тіла запиту
    id: nanoid(),
    ...body,
  };

  list.push(newContact); // Додавання нового контакту до списку

  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2)); // Асинхронне записування списку контактів у файл contacts.json

  return newContact; // Повернення доданого контакту
};

const removeContact = async contactId => {
  // Функція для видалення контакту
  const list = await listContacts(); // Отримання списку контактів

  const idx = list.findIndex(item => item.id === contactId); // Пошук індексу контакту за його ідентифікатором

  if (idx === -1) {
    // Якщо контакт не знайдено
    return null; // Повернення значення null
  }

  const [contact] = list.splice(idx, 1); // Видалення контакту зі списку

  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2)); // Асинхронне записування оновленого списку контактів у файл contacts.json

  return contact; // Повернення видаленого контакту
};

const updateContact = async (contactId, body) => {
  // Функція для оновлення контакту
  const list = await listContacts(); // Отримання списку контактів

  const idx = list.findIndex(item => item.id === contactId); // Пошук індексу контакту за його ідентифікатором

  if (idx === -1) {
    // Якщо контакт не знайдено
    return null; // Повернення значення null
  }

  list[idx] = { id: contactId, ...body }; // Оновлення контакту з новими даними

  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2)); // Асинхронне записування оновленого списку контактів у файл contacts.json

  return list[idx]; // Повернення оновленого контакту
};

module.exports = {
  // Експорт функцій для використання у інших файлах
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
