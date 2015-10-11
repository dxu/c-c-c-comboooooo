import { ComboStack } from './src/ComboStack'
var chai = require('chai')
chai.should()

describe('ComboStack test suite', function () {
  it('should pass an empty test', function (done) {
    done();
  });

  it('should be able to create an empty ComboStack', function (done) {
    var combo = new ComboStack()
    combo.contents.should.be.empty
    done();
  });

  it('should contain one value after pushing one value', function (done) {
    var combo = new ComboStack()
    combo.push('1')
    combo.contents.length.should.equal(1)
    combo.contents[0].should.equal('1')
    done();
  });

  it('should contain two values after pushing two of the same value', function (done) {
    var combo = new ComboStack()
    combo.push('1')
    combo.push('1')
    combo.contents.length.should.equal(2)
    combo.contents[0].should.equal('1')
    combo.contents[1].should.equal('1')
    done();
  });

  it('should contain two values after pushing two different values', function (done) {
    var combo = new ComboStack()
    combo.push('1')
    combo.push(1)
    combo.contents.length.should.equal(2)
    combo.contents[0].should.equal('1')
    combo.contents[1].should.equal(1)
    done();
  });

  it('should be able to remove a single value and return an array', function (done) {
    var combo, pulledResult
    combo = new ComboStack()
    combo.push('1')
    combo.push(1)
    pulledResult = combo.pull(1)
    combo.contents.length.should.equal(1)
    result.should.equal([1])
    done();
  });

});
