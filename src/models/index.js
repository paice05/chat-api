const Sequelize = require('sequelize');

const User = require('./user');
const Contact = require('./contact');

/**
 * Inicialização da conexão com o banco de dados.
 */
const sequelize = new Sequelize('tododb', 'user1', 'changeme', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 10000,
  },
  retry: {
    max: 30,
  },
  operatorsAliases: false,
});

sequelize
  .authenticate()
  .then(() => {
    // eslint-disable-next-line
        console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    // eslint-disable-next-line
        console.error('Unable to connect to the database:', err);
  });

/**
 * Schemas de dados e suas relações
 */
const models = {
  User: User(sequelize, Sequelize),
  Contact: Contact(sequelize, Sequelize),
};

/**
 * Executa o mapping de associações de cada um dos models (schemas)
 */
Object.keys(models).forEach(key => models[key].associate && models[key].associate(models));

module.exports = {
  sequelize,
  models,
};
