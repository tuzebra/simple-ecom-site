export const once = (fn: ()=>void) => {
  let hasBeenCalled = false

  return function () {
    if(hasBeenCalled)return
    hasBeenCalled = true
    fn.apply(null)
  }
}