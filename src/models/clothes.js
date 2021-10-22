'use strict';

const Clothes = (sequelize, DataTypes) => sequelize.define('Clothes', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.ENUM('s','m','l','xl'),
    allowNull: true,
  },
  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Clothes;