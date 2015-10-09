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
  var index, valuesArray;
  // search for values and pull it out of the stack, and also pull it out of
  // values
  // SEARCH STARTING FROM END - THE MOST RECENT ONE FIRST
  // convert values
  valuesArray = typeof values === 'Array' ? values : [values]

  // if it's multiple values, then you should return an array.
  // if it's a single value, you should return a single value.
  for(var i=this.contents.length; i--;) {
    if (index = values.indexOf(this.contents[i])) {
      returnArray.push(values.splice(index, 1))

    }
  }
  return returnArray
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

//
// You should only be able to have a maximum depth of 2 - anytime you lift your
// finger you are incurring another "step". only when all your fingers have been
// lifted should the countdown timer start. The keup interval determines
// whether or not your combination was merged together
function addCombinationEventListener(el, callback) {
  let stack = new ComboStack()
    , currentCombination = new ComboStack()
    , interval
    , keyupInterval
    , keyupStack = new ComboStack();

  el.addEventListener('c-c-c-combooo', (evt) => {
    callback(evt.detail)
  });

  // checks your keydown event. if after INTERVAL amount of time, there are no
  // more keypresses, and there is nothing in the current combination, then
  // you're done with the combination
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
      // otherwise we continue trying to detect
      } else {
        interval = window.setTimeout(newCombination, INTERVAL)
      }
    }, INTERVAL);
  })

  // checks your keyup. Each time you keyup, you want to check the keyup
  // interval. if the keyup interval hasn't cleared yet, that means if you
  // do more keyups, they should count as "held down together". if the keyup
  // interval has cleared, you should push the keyup onto the stack, and
  // remove it from the current combination.
  //
  // edge case: very quickly press down, lift up, and then press down again
  // solution: keydown should somehow detect and remove the keyup and push it
  // onto the stack - BUT IS IT AN EDGE CASE???????? in the case of two different
  // keys, for example D, + E, LIFT D, LIFT E, maybe it SHOULD be considered D + E
  // HOWEVER if you do D, + E, LIFT E, PRESS E QUICKLY< LIFT E, then it should be considered D, E, E, E
  // HOWEVER, if you do D, +E, LIFT E, LIFT D, then it should be considered D + E
  // however, this should probably be handled already...
  el.addEventListener('keyup', evt => {
    // immediately push it to the stack if the most recent keydown was the same keyup,
    // because that means that they pressed the button and released
    // if (currentCombination.peek() === evt.keyCode) {
    //   stack.push(currentCombination.pull(evt.keyCode))
      // FIXME: SHOULD NOT DO THIS BECAUSE MAYBE IF YOU LIFT THE OTHERS REAL QUICK IT SHOULD BE ONE TOGETHER

    // }
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


