const express = require("express");

const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");

const logs = require("../api/logs");

const app = express();

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "Hey Fam"
  });
});

app.use("/api/logs", logs);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening at http://localhost${port}`);
});
