// Test partial combinations
describe('Partial Event Listeners', function () {
  var fixtureInputElement

  beforeEach(function(done) {
    fixtureInputElement = document.createElement('input')
    done()
  })

  it('should pass an empty test', function (done) {
    done();
  });

  it('should pass single keypresses', function (done) {

    window.cccombo.setupCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([KEYCODE_A])
      done()
    })
    _keyDownUp(fixtureInputElement, KEYCODE_A)
  })

  it('should fire a single keypress when you make the same keypress more than one time in a row very quickly', function (done) {
    window.cccombo.setupCombinationEventListener(fixtureInputElement, function(result) {
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
    window.cccombo.setupCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([[KEYCODE_A, KEYCODE_B]])
      done()
    })
    _keyDown(fixtureInputElement, KEYCODE_A)
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_B))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_B))
  })

  it('should pass 2 single keypresses of the same letter within the same combination', function(done) {
    window.cccombo.setupCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([KEYCODE_A, KEYCODE_A])
      done()
    })
    _keyDown(fixtureInputElement, KEYCODE_A)
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
  })

  it('should pass 2 spaced single keypresses of the same letter with separate combination', function(done) {
    window.cccombo.setupCombinationEventListener(fixtureInputElement, function(result) {
      result.should.deep.equal([KEYCODE_A, KEYCODE_A])
      done()
    })
    _keyDown(fixtureInputElement, KEYCODE_A)
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
      .then(_keyDown.bind(null, fixtureInputElement, KEYCODE_A, SLOW_INTERVAL))
      .then(_keyUp.bind(null, fixtureInputElement, KEYCODE_A))
  })

  it('should pass a keypress of two letters A & B, and then multiple single keypresses of button A and button B', function(done) {
    window.cccombo.setupCombinationEventListener(fixtureInputElement, function(result) {
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
    window.cccombo.setupCombinationEventListener(fixtureInputElement, function(result) {
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
    window.cccombo.setupCombinationEventListener(fixtureInputElement, function(result) {
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
    window.cccombo.setupCombinationEventListener(fixtureInputElement, function(result) {
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
    window.cccombo.setupCombinationEventListener(fixtureInputElement, function(result) {
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
