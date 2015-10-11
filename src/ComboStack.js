export function ComboStack() {
    this.contents = []
}

ComboStack.prototype.push = function(value) {
  // pushes item to stack
  this.contents.push(value)
}

// values is an array
// pull will return the values that were successfully pulled
ComboStack.prototype.pull = function(values, returnUnsuccessful=false) {
  if (typeof values === 'undefined' || values === null) {
    // you want to return anempty removed array, but a clone of the contents
    // for the leftover array
    return [];
  }
  var index, valuesArray;
  var leftover = []
    , removed = []
    , values = Object.prototype.toString.call(values) === '[object Array]' ?
        values : [values]

  // can't use buckets because associative arrays don't support integer keys
  // for every value, check for the last index of the key in the contents
  // have to iterate up because values
  for (var i=0; i < values.length; i++) {

    if((index = this.contents.lastIndexOf(values[i])) !== -1 ) {
      // if in contents, remove and add it
      removed = removed.concat(this.contents.splice(index, 1))
    } else {
      // if not in contents, just push it to the leftovers
      leftover.push(values[i])
    }
  }

  return returnUnsuccessful ? leftover : removed;
}

ComboStack.prototype.isEmpty = function() {
  return this.contents.length === 0;
}

// recursive method used to check the last item of an array
ComboStack._peek = function(arr) {
  lastItem = arr[arr.length - 1]
  if (Object.prototype.toString.call(lastItem) === '[object Array]') {
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

