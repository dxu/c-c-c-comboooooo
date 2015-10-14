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
  Object.prototype._keyDownUp = function _keyDownUp(element, keyCode, timeout) {
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

  it('should fire a single keypress when you make the same keypress more than one time in a row very quickly', function (done) {
    addCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([KEYCODE_A])
      done()
    })
    _keyDown(fixtureInputElement, KEYCODE_A)
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
  })

  it('should pass keypresses of 2 different keys together', function (done) {
    addCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([[KEYCODE_A, KEYCODE_B]])
      done()
    })
    _keyDown(fixtureInputElement, KEYCODE_A)
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_B))
  })

  it('should pass 2 single keypresses of the same letter within the same combination', function(done) {
    addCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([KEYCODE_A, KEYCODE_A])
      done()
    })
    _keyDown(fixtureInputElement, KEYCODE_A)
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
  })

  it('should pass 2 spaced single keypresses of the same letter with separate combination', function(done) {
    addCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([KEYCODE_A, KEYCODE_A])
      done()
    })
    _keyDown(fixtureInputElement, KEYCODE_A)
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
  })

  it('should pass a keypress of two letters A & B, and then multiple single keypresses of button A and button B', function(done) {
    addCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([[KEYCODE_A, KEYCODE_B], KEYCODE_B, KEYCODE_A, KEYCODE_B])
      done()
    })
    _keyDown(fixtureInputElement, KEYCODE_A)
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_B, SLOW_INTERVAL))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_B, SLOW_INTERVAL))
  })

  it('should pass multiple single keypresses of button A and button B, and then a keypress of two letters A & B', function(done) {
    addCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([KEYCODE_B, KEYCODE_A, KEYCODE_B, [KEYCODE_A, KEYCODE_B]])
      done()
    })
    _keyDownUp(fixtureInputElement, KEYCODE_B)
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_B, SLOW_INTERVAL))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_B))
  })

  it('should pass multiple spaced simultaneous A & B keypresses', function(done) {
    addCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([[KEYCODE_A, KEYCODE_B], [KEYCODE_A, KEYCODE_B], [KEYCODE_A, KEYCODE_B], [KEYCODE_A, KEYCODE_B]])
      done()
    })
    _keyDown(fixtureInputElement, KEYCODE_A)
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_B))
  })

  it('should pass if you just hold A down for a really long time, while continuing to press B, and lifting A at the end', function(done) {
    addCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([KEYCODE_B, KEYCODE_B, KEYCODE_B, KEYCODE_B, KEYCODE_B, KEYCODE_A])
      done()
    })
    _keyDown(fixtureInputElement, KEYCODE_A)
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_B, SLOW_INTERVAL))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_B, SLOW_INTERVAL))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_B, SLOW_INTERVAL))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_B, SLOW_INTERVAL))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A, SEPARATE_INTERVAL))
  })

  it('should pass complex combinations of multiple and single keypresses', function(done) {
    addCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([[KEYCODE_A, KEYCODE_B, KEYCODE_C], [KEYCODE_A, KEYCODE_B, KEYCODE_C, KEYCODE_D], [KEYCODE_A, KEYCODE_B], KEYCODE_A, KEYCODE_A])
      done()
    })
    _keyDownUp(fixtureInputElement, KEYCODE_A)
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_C))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_C))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_D))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyDownUp.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
  })

});
