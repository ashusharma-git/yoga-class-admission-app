const Applicant = require("../models/applicant");
const makePayment = require("./makePayment");
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
  })
    .then(async (applicant) => {
      const applicantBatch = await applicant.createBatch({ time: shift });
      return {
        applicant: applicant.dataValues,
        batch: applicantBatch.dataValues,
      };
    })
    .then(async (application) => {
      // console.log(application);
      const paymentStatus = await makePayment(application.applicant.id);
      if (paymentStatus) {
        // console.log("\n\n REGISTERED SUCCESSFULLY");
      }
      return {
        name: application.applicant.name,
        batch: application.batch.time,
      };
    })
    .then((applicant) => {
      res.render("regResponse", {
        name: applicant.name,
        shift: applicant.batch,
      });
    })
    .catch((err) => {
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
