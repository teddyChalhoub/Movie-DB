let express = require("express");

let router = express.Router();

const movies = [
  { title: "Jaws", year: 1975, rating: 8 },
  { title: "Avatar", year: 2009, rating: 7.8 },
  { title: "Brazil", year: 1985, rating: 8 },
  { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2 },
];

router.use("/", (req, res, next) => {
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

router.get("/read/id/:id(\\d+)", (req, res, next) => {
  let userByIdObj = [];

  if (
    movies.length >= parseInt(req.params.id) &&
    parseInt(req.params.id) !== 0
  ) {
    userByIdObj = { status: 200, data: movies[req.params.id - 1] };
  } else {
    userByIdObj = {
      status: 404,
      error: true,
      message: `the movie ${req.params.id} does not exist`,
    };
  }

  res.send(userByIdObj);
});

router.get("/add", (req, res, next) => {
  const title = req.query.title;
  const year = req.query.year;
  const rating = req.query.rating;

  let isYearDigitsFour = /^[1-9]\d{3}$/.test(year);

  let ansObjt;

  if (title !== "" && year !== "" && isYearDigitsFour) {
    if (rating !== undefined && rating !== "") {
      movies.push({ title: title, year: year, rating: rating });
      ansObjt = { status: 200, data: movies };
    } else {
      movies.push({ title: title, year: year, rating: 4 });
      ansObjt = { status: 200, data: movies };
    }
  } else {
    ansObjt = {
      status: 403,
      error: true,
      message: "you cannot create a movie without providing a title and a year",
    };
  }

  res.send(ansObjt);
});

router.get("/delete/:id(\\d+)", (req, res, next) => {
  let index = req.params.id - 1;
  let deletedObjt;

  if (movies.length >= req.params.id) {
    movies.splice(index, 1);
    deletedObjt = { status: 200, data: movies };
  } else {
    deletedObjt = {
      status: 404,
      error: true,
      message: `the movie ${req.params.id} does not exist`,
    };
  }

  res.send(deletedObjt);
});

router.get("/create", (req, res, next) => {
  res.send("movies create");
});

router.get("/update", (req, res, next) => {
  res.send("movies update");
});

// router.get("/delete", (req, res, next) => {
//   res.send("movies delete");
// });

module.exports = router;
