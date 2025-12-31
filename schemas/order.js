const { DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
const { sequelize } = require('../database/sequelizeConnection');

const Order = sequelize.define(
  'Order', 
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    timestamps: false,
    tableName: 'orders',
  }
);

module.exports = Order;

