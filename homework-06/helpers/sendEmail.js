const sgMail = require('@sendgrid/mail'); // Підключаємо бібліотеку sendgrid/mail для надсилання електронних листів
require('dotenv').config(); // Підключаємо .env для отримання SENDGRID_API_KEY

const { SENDGRID_API_KEY } = process.env; // Отримуємо SENDGRID_API_KEY з оточення

sgMail.setApiKey(SENDGRID_API_KEY); 

const sendEmail = async data => {
  const email = { ...data, from: 'supermetamail@meta.ua' }; 
  await sgMail.send(email); 
  return true; // Після успішного надсилання повертаємо значення true
};

module.exports = sendEmail; 
