/**
 * @author Matheus Paice <matheus.ferreira@gmail.com>
 * @description Routes talk
 */

const express = require('express');
const socket = require('../app');

const router = express.Router();

const { models } = require('../models');
const auth = require('../middleware/auth');

router.post('/talk', auth, async (req, res) => {
  const { contact, message } = req.body;
  const { id } = req.tokenJwt;

  try {
    const talk = await models.Talk.create({
      user: id,
      contact,
      message,
    });

    socket.sendMessage(talk.id, talk.message);

    return res.status(200).json({
      message: 'OK',
      data: talk,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error',
      data: e.message,
    });
  }
});

router.get('/talk', auth, async (req, res) => {
  const { contact } = req.query;
  const { id } = req.tokenJwt;
  try {
    const listTalk = await models.Talk.findAll({ where: { user: id, contact } });

    return res.status(200).json({
      message: 'OK',
      data: listTalk,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error',
      data: e.message,
    });
  }
});

module.exports = router;
