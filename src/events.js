import {ComboStack} from './ComboStack'
import {constants} from './constants'
/*
 * setupCombinationEventListener - given a dom element, fire an event when the
 * [key, key, [combination of keys], key]
 * key, key, combo1 + combo2 + combo3 + combo4, key
 *
 * the event
 */

// any shorter and clicking 'a' repeatedly will cause a combination of [a,a,a,a]
const INTERVAL = 100

function dispatchComboEvent(el, name, data) {
  let event = new CustomEvent(name, {
    detail: data
  })
  el.dispatchEvent(event)
}

// You should only be able to have a maximum depth of 2 - anytime you lift your
// finger you are incurring another "step". only when all your fingers have been
// lifted should the countdown timer start. The keup interval determines
// whether or not your combination was merged together
function setupCombinationEventListener(el, callback, partialCallback, currentCallback) {
  let stack = new ComboStack()
    , currentlyHeldKeys = {}  // for preventing multiple keydowns from firing
    , currentCombination = new ComboStack()
    , keypressInterval
    , keyupInterval
    , keyupStack = new ComboStack();

  // checks your keydown event. if after INTERVAL amount of time, there are no
  // more keypresses, and there is nothing in the current combination, then
  // you're done with the combination
  el.addEventListener('keydown', (evt) => {
    // check if currently being held - return if so
    if (currentlyHeldKeys[evt.keyCode]) {
      return
    } else {
      currentlyHeldKeys[evt.keyCode] = true
    }

    // each time you trigger a keydown, reset the keypressInterval,
    window.clearTimeout(keypressInterval);
    currentCombination.push(evt.keyCode)

    // trigger an update to the current combination
    if (currentCallback !== null && typeof currentCallback !== 'undefined') {
      currentCallback(currentCombination.contents)
    } else {
      dispatchComboEvent(el, constants.CURRENT_EVENT_NAME,
                         currentCombination.contents)
    }

    keypressInterval = window.setTimeout(function newCombinationInterval() {
      // check if the currentCombination is empty. if it is, then end. If not,
      // reset keypressInterval
      if (currentCombination.isEmpty()) {
        //
        callback(stack.contents)
        // reset the stack for the future
        stack = new ComboStack()
      // otherwise we continue trying to detect
      } else {
        keypressInterval = window.setTimeout(newCombinationInterval, INTERVAL)
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
    // release this key in the map
    currentlyHeldKeys[evt.keyCode] = false
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
        // if the partial combination is a single
        partialCombo.length > 1 ?
          stack.push(partialCombo) : stack.push(partialCombo[0]) // TODO: Should i push a ComboStack? because this is a combination of items
        // TODO: should execute partial callback
        if (partialCallback !== null && typeof partialCallback !== 'undefined') {
          partialCallback(partialCombo)
        } else {
          dispatchComboEvent(el, constants.PARTIAL_EVENT_NAME,
                             partialCombo)
        }
      }
      // empty the keyupStack
      keyupStack.empty()
    }, INTERVAL)
  })
}

// on the partial combination event, fire the callback
function onPartialCombinationEvent(el, callback) {
  console.log('wjeofijwef')
  el.addEventListener(constants.PARTIAL_EVENT_NAME, callback.bind(null, evt.detail))
}

// on the partial combination event, fire the callback
function onCurrentCombinationEvent(el, callback) {
  console.log('oifjweofikpf')
  el.addEventListener(constants.CURRENT_EVENT_NAME, callback.bind(null, evt.detail))
}

export {setupCombinationEventListener, onPartialCombinationEvent,
  onCurrentCombinationEvent}
