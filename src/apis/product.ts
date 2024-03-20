// This file contains the API related functions for fetching the product/product list/...etc.

import { useCallback } from 'react';
import { type CacheRequestInit } from '@/utils/fetch';
import { useCacheFetch, type UseCacheFetchReturnType } from '@/hooks/fetch';
import { type PaginationResponseData } from '@/apis/common';
import { API_ENDPOINT, API_DELAY, NUMBER_OF_PRODUCTS_PER_PAGE } from '@/const';
import { formatUrl } from '@/utils/string';


//////////////////////// CONFIGS ////////////////////////

const API_GET_PRODUCT_SINGLE = '/products/:product_id';
const API_GET_PRODUCTS_ALL = '/products';
const API_GET_PRODUCTS_OF_A_CATEGORY = '/products/category/:category_id';
const API_SEARCH_PRODUCTS = '/products/search';


//////////////////////// TYPE DEFINITIONS //////////////////////////

export type Product = {
  id: number;
  title?: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  brand?: string;
  category?: string;
  thumbnail?: string; // string value of the thumbnail image url
  images?: string[]; // array of string values of the image urls
};

type ProductsFetchResponseData = PaginationResponseData & {
  products: Product[];
}
type ProductFetchResponseData = Product;

type UseFetchProductsExecutePageFunction = (page: number) => void;
type UseFetchProductsExecuteSearchPageFunction = (query: string, page: number) => void;

type UseFetchProductsReturnType = UseCacheFetchReturnType<ProductsFetchResponseData> & {
  executePage: UseFetchProductsExecutePageFunction;
};
type UseSearchProductsReturnType = UseCacheFetchReturnType<ProductsFetchResponseData> & {
  executeSearchPage: UseFetchProductsExecuteSearchPageFunction;
};
type UseFetchProductDetailReturnType = UseCacheFetchReturnType<ProductFetchResponseData>;

//////////////////////// "HOOK" FUNCTIONS ////////////////////////

/**
 * Custom hook for fetching products.
 * @returns An object containing loading state, response data, and functions for executing the fetch and executing a specific page.
 */
export const useFetchProducts = ({categoryId = ''}): UseFetchProductsReturnType => {

  const fetchUrl = `${API_ENDPOINT}${
    categoryId
      ? formatUrl(API_GET_PRODUCTS_OF_A_CATEGORY, {category_id: categoryId})
      : API_GET_PRODUCTS_ALL
    }`;

  const {loading, response, execute, wrongAssumption} = useCacheFetch<ProductsFetchResponseData>(fetchUrl);

  /**
   * Executes the fetch for a specific page of products.
   * @param page - The page number to fetch (starting from 1).
   */
  const executePage = useCallback<UseFetchProductsExecutePageFunction>((page: number) => {
    // the page should start from 1
    page = Math.max(1, page);
    const [delay, limit, skip] = _getDLS(page);
    const requestOptions: CacheRequestInit = {
      queryOptions: {
        limit,
        skip,
        // select: 'title,price',
        delay,
      }
    };
    execute(requestOptions);
  }, [execute]);

  return {loading, response, execute, executePage, wrongAssumption};
}

export const useSearchProducts = (): UseSearchProductsReturnType => {
  const fetchUrl = `${API_ENDPOINT}${API_SEARCH_PRODUCTS}`;
  const {loading, response, execute, wrongAssumption} = useCacheFetch<ProductsFetchResponseData>(fetchUrl);

  /**
   * Executes the fetch for a specific page of products.
   * @param page - The page number to fetch (starting from 1).
   */
  const executeSearchPage = useCallback<UseFetchProductsExecuteSearchPageFunction>((query: string, page: number) => {
    // the page should start from 1
    page = Math.max(1, page);
    const [delay, limit, skip] = _getDLS(page);
    const requestOptions: CacheRequestInit = {
      queryOptions: {
        limit,
        skip,
        q: query,
        // select: 'title,price',
        delay,
      }
    };
    execute(requestOptions);
  }, [execute]);

  return {loading, response, execute, executeSearchPage, wrongAssumption};
}

export const useFetchProductDetail = (productId: string): UseFetchProductDetailReturnType => {
  const fetchUrl = formatUrl(`${API_ENDPOINT}${API_GET_PRODUCT_SINGLE}`, {product_id: productId});
  return useCacheFetch<ProductFetchResponseData>(fetchUrl);
}


//////////////////////// PRIVATE FUNCTIONS ////////////////////////

// get delay, limit, skip
/**
 * Returns an array containing the delay, limit, and skip values based on the given page number.
 * @param page - The page number.
 * @returns An array containing the [delay, limit, skip] values.
 */
const _getDLS = (page: number) => {
  const delay = API_DELAY || 0;
  const limit = NUMBER_OF_PRODUCTS_PER_PAGE || 10;
  const skip = (page - 1) * limit;
  return [delay, limit, skip] as const;
}
