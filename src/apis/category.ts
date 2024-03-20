// This file contains the API related functions for fetching the product/product list/...etc.

import { useCacheFetch, type UseCacheFetchReturnType } from '@/hooks/fetch';
import { API_ENDPOINT } from '@/const';


//////////////////////// CONFIGS ////////////////////////

const API_GET_CATEGORIES = '/products/categories';


//////////////////////// TYPE DEFINITIONS //////////////////////////

export type CategoryId = string;

type CategoryFetchResponseData = CategoryId[];

type UseFetchCategoriesReturnType = UseCacheFetchReturnType<CategoryFetchResponseData>;


//////////////////////// "HOOK" FUNCTIONS ////////////////////////

/**
 * Custom hook to fetch categories from the API.
 * @returns An object containing loading state, response data, execute function, and wrongAssumption function.
 */
export const useFetchCategories = (): UseFetchCategoriesReturnType => {
  return useCacheFetch<CategoryFetchResponseData>(`${API_ENDPOINT}${API_GET_CATEGORIES}`);
}
