/**
 * @author Matheus Paice <matheus.ferreira@gmail.com>
 * @description Routes user
 */

const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const { models } = require('../models');

router.get('/user', async (req, res) => {
  try {
    const user = await models.User.findAll();

    return res.status(200).json({
      message: 'OK',
      data: user,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error',
      data: e.message,
    });
  }
});

router.post('/user', async (req, res) => {
  const {
    firstName, lastName, email, password,
  } = req.body;

  try {
    const user = await models.User.create({
      firstName,
      lastName,
      email,
      password,
    });

    return res.status(200).json({
      message: 'OK',
      data: user,
    });
  } catch (e) {
    return res.status(500).json({
      message: 'Error',
      data: e.message,
    });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await models.User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(500).json({
        message: 'Error',
        data: 'User not found',
      });
    }

    return jwt.sign(
      {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      'saponaovoa',
      { expiresIn: '1h' },
      (error, token) => res.status(200).json({
        message: 'OK',
        token,
        data: user,
      }),
    );
  } catch (e) {
    return res.status(500).json({
      message: 'Error',
      data: e.message,
    });
  }
});

module.exports = router;
