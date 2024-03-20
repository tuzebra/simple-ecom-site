// this file contains utilities functions for string manipulation


//////////////////////// FUNCTIONS ////////////////////////

/**
 * Generates a random string ID of the specified length.
 * @param length The length of the generated string ID. Default is 10.
 * @returns A random string ID.
 */
export const getRandomStringId = (length: number = 10): string => {
  return Math.random().toString(36).substring(2).slice(0, length);
}
