// this file contains some useful "fetch" and api call utilities

export type QueryOptions = {[key: string]: string};
export type CustomRequestInit = RequestInit & {
  id?: string; // this id is used to identify the fetch call
  queryOptions?: QueryOptions;
}

export type FetchResponse<DataType> = {
  id: string; // unique id to identify the fetch call
  data?: DataType;
  error?: unknown;
  success: true | false;
  message?: string;
}

type ResolveFunction = (value: unknown) => void;

// this variable used to cache the response of the "GET" fetch call, based on the url
const cacheGETResponseByUrl: {[url: string]: FetchResponse<unknown>} = {};

const fetchingPromise: {[url: string]: ResolveFunction[]} = {};

export const toQueryString = (queryOptions: QueryOptions = {}): string => {
  if(typeof queryOptions !== 'object'){
    return '';
  }
  const strParts: string[] = [];
  for(const [key, value] of Object.entries(queryOptions)){
    if(Array.isArray(value)){
      for(let i=0;i<value.length;i++){
        strParts.push(`${key}[]=${encodeURIComponent(value[i]).replace(/%20/g,'+')}`);
      }
      continue;
    }
    strParts.push(`${key}=${encodeURIComponent(value).replace(/%20/g,'+')}`);
  }
  return strParts.join('&');
}

export const cacheFetch = async <ExpectedDataType> (url = '', options: CustomRequestInit = {}): Promise<FetchResponse<ExpectedDataType>> => {

  const { id = Math.random().toString(36).substring(7) } = options;

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
  const fetchResponse: FetchResponse<ExpectedDataType> = {id, success: false};
  let data: ExpectedDataType;
  try{
    const res = await fetch(url, options);
    data = await res.json() as ExpectedDataType;
    if(data){
      fetchResponse.data = data;
      fetchResponse.success = true;
      fetchResponse.message = 'success';
    }
  }
  catch(error){
    fetchResponse.message = 'Error!';
    fetchResponse.error = error;
  }

  cacheGETResponseByUrl[url] = fetchResponse;

  // then resolve all the promise was added on the way the fetching task was running
  fetchingPromise[url].forEach(resolve => resolve(fetchResponse));

  // clean up the fetchingPromise
  delete fetchingPromise[url];

  return fetchResponse;
}
