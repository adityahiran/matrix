import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { app as server } from '../app.js';
import * as messages from '../util/messages.js';

chai.should();

chai.use(chaiHttp);

describe('server test', () => {
  describe('/POST echo', () => {
    it('it returns file contents', (done) => {
      chai
        .request(server)
        .post('/echo')
        .attach('file', './example/matrix.csv')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('1,2,3\n4,5,6\n7,8,9\n');
          done();
        });
    });

    it('it expects square matrix', (done) => {
      chai
        .request(server)
        .post('/echo')
        .attach('file', './example/400_not_square.csv')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.invalidArgument);
          done();
        });
    });

    it('it expects all integers', (done) => {
      chai
        .request(server)
        .post('/echo')
        .attach('file', './example/400_string.csv')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.invalidArgument);
          done();
        });
    });

    it('it accepts negative integers', (done) => {
      chai
        .request(server)
        .post('/echo')
        .attach('file', './example/negative_integers.csv')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('-1,-2,-3\n-4,-5,-6\n-7,8,9\n');
          done();
        });
    });

    it('it returns errors when size exceeds max MATRIX_SIZE', (done) => {
      chai
        .request(server)
        .post('/echo')
        .attach('file', './example/400_max_matrix_size.csv')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.invalidArgument);
          done();
        });
    });

    it('it returns errors when file size exceeds MAX_FILE_SIZE', (done) => {
      chai
        .request(server)
        .post('/echo')
        .attach('file', './example/400_file_size.csv')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.fileTooBig);
          done();
        });
    });

    it('it returns errors when file does not contain integers', (done) => {
      chai
        .request(server)
        .post('/echo')
        .attach('file', './example/img.jpg')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.invalidArgument);
          done();
        });
    });
  });

  describe('/POST invert', () => {
    it('it returns inverted matrix', (done) => {
      chai
        .request(server)
        .post('/invert')
        .attach('file', './example/matrix.csv')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('1,4,7\n2,5,8\n3,6,9\n');
          done();
        });
    });

    it('it expects square matrix', (done) => {
      chai
        .request(server)
        .post('/invert')
        .attach('file', './example/400_not_square.csv')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.invalidArgument);
          done();
        });
    });

    it('it expects all integers', (done) => {
      chai
        .request(server)
        .post('/invert')
        .attach('file', './example/400_float.csv')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.invalidArgument);
          done();
        });
    });

    it('it accepts negative integers', (done) => {
      chai
        .request(server)
        .post('/invert')
        .attach('file', './example/negative_integers.csv')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('-1,-4,-7\n-2,-5,8\n-3,-6,9\n');
          done();
        });
    });
  });

  describe('/POST flatten', () => {
    it('it returns flatten values', (done) => {
      chai
        .request(server)
        .post('/flatten')
        .attach('file', './example/matrix.csv')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('1,2,3,4,5,6,7,8,9');
          done();
        });
    });

    it('it expects square matrix', (done) => {
      chai
        .request(server)
        .post('/flatten')
        .attach('file', './example/400_not_square.csv')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.invalidArgument);
          done();
        });
    });

    it('it expects all integers', (done) => {
      chai
        .request(server)
        .post('/flatten')
        .attach('file', './example/400_float.csv')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.invalidArgument);
          done();
        });
    });

    it('it accepts negative integers', (done) => {
      chai
        .request(server)
        .post('/flatten')
        .attach('file', './example/negative_integers.csv')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('-1,-2,-3,-4,-5,-6,-7,8,9');
          done();
        });
    });
  });

  describe('/POST sum', () => {
    it('it returns matrix sum', (done) => {
      chai
        .request(server)
        .post('/sum')
        .attach('file', './example/matrix.csv')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('45');
          done();
        });
    });

    it('it expects square matrix', (done) => {
      chai
        .request(server)
        .post('/sum')
        .attach('file', './example/400_not_square.csv')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.invalidArgument);
          done();
        });
    });

    it('it expects all integers', (done) => {
      chai
        .request(server)
        .post('/sum')
        .attach('file', './example/400_string.csv')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.invalidArgument);
          done();
        });
    });

    it('it accepts negative integers', (done) => {
      chai
        .request(server)
        .post('/sum')
        .attach('file', './example/negative_integers.csv')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('-11');
          done();
        });
    });

    it('it returns error for max integers', (done) => {
      chai
        .request(server)
        .post('/sum')
        .attach('file', './example/422_max_integer.csv')
        .end((err, res) => {
          res.should.have.status(422);
          res.text.should.be.eql(messages.outOfBound);
          done();
        });
    });
  });

  describe('/POST multiply', () => {
    it('it returns matrix multiplication', (done) => {
      chai
        .request(server)
        .post('/multiply')
        .attach('file', './example/matrix.csv')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('362880');
          done();
        });
    });

    it('it expects square matrix', (done) => {
      chai
        .request(server)
        .post('/multiply')
        .attach('file', './example/400_not_square.csv')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.invalidArgument);
          done();
        });
    });

    it('it expects all integers', (done) => {
      chai
        .request(server)
        .post('/multiply')
        .attach('file', './example/400_float.csv')
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eql(messages.invalidArgument);
          done();
        });
    });

    it('it accepts negative integers', (done) => {
      chai
        .request(server)
        .post('/multiply')
        .attach('file', './example/negative_integers.csv')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.be.eql('-362880');
          done();
        });
    });

    it('it returns error for max integers', (done) => {
      chai
        .request(server)
        .post('/multiply')
        .attach('file', './example/422_max_integer.csv')
        .end((err, res) => {
          res.should.have.status(422);
          res.text.should.be.eql(messages.outOfBound);
          done();
        });
    });
  });
});
