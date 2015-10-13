describe('ComboStack test suite', function () {
  var fixtureInputElement
    , QUICK_INTERVAL = 50 // used to simulate "holding down"
    , SLOW_INTERVAL = 150 // used to simulate a quick individual keypress

  function generateKeyEvent(element, keyCode, eventName) {
    // KeyboardEvent apparently not supported in phantomjs.
    var e = document.createEvent('Event')
    e.keyCode = keyCode
    e.initEvent(eventName, {
      bubbles: true,
      cancelable: true
    })
    element.dispatchEvent(e)
  }

  function generateKeyboardDownUp(element, keyCode) {
    generateKeyEvent(fixtureInputElement, keyCode, 'keydown')
    generateKeyEvent(fixtureInputElement, keyCode, 'keyup')
  }

  beforeEach(function(done) {
    fixtureInputElement = document.createElement('input')
    done()
  })

  it('should pass an empty test', function (done) {
    done();
  });

  it('should pass single keypresses', function (done) {

    addCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([1])
      done()
    })
    generateKeyboardDownUp(fixtureInputElement, 1)
  })

  it('should pass multiple, spaced, single keypresses', function (done) {
    addCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([[1, 1]])
      done()
    })
    generateKeyboardDownUp(fixtureInputElement, 1)

    window.setTimeout(function() {
    })
    generateKeyboardDownUp(fixtureInputElement, 1)
  })

});
