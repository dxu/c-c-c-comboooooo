import { ComboStack } from './src/ComboStack'
var chai = require('chai')
chai.should()

describe('ComboStack test suite', function () {
  var fixtureMultipleStack
    , fixtureDoubleStack
    , fixtureSingleStack
    , fixtureEmptyStack;

  beforeEach(function(done) {
    fixtureMultipleStack = new ComboStack()
    fixtureDoubleStack = new ComboStack()
    fixtureSingleStack = new ComboStack()
    fixtureEmptyStack = new ComboStack()

    fixtureSingleStack.push('1')

    fixtureDoubleStack.push('1')
    fixtureDoubleStack.push(1)

    fixtureMultipleStack.push('1')
    fixtureMultipleStack.push(1)
    fixtureMultipleStack.push('2')
    fixtureMultipleStack.push(2)
    fixtureMultipleStack.push('3')
    fixtureMultipleStack.push(3)

    done()
  })

  it('should pass an empty test', function (done) {
    done();
  });

  /* Empty ComboStack */

  it('should be able to create an empty ComboStack', function (done) {
    fixtureEmptyStack.contents.should.be.empty
    done();
  });

  /* Pushing Values */

  it('should contain one value after pushing one value', function (done) {
    fixtureSingleStack.contents.length.should.equal(1)
    fixtureSingleStack.contents[0].should.equal('1')
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
    fixtureDoubleStack.contents.length.should.equal(2)
    fixtureDoubleStack.contents[0].should.equal('1')
    fixtureDoubleStack.contents[1].should.equal(1)
    done();
  });

  /* Pulling Existing Values */

  it('should be able to remove a single value from a ComboStack with one value and return an array with that one value', function (done) {
    var pulledResult = fixtureSingleStack.pull('1')
    fixtureEmptyStack.contents.should.be.empty
    pulledResult.should.deep.equal(['1'])
    done();
  });

  it('should be able to remove a single value from a ComboStack with multiple values and return an array with that one value', function (done) {
    var pulledResult = fixtureDoubleStack.pull(1)
    fixtureDoubleStack.contents.should.deep.equal(['1'])
    fixtureDoubleStack.contents.length.should.equal(1)
    pulledResult.should.deep.equal([1])
    done();
  });

  it('should be able to remove a single value as an array from a ComboStack with multiple values and return an array with that one value', function (done) {
    var pulledResult = fixtureDoubleStack.pull([1])
    fixtureDoubleStack.contents.should.deep.equal(['1'])
    fixtureDoubleStack.contents.length.should.equal(1)
    pulledResult.should.deep.equal([1])
    done();
  });

  it('should be able to remove an array of multiple values in any order from a ComboStack with multiple values and return an array with those values', function (done) {
    var pulledResult = fixtureMultipleStack.pull([3, '2'])
    fixtureMultipleStack.contents.should.deep.equal(['1', 1, 2, '3'])
    fixtureMultipleStack.contents.length.should.equal(4)
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal([3, '2'])
    done();
  });

  it('should be able to pull everything', function (done) {
    var pulledResult = fixtureMultipleStack.pull(['1', 1, '2', 2, '3', 3])
    fixtureMultipleStack.contents.should.be.empty
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal(['1', 1, '2', 2, '3', 3])
    done();
  });

  it('should be able to pull more than there is available', function (done) {
    var pulledResult = fixtureMultipleStack.pull(['1', 1, '2', 2, '3', 3, '4', 4])
    fixtureMultipleStack.contents.should.be.empty
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal(['1', 1, '2', 2, '3', 3])
    done();
  });

  /* Pull Non-existant Values */

  it('should be able to remove a single value from an empty ComboStack without modifying the array or erroring', function (done) {
    var pulledResult = fixtureEmptyStack.pull('1')
    fixtureEmptyStack.contents.should.be.empty
    done();
  });

  it('should be able to try to remove an empty array passed in without erroring', function (done) {
    var pulledResult = fixtureMultipleStack.pull([])
    fixtureMultipleStack.contents.should.deep.equal(['1', 1, '2', 2, '3', 3])
    fixtureMultipleStack.contents.length.should.equal(6)
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal([])
    done();
  });

  it('should be able to try to remove undefined without erroring', function (done) {
    var pulledResult = fixtureMultipleStack.pull(undefined)
    fixtureMultipleStack.contents.should.deep.equal(['1', 1, '2', 2, '3', 3])
    fixtureMultipleStack.contents.length.should.equal(6)
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal([])
    done();
  });

  it('should be able to try to remove a single value that does not exist', function (done) {
    var pulledResult = fixtureMultipleStack.pull(4)
    fixtureMultipleStack.contents.should.deep.equal(['1', 1, '2', 2, '3', 3])
    fixtureMultipleStack.contents.length.should.equal(6)
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal([])
    done();
  });

  it('should be able to try to remove a single value passed as an array that does not exist', function (done) {
    var pulledResult = fixtureMultipleStack.pull([4])
    fixtureMultipleStack.contents.should.deep.equal(['1', 1, '2', 2, '3', 3])
    fixtureMultipleStack.contents.length.should.equal(6)
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal([])
    done();
  });

  /* Getting Leftovers (returnUnsuccessful = true) */

  it('should be able to get the leftovers of trying to remove a single value passed as an array that does not exist', function (done) {
    var pulledResult = fixtureMultipleStack.pull([4], true)
    fixtureMultipleStack.contents.should.deep.equal(['1', 1, '2', 2, '3', 3])
    fixtureMultipleStack.contents.length.should.equal(6)
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal([4])
    done();
  });

  it('should be able to get the leftovers of trying to remove a single value that does not exist', function (done) {
    var pulledResult = fixtureMultipleStack.pull(4, true)
    fixtureMultipleStack.contents.should.deep.equal(['1', 1, '2', 2, '3', 3])
    fixtureMultipleStack.contents.length.should.equal(6)
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal([4])
    done();
  });

  it('should be able to get the leftovers of trying to remove multiple values that do exist', function (done) {
    var pulledResult = fixtureMultipleStack.pull([1, 2], true)
    fixtureMultipleStack.contents.should.deep.equal(['1', '2', '3', 3])
    fixtureMultipleStack.contents.length.should.equal(4)
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal([])
    done();
  });

  it('should be able to get the leftovers of trying to remove a mix of multiple values that do and do not exist', function (done) {
    var pulledResult = fixtureMultipleStack.pull([1, 4], true)
    fixtureMultipleStack.contents.should.deep.equal(['1', '2', 2, '3', 3])
    fixtureMultipleStack.contents.length.should.equal(5)
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal([4])
    done();
  });

  it('should be able to get the leftovers of trying to remove everything', function (done) {
    var pulledResult = fixtureMultipleStack.pull(['1', 1, '2', 2, '3', 3], true)
    fixtureMultipleStack.contents.should.be.empty
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal([])
    done();
  });

  it('should be able to get the leftovers after pulling more than there is available', function (done) {
    var pulledResult = fixtureMultipleStack.pull(['1', 1, '2', 2, '3', 3, '4', 4], true)
    fixtureMultipleStack.contents.should.be.empty
    // TODO/THINK: should it be necessary to be in the same order?!
    pulledResult.should.deep.equal(['4', 4])
    done();
  });

  /* Peeking */

  it('should be able to peek at the last item in a combostack with non-combostack values', function (){
    fixtureMultipleStack.peek().should.equal(3)
    fixtureMultipleStack.push(7)
    fixtureMultipleStack.peek().should.equal(7)
  })

  // TODO: ComboStack should be able to support non-primitive values.

  /* Emptying */

  it('should be able empty an empty ComboStack without erroring', function (done) {
    fixtureEmptyStack.empty()
    fixtureEmptyStack.contents.should.be.empty
    done();
  });

  it('should be able empty a filled ComboStack without erroring', function (done) {
    fixtureMultipleStack.contents.should.not.be.empty
    fixtureMultipleStack.empty()
    fixtureMultipleStack.contents.should.be.empty
    done();
  });

});
