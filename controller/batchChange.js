const Applicant = require("../models/applicant");
const Batch = require("../models/batch");

module.exports = async (req, res) => {
  const { name, mobile, email, shift } = req.body;

  new Promise((resolve, reject) => {
    Applicant.findAll({
      where: { mobile, email },
      include: [
        {
          model: Batch,
          required: false,
        },
      ],
    }).then((result) => {
      const recentlyChanges = result[0].dataValues.batch.has_changed;
      const applicant_id = result[0].dataValues.batch.applicant_id;

      if (recentlyChanges == 1) {
        reject("ALREADY_CHANGED_THIS_MONTH");
      }
      Batch.update(
        { time: shift, has_changed: true },
        { where: { applicant_id } }
      )
        .then((result) => {
          resolve();
        })
        .catch((err) => {
          reject();
        });
    }).catch((err) => {
      console.log(err);
    });
  }).then(() => {
    res.render("batchChangeResponse", { name, shift });
  }).catch((error) => {
    if (error == "ALREADY_CHANGED_THIS_MONTH") {
      res.render("errorResponse", {
        message1: "You have changed shift recently.",
        message2: "Now you can change your shift next month.",
      });
      return;
    }
    console.log(error, "\n----------error in db transaction---------");
    res.render("errorResponse", {
      message1: "Server Error.",
      message2: "Please try again later.",
    });
  });
};
