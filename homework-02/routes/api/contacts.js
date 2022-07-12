const express = require('express');
const path = require('path');
const { v4 } = require('uuid');
const Joi = require('joi');
const fs = require('fs/promises');

const contactsPath = path.resolve('db/contacts.json');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const contactSchemaByPut = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const contacts = require('../../db/contacts.json');

const router = express.Router();

// GET /api/contacts
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    code: 200,
    data: {
      result: contacts,
    },
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const result = contacts.find(item => item.id === id);
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Product with id=${id} not found`,
    });
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  });
});
// POST /api/contacts
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = { ...req.body, id: v4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactSchemaByPut.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { id } = req.params;

    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
      return null;
    }
    const newContacts = { ...contacts[idx], ...req.body, id };
    contacts[idx] = newContacts;
    // contacts[idx] = { ...req.body, id };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));

    if (!contacts[idx]) {
      throw new NotFound(`Product with id=${id} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        ...contacts[idx],
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
      return null;
    }
    const newContacts = contacts.filter((_, index) => index !== idx);
    const removContact = contacts[idx];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    if (!removContact) {
      throw new NotFound(`Product with id=${id} not found`);
    }
    // res.status(204).json()
    res.json({
      status: 'success',
      code: 200,
      message: 'product deleted',
      data: {
        removContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
