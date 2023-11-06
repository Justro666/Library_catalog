const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  cors = require("cors");
const fileUpload = require("express-fileupload");
const corsOptions = require("./app/config/corsOptions");
const { logger, logEvents } = require("./app/access/middleware/logger");
const errorHandler = require("./app/access/middleware/errorHandler");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./app/access/middleware/verifyAdJWT");
require("dotenv").config();
app.use(logger);

//Cors Options for securitys
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`);

app.use("/auth", require("./app/router/auth_route.js"));
app.use(verifyJWT);
app.use("/books", require("./app/router/book_route.js"));
app.use("/bookCatalogue", require("./app/router/bookCatalogue_route.js"));
app.use("/bookCategories", require("./app/router/bookCategories_route.js"));
app.use("/authors", require("./app/router/author_route.js"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});

mongoose.connection.on("error", err => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
