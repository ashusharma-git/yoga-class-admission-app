const Sequelize = require("sequelize");
const sequelize = require("../util/sequelize_conf");

const Batch = sequelize.define(
  "batch",
  {
    time: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    has_changed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: false }
);

module.exports = Batch;
