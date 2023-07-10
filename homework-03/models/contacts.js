const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const { HttpError, handleMongooseError } = require("../helpers/index");

const contactsPath = path.resolve("models/contacts.json");

const { Schema, model } = require("mongoose");

const contactsSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
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
});

const Contacts = model("contacts", contactsSchema);

contactsSchema.post("save", handleMongooseError);

module.exports = Contacts;
