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

  it('should be able to remove a single value from an empty ComboStack without modifying the array or erroring', function (done) {
    var combo, pulledResult
    combo = new ComboStack()
    pulledResult = combo.pull('1')
    combo.contents.length.should.equal(0)
    done();
  });

  it('should be able to remove a single value from a ComboStack with one value and return an array with that one value', function (done) {
    var combo, pulledResult
    combo = new ComboStack()
    combo.push('1')
    pulledResult = combo.pull('1')
    combo.contents.length.should.equal(0)
    pulledResult.should.deep.equal(['1'])
    done();
  });

  it('should be able to remove a single value from a ComboStack with multiple values and return an array with that one value', function (done) {
    var combo, pulledResult
    combo = new ComboStack()
    combo.push('1')
    combo.push(1)
    pulledResult = combo.pull(1)
    combo.contents.should.deep.equal(['1'])
    combo.contents.length.should.equal(1)
    pulledResult.should.deep.equal([1])
    done();
  });

  it('should be able to remove an array of multiple values in any order from a ComboStack with multiple values and return an array with those values', function (done) {
    var combo, pulledResult
    combo = new ComboStack()
    combo.push('1')
    combo.push(1)
    combo.push('2')
    combo.push(2)
    combo.push('3')
    combo.push(3)
    pulledResult = combo.pull([3, '2'])
    combo.contents.should.deep.equal(['1', 1, 2, '3'])
    combo.contents.length.should.equal(4)
    // is it necessary to be in the same order?!
    pulledResult.should.deep.equal([3, '2'])
    done();
  });

});
