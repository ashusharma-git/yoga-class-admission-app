const Sequelize = require("sequelize");
const sequelize = require("../util/sequelize_conf");

const Payment = sequelize.define(
  "payment",
  {
    payment_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    currency: {
      type: Sequelize.STRING,
      defaultValue: "INR",
    },
    amount: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "pending",
    },
    txn_id: {
      type: Sequelize.STRING,
    },
    txn_date: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
  },
  { timestamps: false }
);

module.exports = Payment;
