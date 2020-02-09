let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp)

describe('Testing my rest endd point', () => {
    it('Should test / endpoint', (done) =>{
        chai
            .request('http://localhost:7800')
            .get('/')
            .then((res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch((err) => {
                throw err
            })
    })
    it('Should test /user endpoint', (done) =>{
        chai
            .request('http://localhost:7800')
            .get('/user')
            .then((res) => {
                expect(res).to.have.status(200)
                done()
            })
            .catch((err) => {
                throw err
            })
    })

    it('should inset data', (done) => {
        chai
        .request('http://localhost:7800')
        .post('/addUser')
        .send({'name':'Henry', 'city':'Paris'})
        .then((res) => {
            expect(res).to.have.status(200)
            done()
        })
    })

})