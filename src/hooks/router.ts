// The idea is to create a custom hook that returns the current URL
// and because it listens to the event of url change, so the URL stage is always up to date.

import { useState, useEffect, useMemo } from 'react';
import { onUrlChange, getCurrentUrl } from '@/utils/url';


//////////////////////// "HOOK" FUNCTIONS ////////////////////////


/**
 * Custom hook that returns the current URL and the values of specified query parameters.
 * @param neededParams - An array of query parameter names that are required.
 * @returns A tuple containing the current URL and an array of query parameter values.
 */
export const useUrl = (neededParams: string[] = []): [URL, string[]] => {

  // create state to hold the current url
  // pass a function to "useState" to get the initial value
  const [url, setUrl] = useState(getCurrentUrl);

  // just a simple effect to update the "url" state when the current url was changed
  // the "onUrlChange" function will return a function to unsubscribe
  // we simply return that function to used as a useEffect cleanup function
  useEffect(
    () => onUrlChange(url => setUrl(url)),
    [setUrl]
  );

  const neededParamValues: string[] = useMemo(() => {
    return neededParams.map(param => url.searchParams.get(param) || '');
  }, [url, neededParams])

  return [url, neededParamValues];
}
