const mongoose = require('mongoose');
module.exports = () => {
    mongoose.connect('mongodb://movie_user:abcd1234@ds241493.mlab.com:41493/heroku_k13jn0wf', { useNewUrlParser: true });
    mongoose.connection.on('open',()=>{
        console.log('mongoDB: connected');
    });
    mongoose.connection.on('error', (err)=>{
        console.log('failed');
    });

    mongoose.Promise = global.Promise;
}