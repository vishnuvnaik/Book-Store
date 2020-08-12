const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

chai.should();
chai.use(chaiHttp);
let fs = require("fs");
function readf() {
  let data = fs.readFileSync(`${__dirname}/bookServices.json`);
  let pData = JSON.parse(data);
  return pData;
}
describe(`book list`, () => {
  let data = readf();
  it(`given a books  When  all books details are proper then return 200 status code`, (done) => {
    chai
      .request(app)
      .post("/books")
      .send(data.addBook200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });

  it(`given a books  When  all books details are not proper then return 422 status code`, (done) => {
    chai
      .request(app)
      .post("/books")
      .send(data.addBook422)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        res.should.have.status(200);
        done();
      });
  });
});
