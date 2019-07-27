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

    socket.sendMessage(talk.message);

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

router.get('/talk/:contact', auth, async (req, res) => {
  const { contact } = req.params;
  const { id } = req.tokenJwt;
  try {
    const listTalk = await models.Talk.findAll({ where: { user: id, contact } });
    const listTalkContact = await models.Talk.findAll({ where: { user: contact, contact: id } });

    const dataListTalk = listTalk.map(v => ({
      data: v,
      side: 'send',
    }));

    const dataListTalkContact = listTalkContact.map(v => ({
      data: v,
      side: 'receive',
    }));

    const data = [...dataListTalk, ...dataListTalkContact];

    for (let i = 0; i < data.length; i += 1) {
      for (let j = i + 1; j < data.length; j += 1) {
        if (data[j].data.createdAt < data[i].data.createdAt) {
          const aux = data[j];
          data[j] = data[i];
          data[i] = aux;
        }
      }
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
