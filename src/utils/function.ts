// this file contains some useful function utilities


//////////////////////// FUNCTIONS ////////////////////////

/**
 * Take a function and return a new function that can only be called once.
 * @param fn - The function to be executed.
 * @returns A new function that can only be called once.
 */
export const once = (fn: ()=>void) => {
  let hasBeenCalled = false;

  return function () {
    if(hasBeenCalled)return;
    hasBeenCalled = true;
    fn.apply(null);
  }
}
