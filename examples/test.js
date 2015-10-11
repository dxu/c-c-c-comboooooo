
(() => console.log('hello'))();
$(function(){
  addCombinationEventListener($('#test')[0], function(result){
    console.log('result', result)
  })
})
