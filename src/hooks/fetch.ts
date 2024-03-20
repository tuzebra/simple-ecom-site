import { useState, useRef, useEffect, useCallback } from 'react';
import { cacheFetch, type CacheRequestInit, type FetchResponse } from '../utils/fetch';
import { getRandomStringId } from '../utils/string';


//////////////////////// TYPE DEFINITIONS ////////////////////////

export type UseCacheFetchExecuteFunction<ExpectedDataType> = (
  options: CacheRequestInit,
  assumptionResponseData?: ExpectedDataType,
  checkAssumptionCorrect?: (data:ExpectedDataType) => boolean
) => void;

export type UseCacheFetchReturnType<ExpectedDataType> = {
  loading: true|false;
  response?: FetchResponse<ExpectedDataType> | null;
  execute: UseCacheFetchExecuteFunction<ExpectedDataType>;
  wrongAssumption: number;
};


//////////////////////// "HOOK" FUNCTIONS ////////////////////////


export const useCacheFetch = <ExpectedDataType>(url: string): UseCacheFetchReturnType<ExpectedDataType> => {

  const fetchIdRef = useRef<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<FetchResponse<ExpectedDataType> | null>(null);
  const [wrongAssumption, setWrongAssumption] = useState(0);

  const execute = useCallback<UseCacheFetchExecuteFunction<ExpectedDataType>>((options: CacheRequestInit, assumptionResponseData, checkAssumptionCorrect) => {

    // before fetching the data, just generate an id for the fetch call
    fetchIdRef.current = getRandomStringId();

    setLoading(true);

    // if there's an assumption response data, use it
    if(assumptionResponseData){
      const assumptionResponse: FetchResponse<ExpectedDataType> = {
        id: fetchIdRef.current,
        data: assumptionResponseData,
        message: 'assume',
      };
      setResponse(assumptionResponse);
    }

    // fetch the data
    async function fetchData() {
      const response: FetchResponse<ExpectedDataType> = await cacheFetch(url, {...options, id: fetchIdRef.current});
      setLoading(false);
      // check if the response is the result of the last fetch call
      if(fetchIdRef.current === response.id){
        setResponse(response);
        // if we're using an assumption response data before,
        // then need to check if the assumption is correct
        // if it's not correct, then let the outer component know
        if(typeof checkAssumptionCorrect === 'function' && response.data){
          if(!checkAssumptionCorrect(response.data)){
            setWrongAssumption((currentValue) => currentValue + 1);
          }
        }
      }
    }
    fetchData();
  }, [url]);

  return {loading, response, execute, wrongAssumption};
}
