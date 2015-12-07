'use strict';

var spawn = require('child_process').spawn;
var Q = require('q');

class Lexer {

  constructor() {
  }

  doLex(src, f) {
    var child = spawn('/Users/jwin/Library/Haskell/bin/hindent', ['--style', 'gibiansky']);
    child.stdout.setEncoding('utf8');
    child.stdin.write(src);
    child.stdin.end();
    child.stdout.on('data', f);
  }

  doLexQ(src) {
    var child = spawn('/Users/jwin/Library/Haskell/bin/hindent', ['--style', 'gibiansky']);
    child.stdout.setEncoding('utf8');
    child.stdin.write(src);
    child.stdin.end();

    var deferred = Q.defer();

    child.stdout.on('data', function(result) {
      deferred.resolve(result);
    });

    return deferred.promise;
  }

}

module.exports = new Lexer();
