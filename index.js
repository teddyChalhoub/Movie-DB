let express = require("express");
let movies = require("./route/movies");
let login = require("./route/users-router");
const mongoose = require("mongoose");
let app = express();

mongoose
  .connect(
    "mongodb+srv://teddy92:teddy123456@moviedb.osvwi.mongodb.net/movies",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    app.get("/", (req, res) => {
      res.send("ok");
    });

    app.get("/test", (req, res) => {
      let resObject = { status: 200, message: "ok" };

      res.send(resObject);
    });

    app.get("/time", (req, res) => {
      let date = new Date();
      let time = date.getHours() + ":" + date.getMinutes();
      let resTime = { status: 200, message: time };
      res.send(resTime);
    });

    app.get("/hello/:id(\\d+)", (req, res) => {
      let resUserID = { status: 200, message: `hello ${req.params.id}` };
      res.send(resUserID);
    });

    app.get("/search", (req, res) => {
      const search = req.query.s;
      let resUserID;

      if (search != "") {
        resUserID = { status: 200, message: "ok", data: search };
      } else {
        resUserID = {
          status: 500,
          error: true,
          message: "you have to provide a search",
        };
      }

      res.send(resUserID);
    });
    app.use(express.json());
    app.use("/movies", movies);
    app.use("/login", login);

    app.listen(3000);
  })
  .catch(() => {
    console.log("database connection failed");
  });
