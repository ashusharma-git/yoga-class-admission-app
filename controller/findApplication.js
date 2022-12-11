const Applicant = require("../models/applicant");
const Batch = require("../models/batch");

module.exports = async (req, res) => {
  const { mobile, email } = req.body;

  new Promise((resolve, reject) => {
    Applicant.findAll({
      where: { mobile, email },
      include: [
        {
          model: Batch,
          required: false,
        },
      ],
    })
      .then((result) => {
        if (result.length == 0) {
          reject("USER_NOT_FOUND");
          return;
        }
        const name = result[0].dataValues.name;
        const shift = result[0].dataValues.batch.time;
        res.render("applicationFound", { mobile, email, name, shift });
      })
      .catch((err) => {
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
