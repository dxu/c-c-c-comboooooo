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

ComboStack.prototype.pull = function(value) {
  // search for value and pull it out of the stack

}

ComboStack.prototype.isEmpty = function() {
  return this.contents.length === 0;
}

function addCombinationEventListener(el, callback) {
  let stack = new ComboStack()
    , currentCombination = new ComboStack()
    , interval;

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
      }
    }, INTERVAL);
  });

  el.addEventListener('keyup', evt => {

  })

}


