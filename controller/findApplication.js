const Applicant = require("../models/applicant");
const Batch = require("../models/batch");

module.exports = async (req, res) => {
  const { mobile, email, action } = req.body;

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
      if (result.length == 0) {
        reject("USER_NOT_FOUND");
        return;
      }
      return {
        id: result[0].dataValues.id,
        name: result[0].dataValues.name,
        batch: result[0].dataValues.batch.time,
        payment_status: result[0].dataValues.payment_status,
      };
    })
    .then((applicant) => {
      if (action === "PAYMENT") {
        if (applicant.payment_status === "NOT_PAID") {
          res.render("payment", {
            id: applicant.id,
            name: applicant.name,
            batch: applicant.batch,
            amount: 500,
          });
          return;
        }
        res.render("regResponse", {
          status: "NO DUE PAYMENT FOR THIS MONTH",
          name: applicant.name,
          batch: applicant.batch,
        });
        return;
      }
      if (applicant.payment_status === "NOT_PAID") {
        res.render("errorResponse", {
          message1: "Fee Payment Due this month.",
          message2: "Please pay fee then you can proceed to change batch.",
        });
      }
      res.render("batchChangeForm", {
        mobile,
        email,
        name: applicant.name,
        batch: applicant.batch,
      });
    }).catch((err) => {
      console.log(err);
    });
  }).catch((error) => {
    if (error == "USER_NOT_FOUND") {
      res.render("errorResponse", {
        message1: "You haven't registered yet.",
        message2: "Please register to join Yoga session.",
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
