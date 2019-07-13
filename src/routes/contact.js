/**
 * @author Matheus Paice <matheus.ferreira@gmail.com>
 * @description Routes contact
 */

const express = require('express');

const router = express.Router();

const { models } = require('../models');

router.post('/addContact', async (req, res) => {
  const { user, contact } = req.body;

  try {
    const isContact = await models.User.findOne({ where: { firstName: contact } });
    if (!isContact) {
      return res.status(500).json({
        message: 'Error',
        data: 'Contact not found',
      });
    }

    const newContact = await models.Contact.create({
      user,
      contact: isContact.id,
    });

    return res.status(200).json({
      message: 'OK',
      data: newContact,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error',
      data: e.message,
    });
  }
});

router.get('/listContacts', async (req, res) => {
  const { user } = req.query;

  try {
    const listContacts = await models.Contact.findAll({ where: { user } });

    return res.status(200).json({
      message: 'OK',
      data: listContacts,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error',
      data: e.message,
    });
  }
});

module.exports = router;
