export function ComboStack() {
    this.contents = []
}

ComboStack.prototype.push = function(value) {
  // pushes item to stack
  this.contents.push(value)
}

// values is an array
ComboStack.prototype.pull = function(values) {
  var index, valuesArray;
  var returnArray = []
  // search for values and pull it out of the stack, and also pull it out of
  // values
  // SEARCH STARTING FROM END - THE MOST RECENT ONE FIRST
  // convert values
  valuesArray = Object.prototype.toString.call(values) === '[object Array]' ?
    values : [values]

  // if it's multiple values, then you should return an array.

  // if it's a single value you still return an array.
  for(var i=this.contents.length; i--;) {
    if (index = valuesArray.indexOf(this.contents[i]) !== -1) {
      returnArray = returnArray.concat(this.contents.splice(i, 1))
      // remove it from the valuesArray as well so you don't remove duplicates
      valuesArray.splice(index, 1)
    }
  }
  return returnArray;
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

