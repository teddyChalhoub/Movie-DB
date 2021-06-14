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

router.post("/add", (req, res, next) => {
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

router.delete("/delete/:id(\\d+)", (req, res, next) => {
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

router.put("/update/:id(\\d+)", (req, res, next) => {
  let title = req.query.title;
  let year = req.query.year;
  let rating = req.query.rating;

  let updatedObjt;
  let index = req.params.id - 1;
  let isYearDigitsFour = /^[1-9]\d{3}$/.test(year);

  if (movies.length >= req.params.id) {
    if (title === undefined || title === "") {
      console.log("title");
      title = movies[index].title;
    }

    if (year === undefined || year === "" || !isYearDigitsFour) {
      console.log("year");
      year = movies[index].year;
    }

    if (rating === undefined || rating === "") {
      console.log("rating");
      rating = movies[index].rating;
    }

    movies[index].title = title;
    movies[index].year = year;
    movies[index].rating = rating;

    updatedObjt = { status: 200, data: movies };
  } else {
    updatedObjt = {
      status: 404,
      error: true,
      message: `the movie ${req.params.id} does not exist`,
    };
  }

  res.send(updatedObjt);
});

router.post("/create", (req, res, next) => {
  res.send("movies create");
});

router.put("/update", (req, res, next) => {
  res.send("movies update");
});

router.delete("/delete", (req, res, next) => {
  res.send("movies delete");
});

module.exports = router;
