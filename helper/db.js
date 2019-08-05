const mongoose = require('mongoose');
module.exports = () => {
    mongoose.connect('mongodb://movie_user:abcd1234@ds259377.mlab.com:59377/heroku_tt45qm9w', { useNewUrlParser: true });
    mongoose.connection.on('open',()=>{
        console.log('mongoDB: connected');
    });
    mongoose.connection.on('error', (err)=>{
        console.log('failed');
    });
}