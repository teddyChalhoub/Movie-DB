let express = require("express");

let router = express.Router();

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
];

router.use("/", (req, res, next) => {
  console.log("entered");
  next();
});

router.get("/read", (req, res, next) => {
  let moviesArrayObj = { status: 200, data: movies };
  res.send(moviesArrayObj);
});

router.get("/read/by-date", (req, res, next) => {
  movies.sort(function (a, b) {
    var dateA = a.year;
    var dateB = b.year;
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  });

  let byDateObj = { status: 200, data: movies };

  res.send(byDateObj);
});

router.get("/read/by-rating", (req, res, next) => {
  movies.sort(function (a, b) {
    var dateA = a.rating;
    var dateB = b.rating;
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  });

  let byDateObj = { status: 200, data: movies };

  res.send(byDateObj);
});

router.get("/read/by-title", (req, res, next) => {
  movies.sort(function (a, b) {
    var dateA = a.title;
    var dateB = b.title;
    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  });

  let byDateObj = { status: 200, data: movies };

  res.send(byDateObj);
});

router.get("/create", (req, res, next) => {
  res.send("movies create");
});

router.get("/update", (req, res, next) => {
  res.send("movies update");
});

router.get("/delete", (req, res, next) => {
  res.send("movies delete");
});

module.exports = router;
