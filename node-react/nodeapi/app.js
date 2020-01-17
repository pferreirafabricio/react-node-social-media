const express = require("express");
const app = express();

//Bring in routes
const postRoutes = require("./routes/post.js");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");

const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const fs = require("fs");
const cors = require("cors");

// Load .env variables
const dotenv = require("dotenv");
dotenv.config()

//DB Csonnection
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('DB Connected'));

//If the connection failed
mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
});

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.get("/", (req, res) => {
  fs.readFile("./docs/apiDocs.json", (err, data) => {
    if (err) {
      res.status(400).json({
        error: err
      });
    }

    const docs = JSON.parse(data);
    res.json(docs);

  });
});

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError")
    res.status(401).json({ error: "Unauthorized token!" });
})

const port = 8080;
app.listen(port, () => {
  console.log(`A Node.js API is listening on port ${port}`);
});