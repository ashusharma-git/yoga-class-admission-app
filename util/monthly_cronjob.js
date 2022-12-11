const cron = require("node-cron");
const Batch = require("../models/batch");
console.log("monthly cronjob");
cron.schedule("0 0 1 * *", function () {
  // to reset `has_change` column in batch so that every month applicants can be elegible to change their batch 
  Batch.update({ has_changed: 0 }, { where: {} })
    .then((result) => {
      console.log(result);
      console.log("monthly cronjob");
    })
    .catch((err) => {
      console.log(err);
    });
});
