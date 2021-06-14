let express = require("express");

let app = express();

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
];

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

app.get("/movies/read", (req, res) => {
  let moviesArrayObj = { status: 200, data: movies };
  res.send(moviesArrayObj);
});

app.get("/movies/create", (req, res) => {
  res.send("movies create");
});

app.get("/movies/update", (req, res) => {
  res.send("movies update");
});

app.get("/movies/delete", (req, res) => {
  res.send("movies delete");
});

app.listen(3000);
