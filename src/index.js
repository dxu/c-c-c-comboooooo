/*
 * addCombinationEventListener - given a dom element, fire an event when the
 * [key, key, [combination of keys], key]
 * key, key, combo1 + combo2 + combo3 + combo4, key
 *
 * the event
 */

const INTERVAL = 500;

ComboStack = function() {
  this.contents = []
}

ComboStack.prototype.push = function(value) {
  // pushes item to stack
  this.contents.push(value)
}

// values is an array
ComboStack.prototype.pull = function(values) {
  // search for values and pull it out of the stack

  // if it's multiple values, then you should return an array.
  // if it's a single value, you should return a single value.


  return []
}

ComboStack.prototype.isEmpty = function() {
  return this.contents.length === 0;
}

// recursive method used to check the last item of an array
ComboStack._peek = function(arr) {
  lastItem = arr[arr.length - 1]
  if (typeof lastItem === 'Array') {
    return ComboStack._peek(lastItem)
  } else {
    return lastItem
  }
}

// take a look at the deepest, most recent item that was pushed
ComboStack.prototype.peek = function() {
  return this.contents[this.contents.length - 1]
  // return ComboStack._peek(this.contents[this.contents.length - 1]);
}

ComboStack.prototype.empty = function() {
  this.contents = [];
}

function addCombinationEventListener(el, callback) {
  let stack = new ComboStack()
    , currentCombination = new ComboStack()
    , interval
    , keyupInterval
    , keyupStack = new ComboStack();

  el.addEventListener('c-c-c-combooo', (evt) => {
    callback(evt.detail)
  });

  el.addEventListener('keydown', (evt) => {
    // each time you trigger a keydown, reset the interval,
    window.clearTimeout(interval);
    currentCombination.push(evt.keyCode)

    interval = window.setTimeout(function newCombinationInterval() {
      // check if the currentCombination is empty. if it is, then end. If not,
      // reset interval
      if (currentCombination.isEmpty()) {
        //
        callback(stack.contents)
        // reset the stack for the future
        stack = new ComboStack()
      } else {
        interval = window.setTimeout(newCombination, INTERVAL)
      }
    }, INTERVAL);
  });

  el.addEventListener('keyup', evt => {
    // immediately push it to the stack if the most recent keydown was the same keyup,
    // because that means that they pressed the button and released
    if (currentCombination.peek() === evt.keyCode) {

    }
    window.clearTimeout(keyupInterval)
    // clear the exiting keyupInterval
    // when keyup, push to keyupStack.
    keyupStack.push(evt.keyCode)
    // Start a keyupInterval, that upon finishing, will pull everything from the currentCombination, and then
    // turn that into a stack and push that onto the overall stack.
    keyupInterval = window.setTimeout(function() {
      stack.push(currentCombination.pull(keyupStack.contents))
    })


  })

}


