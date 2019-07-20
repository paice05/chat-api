/**
 * @author Matheus Paice <matheus.ferreira@jbtec.com.br>
 * @description Model conversas
 */

module.exports = (Sequelize, DataType) => {
  const Talk = Sequelize.define(
    'Talk',
    {
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
        //   model: Contact,
        //   key: 'id',
        // },
      },
      message: DataType.STRING,
    },
    {
      timestamps: true,
    },
  );

  return Talk;
};
