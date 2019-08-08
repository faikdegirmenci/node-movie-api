const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);
let token, directorId;

describe('api/director tests', () => {
    before((done) => {
        chai.request(server).post('/token').send({ username: 'fakooo', password: '05011998' }).end((err, res) => {
            token = res.body.token;
            done();
        });
    });
    describe('/GET director', () => {
        it('it Should get all the director', (done) => {
            chai.request(server).get('/api/director').set('x-access-token', token).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
        });
    });
    describe('/POST director', () => {
        it('it should POST a director', (done) => {
            const director = {
                name: 'Onur',
                surname: 'Kozu',
                bio: 'şahane',
                year: 1997
            }
            chai.request(server).post('/api/director').send(director).set('x-access-token', token).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('surname');
                res.body.should.have.property('bio');
                res.body.should.have.property('year');
                directorId = res.body._id;
                done();
            });
        });
    });/*
    describe('/GET/:director_id director',()=>{
        it('it should GET a director by the given id', (done)=>{
            chai.request(server).get('/api/director/'+directorId).set('x-access-token',token).end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.property('Array[1].name');
                res.body.should.have.property('Array[1].surname');
                res.body.should.have.property('Array[1].bio');
                res.body.should.have.property('Array[1].year');
                //res.body.should.have.property('Array[4]').eql(directorId);
                done();
            });
        });
    });
    */
    describe('/PUT/:director_id', () => {
        it('it should UPDATE a director given by id', (done) => {
            const director = {
                name: 'Caner',
                surname: 'Kaçak',
                bio: 'güzeeeel',
                year: '1970-01-01T00:00:01.969Z'
            }
            chai.request(server).put('/api/director/' + directorId).send(director).set('x-access-token', token).end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql(director.name);
                res.body.should.have.property('surname').eql(director.surname);
                res.body.should.have.property('bio').eql(director.bio);
                res.body.should.have.property('year').eql(director.year);
                done();
            });
        })
    });

    describe('/DELETE/:director_id director',()=>{
        it('it should DELEETE a movie given by id',(done)=>{
            chai.request(server).delete('/api/director/'+directorId).set('x-access-token',token).end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(1);
                done();
            });
        });
    });
});