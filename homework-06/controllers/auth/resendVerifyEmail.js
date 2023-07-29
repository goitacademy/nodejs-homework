const { User } = require('../../models/user'); 
const { HttpError, sendEmail } = require('../../helpers'); 
require('dotenv').config(); 
const { BASE_URL } = process.env; 

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body; 
  const user = await User.findOne({ email }); 

  if (!user) {
    throw HttpError(401, 'User not found');
  }

  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  const verifyEmail = {
    to: email,
    subject: 'Verify email',
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to verify email</a>`,
  }; // Створення об'єкту email для відправки листа з посиланням для верифікації email

  await sendEmail(verifyEmail); // Відправлення листа з посиланням на верифікацію email

  res.json({
    message: 'Verification email sent',
  }); // Відправлення відповіді з підтвердженням відправки листа
};

module.exports = resendVerifyEmail; 
