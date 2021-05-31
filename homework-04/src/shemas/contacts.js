const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    features: {
      type: Array,
      set: data => (!data ? [] : data),
    },
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: 'user' },
  },
  { versionKey: false, timestamps: true },
);
contactsSchema.plugin(mongoosePaginate);
const Contact = mongoose.model('contact', contactsSchema);

module.exports = Contact;
