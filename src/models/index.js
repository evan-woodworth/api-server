'use strict';

require('dotenv').config();

const clothesModel = require('./clothes.js');
const foodModel = require('./food.js');

const options = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const { Sequelize, DataTypes } = require('sequelize');
let DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory';
const sequelize = new Sequelize(DATABASE_URL, options);

const clothesTable = clothesModel(sequelize, DataTypes);
const foodTable = foodModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  clothes: clothesTable,
  foods: foodTable,
};