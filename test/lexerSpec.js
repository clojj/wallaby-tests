'use strict';

let expect = require('expect');
let lexer = require('../lib/lexer');

let fs = require('fs');
var Promise = require("bluebird");
Promise.promisifyAll(fs);

let Q = require('q');

describe('lexer', () => {

  var result;

  it('should indent', done => {

    fs.readFile('/Users/jwin/JavascriptProjects/wallaby-tests/test/test-expected.hs', 'utf8', function (err, expected) {
      if (err) throw err;

      fs.readFile('/Users/jwin/JavascriptProjects/wallaby-tests/test/test.hs', 'utf8', function (err, data) {
        if (err)
          throw err;

        console.log(data);
        lexer.doLex(data, function(result) {
          console.log('RESULT: ' + result);
          expect(result).toBe(expected);
          done();
        });
      });
    });
  });

  it('BLUEBIRD: should indent', done => {
    var expected;
    fs.readFileAsync('/Users/jwin/JavascriptProjects/wallaby-tests/test/test-expected.hs', 'utf8')
      .then( data => {
        expected = data;
        return fs.readFileAsync('/Users/jwin/JavascriptProjects/wallaby-tests/test/test.hs', 'utf8');
      })
      .then( input => {

          lexer.doLex(input, function(result) {
            console.log('RESULT: ' + result);
            expect(result).toBe(expected);
            done();
          });
      });
  });

  it('Q: should indent', done => {
    var expected;
    Q.nfcall(fs.readFile, "/Users/jwin/JavascriptProjects/wallaby-tests/test/test-expected.hs", "utf-8")
      .then( data => {
        expected = data;
        return Q.nfcall(fs.readFile, "/Users/jwin/JavascriptProjects/wallaby-tests/test/test.hs", "utf-8");
      })
      .then( input => {
        return lexer.doLexQ(input);
      })
      .then( function(result) {
        console.log('RESULT: ' + result);
        expect(result).toBe(expected);
        done();
      });
  });

});
