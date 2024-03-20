// this file is used to handle url changes and navigation
// it's a simple implementation of the observer pattern to notify the subscribers when the url changes
// the url change caused by the user clicking the back or forward button in the browser
// or by calling the "goto" function

import { once } from '../utils/function'

type URLSubscriberHandlerFunction = (url: URL) => void;
const subscribers: URLSubscriberHandlerFunction[] = [];

// run this listener only once, globally
once(() => {
  window.addEventListener('popstate', () => {
    console.log('popstate here');
    _triggerAllSubscribers();
  });
})();

export const onUrlChange = (subscriber: URLSubscriberHandlerFunction) => {
  subscribers.push(subscriber);
}

export const goto = (url: string) => {
  window.history.pushState(null, '', url)
  _triggerAllSubscribers();
}

export const isSamePath = (href1: string, href2: string): boolean => {
  const url1 = new URL(href1);
  const url2 = new URL(`${url1.origin}${href2}`);
  return url1.pathname === url2.pathname;
}

// private function to trigger all subscribers
const _triggerAllSubscribers = () => {
  subscribers.forEach(subscriber => subscriber(new URL(window.location.href)));
}

interface Window {
  goto: (url: string) => void;
}
window.goto = goto;