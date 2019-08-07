const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);
let token, movieId;
describe('/api/movie tests', () => {
    //token alma işlemi
    before((done) => {
        chai.request(server).post('/token')
        .send({ username: 'fakooo', password: '05011998' })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    describe('/GET movies', () => {
        it('it should Get all the movies',(done)=>{
            chai.request(server).get('/api/movie').set('x-access-token',token).end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
        });
    });

    describe('/POST movie', ()=>{
        it('it should POST a movie',(done)=>{
            const movie = {
                title: 'udemy',
                director_id: '5d4977eebb76f724d47b0c83',
                category: 'Komedi',
                country: 'Türkiye',
                year: 1950,
                imdb_score: 8
            }
           chai.request(server).post('/api/movie').send(movie).set('x-access-token',token).end((err,res)=>{
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('title');
               res.body.should.have.property('director_id');
               res.body.should.have.property('category');
               res.body.should.have.property('country');
               res.body.should.have.property('year');
               res.body.should.have.property('imdb_score');
               movieId = res.body._id;
               done();
           });         
        });
    });

    describe('/GET/:director_id movie',()=>{
        it('it should GET a movie by the given id',(done)=>{
            chai.request(server).get('/api/movie/'+ movieId)
            .set('x-access-token', token).end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
               res.body.should.have.property('director_id');
               res.body.should.have.property('category');
               res.body.should.have.property('country');
               res.body.should.have.property('year');
               res.body.should.have.property('imdb_score');
               res.body.should.have.property('_id').eql(movieId);
               done();
            });
        });
    });

    describe('/PUT:director:id movie', ()=>{
        it('it should UPDATE a movie given by id',(done)=>{
            const movie = {
                title: '93creative',
                director_id: '5d4977eebb76f724d47b0c81',
                category: 'Suç',
                country: 'Fransa',
                year: 1970,
                imdb_score: 9
            }
           chai.request(server).put('/api/movie/'+movieId).send(movie).set('x-access-token',token).end((err,res)=>{
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('title').eql(movie.title);
               res.body.should.have.property('director_id').eql(movie.director_id);
               res.body.should.have.property('category').eql(movie.category);
               res.body.should.have.property('country').eql(movie.country);
               res.body.should.have.property('year').eql(movie.year);
               res.body.should.have.property('imdb_score').eql(movie.imdb_score);
               
               done();
           });         
        });
    });
});


