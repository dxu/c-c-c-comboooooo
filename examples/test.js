
// (() => console.log('hello'))();
// $(function(){
//   cccombo.setupCombinationEventListener($('#test')[0], function(result){
//     console.log('result', result, this)
//   }, function(partialCombo) {
//     console.log('partialCombo', partialCombo, this)
//   }, function(currentCombo) {
//     console.log('currentCombo', currentCombo, this)
//   })
// })

(() => console.log('hello'))();
$(function(){
  var element = $('#test')[0]
  cccombo.setupCombinationEventListener(element, function(result){
    console.log('result', result)
  })
  cccombo.onPartialCombinationEvent(element, function(partialCombo) {
    console.log('partialCombo', partialCombo, this)
  })
  cccombo.onCurrentCombinationEvent(element, function(currentCombo) {
    console.log('currentCombo', currentCombo, this)
  })
})
