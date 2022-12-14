require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 7777;
require("./util/db_conn")();
require("./util/monthly_cronjob");
const helmet = require("helmet");

const validation = require("./middleware/validation");
const home = require("./controller/home");
const register = require("./controller/register");
const batchChangeForm = require("./controller/batchChangeForm");
const findApplication = require("./controller/findApplication");
const batchChange = require("./controller/batchChange");
const makePayment = require("./controller/makePayment");
const paymentForm = require("./controller/paymentForm");

const sequelize = require("./util/sequelize_conf");

sequelize
  .sync()
  .then(() => {
    console.log("database synced");
  })
  .catch((error) => {
    console.log(
      error,
      "\n---------- ERROR IN DATABASE CONNECTIVITY ----------"
    );
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(helmet());

app.get("/", home);
app.post("/register", validation, register);
app.get("/shift-change", batchChangeForm);
app.post("/find-application", findApplication);
app.post("/shift-change", batchChange);
app.get("/payment", paymentForm);
app.post("/make-payment", makePayment);

app.listen(PORT, () => {
  console.log("server running on PORT: ", PORT);
});
