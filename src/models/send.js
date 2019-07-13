/**
 * @author Matheus Paice <matheus.ferreira@jbtec.com.br>
 * @description Model enviar mensagem
 */

module.exports = (Sequelize, DataType) => {
  const Send = Sequelize.define(
    'Send',
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
      message: DataType.STRING,
    },
    {
      timestamps: true,
    },
  );

  return Send;
};
