const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');

chai.use(chaiHttp);

describe('Node server', () => {
    //her describe içinde birden fazla it olabilir. it ler içerisinde istediğimiz unit testini yapabiliriz.
    it('(GET /) anasayfayı döndürür', (done) => {
        chai.request(server).get('/').end((err, res) => {
            res.should.have.status(200);
            done();
        })
    });
});
