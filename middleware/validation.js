const nameRegex = /^[a-zA-Z ]{2,20}$/;
const mobileRegex = /^\d{6,10}$/;
const emailRegex = new RegExp(
  /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
  "gm"
);

module.exports = async (req, res, next) => {
  const { name, age, mobile, email } = req.body;
  let msg = "";
  if (!nameRegex.test(name)) {
    msg += "NAME";
  }
  if (!mobileRegex.test(mobile)) {
    if (msg.length > 0) msg += ", ";
    msg += "MOBILE";
  }
  if (!email.match(emailRegex)) {
    if (msg.length > 0) msg += ", ";
    msg += "EMAIL";
  }

  if (msg.length > 0) {
    msg = "Invalid: " + msg;
    res.render("errorResponse", {
      message1: msg,
      message2: "Please try with valid input.",
    });
    return;
  } else {
    next();
  }
};
