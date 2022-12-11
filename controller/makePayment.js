const Payment = require("../models/payment");
const Applicant = require("../models/applicant");

module.exports = async (applicant_id) => {
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
