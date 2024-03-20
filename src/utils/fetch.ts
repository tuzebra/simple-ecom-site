// this file contains some useful "fetch" and api call utilities

import { getRandomStringId, encodeURIComponentFix } from '@/utils/string';

//////////////////////// TYPE DEFINITIONS ////////////////////////

export type QueryOptions = {[key: string]: string | string[] | number | number[]};

export type CacheRequestInit = RequestInit & {
  id?: string; // this id is used to identify the fetch call
  queryOptions?: QueryOptions;
}

export type FetchResponse<DataType> = {
  id: string; // unique id to identify the fetch call
  data?: DataType;
  error?: unknown;
  success?: boolean;
  message?: string;
}

export type ResolveFunction = (value: unknown) => void;

export type FetchMiddlewareReturn<ExpectedDataType> = {
  override: boolean,
  response?: FetchResponse<ExpectedDataType>,
};

type cacheFetchMiddlewareFunction<ExpectedDataType> = (url: string, options: CacheRequestInit) => Promise<FetchMiddlewareReturn<ExpectedDataType>>;


//////////////////////// SCOPED VARIABLES ////////////////////////

// this variable used to cache the response of the "GET" fetch call, based on the url
const cacheGETResponseByUrl: {[url: string]: FetchResponse<unknown>} = {};

const fetchingPromise: {[url: string]: ResolveFunction[]} = {};

const middlewares: cacheFetchMiddlewareFunction<unknown>[] = [];


//////////////////////// FUNCTIONS ////////////////////////

/**
 * Adds a fetch middleware function to the list of middlewares.
 * @param middleware - The fetch middleware function to add.
 * @template ExpectedDataType - The expected data type of the middleware.
 */
export const addFetchMiddleware = <ExpectedDataType>(middleware: cacheFetchMiddlewareFunction<ExpectedDataType>) => {
  middlewares.push(middleware as cacheFetchMiddlewareFunction<ExpectedDataType>);
}

/**
 * Converts an object of query options into a query string.
 * @param queryOptions - The object containing the query options.
 * @returns The generated query string.
 */
export const toQueryString = (queryOptions: QueryOptions = {}): string => {
  if(typeof queryOptions !== 'object'){
    return '';
  }
  const strParts: string[] = [];
  for(const [key, value] of Object.entries(queryOptions)){
    if(Array.isArray(value)){
      for(let i=0;i<value.length;i++){
        strParts.push(`${key}[]=${encodeURIComponentFix(value[i])}`);
      }
      continue;
    }
    strParts.push(`${key}=${encodeURIComponentFix(value)}`);
  }
  return strParts.join('&');
}

/**
 * Fetches data from a specified URL and caches the response for subsequent requests.
 * @param url - The URL to fetch data from.
 * @param options - Additional options for the fetch request.
 * @returns A promise that resolves to a FetchResponse object containing the fetched data.
 * @template ExpectedDataType - The expected data type of the fetched data.
 */
export const cacheFetch = async <ExpectedDataType> (url = '', options: CacheRequestInit = {}): Promise<FetchResponse<ExpectedDataType>> => {

  // support middleware to hook into this function
  for await(const middleware of middlewares){
    const { override, response } = await middleware(url, options) as FetchMiddlewareReturn<ExpectedDataType>;
    if(override && response){
      return response;
    }
  }

  const { id = getRandomStringId() } = options;

  // append the query string to the url
  if(options.queryOptions){
    const str = toQueryString(options.queryOptions);
    if(str){
      url += (url.indexOf('?')+1 ? '&':'?') + str;
    }
  }

  // use cache first
  const { method = 'GET' } = options;
  // only handle cache for GET method
  if(method.toLowerCase() === 'get'){

    // if there're the same url is fetching?
    // just return a promise to resolve later
    // because we don't want to fetch the same url multiple times
    if(Array.isArray(fetchingPromise?.[url])){
      await new Promise(resolve => fetchingPromise?.[url].push(resolve));
    }

    // check existing cache
    if(cacheGETResponseByUrl?.[url]){
      const cachedFetchResponse = cacheGETResponseByUrl[url] as FetchResponse<ExpectedDataType>;
      return {
        ...cachedFetchResponse,
        id,
      }
    }

  }

  // if not cached, then fetch, and create a fetching task
  fetchingPromise[url] = [];
  const response: FetchResponse<ExpectedDataType> = {id, success: false};
  let data: ExpectedDataType;
  try{
    const res = await fetch(url, options);
    data = await res.json() as ExpectedDataType;
    if(data){
      response.data = data;
      response.success = true;
      response.message = 'success';
    }
  }
  catch(error){
    response.message = 'Error!';
    response.error = error;
  }

  cacheGETResponseByUrl[url] = response;

  // then resolve all the promise was added on the way the fetching task was running
  fetchingPromise[url].forEach(resolve => resolve(response));

  // clean up the fetchingPromise
  delete fetchingPromise[url];

  return response;
}
