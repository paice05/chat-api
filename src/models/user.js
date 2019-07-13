/**
 * @author Matheus Paice <matheus.ferreira@jbtec.com.br>
 * @description Model user
 */

module.exports = (Sequelize, DataType) => {
  const User = Sequelize.define(
    'User',
    {
      // id: {
      //   type: Sequelize.INTEGER,
      //   primaryKey: true,
      //   autoIncrement: true,
      // },
      firstName: {
        type: DataType.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Empty firstName',
          },
        },
      },
      lastName: {
        type: DataType.TEXT,
      },
      email: {
        type: DataType.TEXT,
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: {
            msg: 'Empty email',
          },
        },
      },
      password: {
        type: DataType.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Empty password',
          },
        },
      },
    },
    {
      timestamps: true,
    },
  );

  return User;
};
