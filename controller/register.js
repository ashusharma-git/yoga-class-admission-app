const Applicant = require("../models/applicant");
module.exports = async (req, res) => {
  const { name, gender, age, mobile, email, shift } = req.body;

  const newApplicant = {
    name: name.toUpperCase(),
    gender: gender.toUpperCase(),
    age,
    mobile,
    email,
  };

  await new Promise(async (resolve, reject) => {
    try {
      const applicant = await Applicant.create(newApplicant);
      resolve(applicant);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError")
        reject("SequelizeUniqueConstraintError");
    }
  }).then(async (applicant) => {
    const applicantBatch = await applicant.createBatch({ time: shift });
    return {
      id: applicant.dataValues.id,
      name: applicant.dataValues.name,
      batch: applicantBatch.dataValues.time,
    };
  }).then((applicant) => {
    res.render("payment", {
      id: applicant.id,
      name: applicant.name,
      batch: applicant.batch,
      amount: 500,
    });
  }).catch((err) => {
    if (err === "SequelizeUniqueConstraintError") {
      res.render("errorResponse", {
        message1:
          "It seems you are already registered with this mobile or email.",
        message2:
          "If you are registering for someone else, please ask him/her to register with their own mobile and email.",
      });
      return;
    }
    console.log(err, "\n----------error in db transaction---------");
    res.render("errorResponse", {
      message1: "Server Error.",
      message2: "Please try again later.",
    });
  });
};
