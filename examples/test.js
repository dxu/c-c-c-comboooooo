
(() => console.log('hello'))();
$(function(){
  addCombinationEventListener($('#test')[0], function(result){
    console.log('result', result)
  }, function(partialCombo) {
    console.log('partialCombo', partialCombo)
  })
})
