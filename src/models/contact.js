/**
 * @author Matheus Paice <matheus.ferreira@jbtec.com.br>
 * @description Model contact
 */

module.exports = (Sequelize, DataType) => {
  const Contact = Sequelize.define(
    'Contact',
    {
      //   id: {
      //     type: Sequelize.INTEGER,
      //     primaryKey: true,
      //     autoIncrement: true,
      //   },
      user: {
        type: DataType.INTEGER,
        // references: {
        //   model: User,
        //   key: 'id',
        // },
      },
      contact: {
        type: DataType.INTEGER,
        // references: {
        //   model: User,
        //   key: 'id',
        // },
      },
    },
    {
      timestamps: true,
    },
  );

  return Contact;
};
