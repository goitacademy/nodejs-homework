const mongoose = require('mongoose');
const { Schema } = mongoose;
const { Subscription } = require('../helpers/constants');
const bcrypt = require('bcryptjs');
const SALT_FACTOR = 6;
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).toLowerCase());
      },
    },
    phone: {
      type: String,
    },
    subscription: {
      type: String,
      default: 'starter',
      // enum: {
      //   values: [Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS],
      //   default: 'starter',
      //   message: 'This subscription isn\t allowed',
      // },
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(SALT_FACTOR));
  next();
});

userSchema.methods.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
