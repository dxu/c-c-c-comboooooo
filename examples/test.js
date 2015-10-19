
(() => console.log('hello'))();
$(function(){
  var element = $('#test')[0]
  cccombo.setupCombinationEventListener(element, function(result){
    console.log('result', result)
  })
  cccombo.onPartialCombinationEvent(element, function(partialCombo) {
    console.log('partialCombo', partialCombo)
  })
  cccombo.onCurrentCombinationEvent(element, function(currentCombo) {
    console.log('currentCombo', currentCombo)
  })

})
