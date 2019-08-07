const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);
let token,directorId;

describe('api/director tests', ()=>{
    before((done)=>{
        chai.request(server).post('/token').send({username: 'fakooo',password: '05011998'}).end((err,res)=>{
            token = res.body.token;
            done();
        });
    });
    describe('/GET director',()=>{
        it('it Should get all the director',(done)=>{
            chai.request(server).get('/api/director').set('x-access-token',token).end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            })
        });
    });
    describe('/POST director',()=>{
        it('it should POST a director',(done)=>{
            const director = {
                name: 'Onur',
                surname: 'Kozu',
                bio:'şahane',
                year: 1998
            }
            chai.request(server).post('/api/director').send(director).set('x-access-token',token).end((err,res)=>{
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
    });
});