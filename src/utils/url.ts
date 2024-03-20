// this file is used to handle url changes and navigation
// it's a simple implementation of the observer pattern to notify the subscribers when the url changes
// the url change caused by the user clicking the back or forward button in the browser
// or by calling the "goto" function

import { once } from '../utils/function';


//////////////////////// TYPE DEFINITIONS ////////////////////////

type URLSubscriberHandlerFunction = (url: URL) => void;

type URLSubscriberRecord = {
  [key: string]: URLSubscriberHandlerFunction;
}

const subscribers: URLSubscriberRecord = {};


//////////////////////// FUNCTIONS ////////////////////////

/**
 * Registers a subscriber function to be called whenever the URL changes.
 * @param subscriber - The function to be called when the URL changes.
 * @returns A function that can be called to unsubscribe the subscriber.
 */
export const onUrlChange = (subscriber: URLSubscriberHandlerFunction) => {

  // generate a unique id for the subscriber
  const id = Math.random().toString(36).substring(7);
  subscribers[id] = subscriber;

  // need to return a function to unsubscribe
  return () => {
    delete subscribers[id];
  }
}

/**
 * Returns the current URL object of the current page url (the address).
 * @returns {URL} The current URL object.
 */
export const getCurrentUrl = (): URL => new URL(window.location.href);

/**
 * Navigates to the specified URL and updates the browser history.
 * @param url - The URL to navigate to.
 */
export const goto = (url: string) => {
  window.history.pushState(null, '', url);
  _triggerAllSubscribers();
}

/**
 * Checks if two URLs have the same path.
 * @param href1 - The first URL.
 * @param href2 - The second URL.
 * @returns A boolean indicating whether the paths are the same.
 */
export const isSamePath = (href1: string, href2: string): boolean => {
  const url1 = new URL(href1);
  const url2 = new URL(`${url1.origin}${href2}`);
  return url1.pathname === url2.pathname;
}


//////////////////////// PRIVATE FUNCTIONS ////////////////////////

/**
 * Triggers all the subscribers by calling their callback functions with the current URL.
 */
const _triggerAllSubscribers = () => {
  const currentUrl = getCurrentUrl();
  Object.values(subscribers).forEach(
    (subscriber) => subscriber(currentUrl)
  );
}


//////////////////////// MISC ////////////////////////

// run this listener only once, globally
once(() => {
  window.addEventListener('popstate', _triggerAllSubscribers);
})();

interface Window {
  goto: (url: string) => void;
}
window.goto = goto;