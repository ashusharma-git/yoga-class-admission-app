const Sequelize = require("sequelize");
const sequelize = require("../util/sequelize_conf");
const Shift = require("./batch");
const Payment = require("../models/payment");
const Batch = require("./batch");

const Applicant = sequelize.define(
  "applicant",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    mobile: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    reg_date: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    payment_status: {
      type: Sequelize.STRING,
      defaultValue: "NOT_PAID"
    }
  },
  { timestamps: false }
);

Applicant.hasOne(Batch, {
  foreignKey: {
    name: "applicant_id",
  },
});
Applicant.hasMany(Payment, {
  foreignKey: {
    name: "applicant_id",
  },
});

module.exports = Applicant;
