// This file contains the API related functions for fetching the product/product list/...etc.

import { useCallback } from 'react';
import { type CacheRequestInit } from '../utils/fetch';
import { useCacheFetch, type UseCacheFetchReturnType, type UseCacheFetchExecuteFunction } from '../hooks/fetch';
import { type PaginationResponseData } from './common';


//////////////////////// CONFIGS ////////////////////////

const API_GET_PRODUCTS = '/products';


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

type ProductFetchResponseData = PaginationResponseData & {
  products: Product[];
}

type UseFetchProductsExecutePageFunction = (page: number) => void;

type UseFetchProductsReturnType = UseCacheFetchReturnType<ProductFetchResponseData> & {
  executePage: UseFetchProductsExecutePageFunction;
};


//////////////////////// "HOOK" FUNCTIONS ////////////////////////

/**
 * Custom hook for fetching products.
 * @returns An object containing loading state, response data, and functions for executing the fetch and executing a specific page.
 */
export const useFetchProducts = (): UseFetchProductsReturnType => {
  const {loading, response, execute, wrongAssumption} = useCacheFetch<ProductFetchResponseData>(`${import.meta.env.VITE_API_ENDPOINT}${API_GET_PRODUCTS}`);

  /**
   * Executes the fetch for a specific page of products.
   * @param page - The page number to fetch (starting from 1).
   */
  const executePage = useCallback<UseFetchProductsExecutePageFunction>((page: number) => {
    // the page should start from 1
    page = Math.max(1, page);
    const delay = import.meta.env.VITE_API_DELAY || 0;
    const limit = import.meta.env.VITE_NUMBER_OF_PRODUCTS_PER_PAGE || 10;
    const skip = (page - 1) * limit;
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
