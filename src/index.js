import {ComboStack} from './ComboStack'
/*
 * addCombinationEventListener - given a dom element, fire an event when the
 * [key, key, [combination of keys], key]
 * key, key, combo1 + combo2 + combo3 + combo4, key
 *
 * the event
 */

const INTERVAL = 500;

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
        interval = window.setTimeout(newCombinationInterval, INTERVAL)
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
  //
  // HOWEVER, if you do D (hold), E, E, E, it should be D,E,E,E
  // HOWEVER, if you do A (hold) D + E, Lift D+E, E, E, E - can't just check last
  //
  // we need to check it just strictly based on interval.
  //
  el.addEventListener('keyup', evt => {
    var partialCombo;
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
      partialCombo = currentCombination.pull(keyupStack.contents)
      if (partialCombo.length) {
        partialCombo.length > 1 ?
          stack.push(partialCombo) : stack.concat(partialCombo)
      }
    })
  })
}
