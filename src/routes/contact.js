/**
 * @author Matheus Paice <matheus.ferreira@gmail.com>
 * @description Routes contact
 */

const express = require('express');

const router = express.Router();

const { models } = require('../models');
const auth = require('../middleware/auth');

router.post('/addContact', auth, async (req, res) => {
  const { contact } = req.body;
  const { id } = req.tokenJwt;

  try {
    const isContact = await models.User.findOne({ where: { id: contact } });

    if (!isContact) {
      return res.status(500).json({
        message: 'Error',
        data: 'Contact not found',
      });
    }

    const newContact = await models.Contact.create({
      user: id,
      contact: isContact.id,
    });

    await models.Contact.create({
      user: isContact.id,
      contact: id,
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

router.get('/listContacts/:user', async (req, res) => {
  const { user } = req.params;

  try {
    const listContacts = await models.Contact.findAll({ where: { user } });

    const data = [];
    for (let i = 0; i < listContacts.length; i += 1) {
      const response = await models.User.findAll({ where: { id: listContacts[i].contact } });

      data.push(...response);
    }

    return res.status(200).json({
      message: 'OK',
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error',
      data: e.message,
    });
  }
});

module.exports = router;
