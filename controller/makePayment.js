const Payment = require("../models/payment");
const Applicant = require("../models/applicant");

module.exports = async (req, res) => {
  const { id, amount, name, batch } = req.body;

  await new Promise(async (resolve, reject) => {
    try {
      const paymentStatus = await processPayment(id);
      if (paymentStatus) {
        setTimeout(() => {
          resolve(id);
        }, 4000);
      }
    } catch (error) {
      throw error;
    }
  }).then(async (id) => {
    await Applicant.update({ payment_status: "PAID" }, { where: { id } });
  }).then(() => {
    res.render("regResponse", {
      status: "PAYMENT SUCCESSFUL",
      name,
      batch,
    });
  }).catch((error) => {
    console.log(err, "\n----------error in payment process---------");
    res.render("errorResponse", {
      message1: "Payment Error.",
      message2: "Please try again later.",
    });
  });
};

const processPayment = async (applicant_id) => {
  try {
    console.log("processing payment");
    const txn_id = "txn_" + Math.floor(100000 + Math.random() * 900000);
    const applicantPayment = {
      amount: 500,
      status: "paid",
      txn_id,
      applicant_id,
    };
    result = await Payment.create(applicantPayment);
    if (result) return true;
  } catch (error) {
    throw error;
  }
};
