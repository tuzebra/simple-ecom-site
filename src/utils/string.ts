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

/**
 * Capitalizes the first letter of each word of a string.
 * For example, "hello world" will be converted to "Hello World".
 * For example, "hello-world" will be converted to "Hello World".
 * @param str The input string.
 * @returns The string with the first letter of each word capitalized.
 */
export const capitalizeWords = (str: string): string => {
  return str
    .replace(/-/g, ' ') // replace hyphens with spaces
    .split(' ') // split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // capitalize the first letter of each word
    .join(' '); // join the words back into a single string
}

/**
 * Formats a URL string by replacing placeholders with corresponding values from the params object.
 * @param str - The URL string with placeholders.
 * @param params - An object containing key-value pairs to replace the placeholders in the URL string.
 * @returns The formatted URL string.
 */
export const formatUrl = (str = '', params: {[key: string]: null|string|number|unknown[]}) => {
  let url = '' + str;
  if(typeof params === 'object') {
    Object.keys(params).forEach((key) => {
      const value = _formatUrl_fixValueToReplace(params[key]);
      if(value === null)return;
      url = url.replace(new RegExp(':' + key + '\\b', 'g'), value );
    });
  }

  return url;
}

/**
 * Matches a string against a template and extracts dynamic parts from the string.
 * @param str - The string to match against the template.
 * @param template - The template to match against.
 * @returns An object containing the dynamic parts extracted from the string.
 */
export const matchUrl = (str = '', template = ''): {[key: string]: string} => {
  const strParts = str.split('/');
  const templateParts = template.split('/');

  if(strParts.length !== templateParts.length)return {};

  const data: {[key: string]: string} = {};

  let notMatch = false;
  for (let i = 0; i < templateParts.length; i++) {
    if (templateParts[i].startsWith(':')) {
      const key = templateParts[i].slice(1);
      data[key] = strParts[i];
    }
    else if (templateParts[i] !== strParts[i]) {
      notMatch = true;
      break;
    }
  }

  if(notMatch)return {};

  return data;
}

/**
 * Encodes a string or number using the `encodeURIComponent` function and replaces all occurrences of `%20` with `+`.
 * @param str - The string or number to be encoded.
 * @returns The encoded string.
 */
export const encodeURIComponentFix = (str: string|number): string => {
  return encodeURIComponent(str).replace(/%20/g,'+');
}


//////////////////////// PRIVATE FUNCTIONS ////////////////////////

const _formatUrl_fixValueToReplace = (value: null|string|number|unknown[]) => {
  if(value === null)return null;
  if(Array.isArray(value))return [...value].join(',');
  return String(value);
}
