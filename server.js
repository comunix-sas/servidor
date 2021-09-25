require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const myconn = require("express-myconnection");
const cors = require("cors");
const routes = require("./routes");

const app = express();
app.set("port", process.env.PORT || 9000);
const dbOptions = {
  host: process.env.HOST_BD,
  port: process.env.PORT,
  user: process.env.USER_BD,
  password: process.env.CLAVE_BD,
  database: process.env.DATA_BASE,
};

// middlewares -------------------------------------
app.use(myconn(mysql, dbOptions, "single"));
app.use(express.json());
app.use(cors());

// routes -------------------------------------------
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});
app.use("/", routes);

// server running -----------------------------------
app.listen(app.get("port"), () => {
  console.log("server running on port", app.get("port"));
});
