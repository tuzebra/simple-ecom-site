/**
 * Pauses the execution for a specified amount of time.
 * @param ms - The number of milliseconds to wait. Default is 0.
 */
export const waitFor = async (ms = 0) => {
  await (new Promise((resolve) => {setTimeout(resolve, ms)}));
}
