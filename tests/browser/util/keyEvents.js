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
  return new Promise(function(resolve, reject) {
    window.setTimeout(function() {
      _generateKeyDownUpEvent(element, keyCode, 'keyup')
      resolve()
    }, timeout)
  })
}



