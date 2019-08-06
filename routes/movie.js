const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

router.get('/', (req, res, next) => {
  const promise = Movie.find({});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

// top 10 list
router.get('/top10', (req, res, next) => {
  const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});


router.get('/:movie_id', (req, res, next) => {
  //res.send(req.params); localhost:3000/api/movie/sfsasda yaptığımız zaman req.params ile sfsasda yı alabiliyoruz. 
  const promise = Movie.findById(req.params.movie_id);
  promise.then((movie) => {
    if (!movie) {
      next({ message: 'The movie was not found || veya 24 harfli bir sayı giriniz!!', code: 1 });
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.put('/:movie_id', (req, res, next) => {
  //res.send(req.params); localhost:3000/api/movie/sfsasda yaptığımız zaman req.params ile sfsasda yı alabiliyoruz. 
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, { new: true });
  promise.then((movie) => {
    if (!movie) {
      next({ message: 'The movie was not found || veya 24 harfli bir sayı giriniz!!', code: 1 });
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.delete('/:movie_id', (req, res, next) => {
  //res.send(req.params); localhost:3000/api/movie/sfsasda yaptığımız zaman req.params ile sfsasda yı alabiliyoruz. 
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie) => {
    if (!movie) {
      next({ message: 'The movie was not found || veya 24 harfli bir sayı giriniz!!', code: 1 });
    }
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.post('/', (req, res, next) => {
  const movie = new Movie(req.body);
  const promise = movie.save();
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
//Between
router.get('/between/:start_year/:end_year', (req, res, next) => {
  const { start_year,end_year } = req.params;
  const promise = Movie.find(
    { //$gte büyük ya da eşit demek. $lte küçük ya da eşit
      year:{"$gte":parseInt(start_year),"$lte": parseInt(end_year)}
    }
  );
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});
module.exports = router;