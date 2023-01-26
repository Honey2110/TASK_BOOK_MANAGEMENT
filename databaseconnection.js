const mongoose = require("mongoose");

function DbConnection() {
  const DB_URL = process.env.MONGO_URL;

  mongoose.set("strictQuery", false);
  mongoose.connect(DB_URL, () => {
    const db = mongoose.connection;
    db.on("error", function () { console.error.bind("Connection error : ") });
    db.once("open", function () { console.log("db Connnected...") });
    console.error("kyu nhi chal raha.")
  });
  

  // db.on("error", console.error.bind(console, "Connection error: "));
  // db.once("open", function () {
  //   console.log("Db connected...");
  // });
}

module.exports = DbConnection;