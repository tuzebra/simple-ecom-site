// The idea is to create a custom hook that returns the current URL
// and because it listens to the event of url change, so the current URL always up to date.

import { useState, useEffect } from 'react'
import { onUrlChange } from '../utils/url'

export const useUrl = () => {

  // create state to hold the current url
  const [url, setUrl] = useState(window.location.href);

  useEffect(() => {
    onUrlChange((url)=>{
      console.log('URL changed', url);
      setUrl(window.location.href);
    });
  }, [setUrl]);

  return [url]
}