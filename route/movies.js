let express = require("express");
const { findById } = require("../models/movies-model");
const moviesModel = require("../models/movies-model");
const verify = require("./verifyToken");

let router = express.Router();


router.use("/",verify, (req, res, next) => {
  next();
});

router.get("/read",verify, (req, res, next) => {
  moviesModel.find((err, response) => {
    if (err) res.send(err);
    else res.send({ status: 200, data: response });
  });
});

router.get("/read/by-date",verify, (req, res, next) => {
  moviesModel.find((err, response) => {
    if (err) res.send(err);
    else res.send({ status: 200, data: response });
  }).sort({"year":1});;
});

router.get("/read/by-rating",verify, (req, res, next) => {
  moviesModel.find((err, response) => {
    if (err) res.send(err);
    else res.send({ status: 200, data: response });
  }).sort({"rating":1});;
});

router.get("/read/by-title",verify, (req, res, next) => {
  moviesModel.find((err, response) => {
    if (err) res.send(err);
    else res.send({ status: 200, data: response });
  }).sort({"title":1});
});

router.get("/read/id/:id(\\d+)",verify, (req, res, next) => {
  moviesModel.findById(req.params.id, (err, response) => {
    if (response !== null) {
      if (err) res.send(err);
      else res.send({ status: 200, data: response });
    } else {
      res.send({
        status: 404,
        error: true,
        message: `the movie ${req.params.id} does not exist`,
      });
    }
  });
});

router.post("/add",verify, (req, res, next) => {
  let newMovie = new moviesModel({
    title: req.body.title,
    year: req.body.year,
    rating: req.body.rating,
  });

  newMovie.save((err, newMovie) => {
    if (err) res.send(err);
    else res.send({ status: 200, data: newMovie });
  });
});

router.delete("/delete/:id(\\d+)",verify, (req, res, next) => {
  moviesModel.findByIdAndDelete(req.params.id, (err, response) => {
    if (response !== null) {
      if (err) res.send(err);
      else res.send({ status: 200, data: response });
    } else {
      res.send({
        status: 404,
        error: true,
        message: `the movie ${req.params.id} does not exist`,
      });
    }
  });
});

router.put("/update/:id(\\d+)",verify, (req, res, next) => {
  let title = req.body.title;
  let year = req.body.year;
  let rating = req.body.rating;

  let updateobjt;

  fetchDataById(req.params.id, async function (err, moviesValue) {
    if (err) {
      res.send(err);
    } else {
      updateobjt = await moviesValue;

      if (title === undefined || title === "") {
        title = updateobjt.title;
      }

      if (year === undefined || year === "") {
        year = updateobjt.year;
      }

      if (rating === undefined || rating === "") {
        rating = updateobjt.rating;
      }

      moviesModel.findByIdAndUpdate(
        req.params.id,
        {
          title: title,
          year: year,
          rating: rating,
        },
        { new: true },
        (err, response) => {
          if (response !== null) {
            if (err) res.send(err);
            else res.send({ status: 200, data: response });
          } else {
            res.send({
              status: 404,
              error: true,
              message: `the movie ${req.params.id} does not exist`,
            });
          }
        }
      );
    }
  });
});

function fetchDataById(id, callback) {
  moviesModel.findById(id, function (err, response) {
    if (err) callback(err, null);
    else callback(null, response);
  });
}

module.exports = router;
