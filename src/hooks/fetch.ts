import { useState, useRef, useEffect, useCallback } from 'react';
import { cacheFetch, type CacheRequestInit, type FetchResponse } from '../utils/fetch';


//////////////////////// TYPE DEFINITIONS ////////////////////////

export type UseCacheFetchExecuteFunction = (options: CacheRequestInit) => void;

export type UseCacheFetchReturnType<ExpectedDataType> = [true|false, FetchResponse<ExpectedDataType> | null, UseCacheFetchExecuteFunction];


//////////////////////// "HOOK" FUNCTIONS ////////////////////////


export const useCacheFetch = <ExpectedDataType>(url: string): UseCacheFetchReturnType<ExpectedDataType> => {

  const [loading, setLoading] = useState<false | true>(false);
  const [response, setResponse] = useState<FetchResponse<ExpectedDataType> | null>(null);

  const execute = useCallback<UseCacheFetchExecuteFunction>((options: CacheRequestInit) => {
    setLoading(true);
    async function fetchData() {
      const response: FetchResponse<ExpectedDataType> = await cacheFetch(url, options);
      setLoading(false);
      setResponse(response);
    }
    fetchData();
  }, [url]);

  return [loading, response, execute];
}
