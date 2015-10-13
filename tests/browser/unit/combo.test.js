describe('ComboStack test suite', function () {
  var fixtureInputElement
    , QUICK_INTERVAL = 50 // used to simulate "holding down"
    , SLOW_INTERVAL = 150 // used to simulate a quick individual keypress
    , SEPARATE_INTERVAL = 250 // used to simulate a slow individual keypress
                              // (separate from the previous keypress)
    , KEYCODE_A = 65
    , KEYCODE_B = 66
    , KEYCODE_C = 67
    , KEYCODE_D = 68


  function _generateKeyEvent(element, keyCode, eventName) {
    // KeyboardEvent apparently not supported in phantomjs.
    var e = document.createEvent('Event')
    e.keyCode = keyCode
    e.initEvent(eventName, {
      bubbles: true,
      cancelable: true
    })
    element.dispatchEvent(e)
  }

  function _generateKeyDownUpEvent(element, keyCode) {
    _generateKeyEvent(fixtureInputElement, keyCode, 'keydown')
    window.setTimeout(
      _generateKeyEvent.bind(this, fixtureInputElement, keyCode, 'keyup')
    , QUICK_INTERVAL)
  }

  // execute a keydown after timeout
  Object.prototype._keyDown = function _keyDown(element, keyCode, timeout) {
    timeout = timeout || 0
    return new Promise(function(resolve, reject) {
      window.setTimeout(function() {
        _generateKeyEvent(element, keyCode, 'keydown')
        resolve()
      }, timeout)
    })
  }

  // execute an immediate keyup
  Object.prototype._keyUp = function _keyUp(element, keyCode, timeout) {
    timeout = timeout || 0
    return new Promise(function(resolve, reject) {
      window.setTimeout(function() {
        _generateKeyEvent(element, keyCode, 'keyup')
        resolve()
      }, timeout
      )
    })
  }

  // execute an immediate keyDownUp
  function _keyDownUp(element, keyCode, timeout) {
    timeout = timeout || 0
    console.log(timeout)
    return new Promise(function(resolve, reject) {
      window.setTimeout(function() {
        _generateKeyDownUpEvent(element, keyCode, 'keyup')
        resolve()
      }, timeout)
    })
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
      result.should.deep.equal([KEYCODE_A])
      done()
    })
    _keyDownUp(fixtureInputElement, KEYCODE_A)
  })


});
