const express = require('express');
const router = express.Router();

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const { username, password } = req.body;

  bcryptjs.hash(password, 10).then(hash => {
    const user = new User({
      username,
      password : hash
    });

    const promise = user.save();
    promise.then(data => {
      res.json(data);
    }).catch(err => {
      res.json(err);
    });
  });
});

router.post('/token', (req, res) => {
  const { username, password } = req.body;
  User.findOne({username: username},(err,user)=>{
    if (err) {
      throw err;
    }
    if (!user) {
      res.json({
        status: false,
        message: 'Authenticate failed, user not found.'
      });
    }else{
      bcryptjs.compare(password, user.password).then((result)=>{
        if (!result) {
          res.json({
            status: false,
            message: 'Authenticate failed, wrong password.'
          });
        }else{
          const payload = {
            username : username
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'),{
            expiresIn: 720 // 12 saat e denk geliyor
          });
          res.json({
            status:true,
            token
          });
        }
      });
    }
  });
});

module.exports = router;
