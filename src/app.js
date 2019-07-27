/**
 * @author Matheus Paice <matheus.ferreira@gmail.com.br>
 * @description Arquivo de configuração das tecnologias utilziadas..
 */

const express = require('express');

const app = express();
const cors = require('cors');
const bodyParse = require('body-parser');
const morgan = require('morgan');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { sequelize } = require('./models');

const userRoutes = require('./routes/user');
const contactRoutes = require('./routes/contact');
const talkRoutes = require('./routes/talk');

const port = 3333;

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  }),
);

app.use(morgan('dev'));
app.use(bodyParse.json());

app.use(userRoutes);
app.use(contactRoutes);
app.use(talkRoutes);

io.on('connect', (socket) => {
  console.log(socket.id);
});

exports.sendMessage = (message) => {
  io.emit('sendMessage', message);
};

server.listen(port, () => console.log('Server online in port: ', port));

sequelize.sync().then(() => {
  // eslint-disable-next-line
    console.log('Sequelize online');
});
