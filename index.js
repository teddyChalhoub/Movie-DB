let express = require("express");
let movies = require("./route/movies");

let app = express();

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
  let search = req.query.s;
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

app.use("/movies",movies);

app.listen(3000);
