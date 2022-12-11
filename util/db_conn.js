const mysql = require("mysql");

const database = process.env.DB_NAME;

module.exports = async function () {
  const dbConn = mysql.createConnection({
    host: process.env.LIVE_DB_HOST,
    user: process.env.LIVE_DB_USER,
    password: process.env.LIVE_DB_PASS,
  });
  dbConn.connect((error) => {
    if (error) {
      console.log(
        error,
        "\n---------- ERROR IN DATABASE CONNECTIVITY ----------"
      );
      return;
    }
    console.log("DATABASE CONNECTED");
  });
};
