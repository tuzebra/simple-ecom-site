// Collection of hooks that are used to compute values based on the other

import { useMemo } from 'react';
import { useUrl } from '@/hooks/router';
import { matchUrl } from '@/utils/string';
import { type PaginationResponseData } from '@/apis/common';
import { PATH_PAGE__CATEGORY, PATH_PAGE__PRODUCT_DETAIL } from '@/const';


//////////////////////// "HOOK" FUNCTIONS ////////////////////////

/**
 * Custom hook that returns the current pathname from the URL.
 * @returns The current pathname as a string.
 */
export const usePathname = (): string => {
  const [url] = useUrl();
  return url.pathname;
}

/**
 * Custom hook to retrieve the current category ID from the URL.
 * @returns The current category ID.
 */
export const useCategoryId = (): string => {
  const [url] = useUrl();
  const {category_id: categoryId = ''} = matchUrl(url.pathname, PATH_PAGE__CATEGORY);
  return categoryId;
}

/**
 * Custom hook to retrieve the current product ID from the URL.
 * @returns The current product ID.
 */
export const useProductId = (): string => {
  const [url] = useUrl();
  const {product_id: productId = ''} = matchUrl(url.pathname, PATH_PAGE__PRODUCT_DETAIL);
  return productId;
}

/**
 * Custom hook to retrieve the current page number from the URL.
 * The page number should start from 1.
 * If no page number is found in the URL, it defaults to 1.
 * @returns The current page number.
 */
export const usePage = (): number => {
  const [, [page]] = useUrl(['page']);

  // the page should start from 1
  return Math.max(1, parseInt(page || '1'));
}

/**
 * Custom hook to retrieve the query parameter from the URL.
 * @returns The value of the 'q' query parameter, or an empty string if it is not present.
 */
export const useQuery = (): string => {
  const [, [query]] = useUrl(['q']);
  return query || '';
}

/**
 * Custom hook to calculate the total number of pages based on the response data.
 * @param responseData - The pagination response data containing the total number of items and the limit per page.
 * @returns The total number of pages.
 */
export const useTotalPage = (responseData: PaginationResponseData | undefined): number => {
  return useMemo(() => {
    if(!responseData){
      return 0;
    }
    if(responseData.limit <= 0){
      return 0;
    }
    return Math.ceil(responseData.total / responseData.limit);
  }, [responseData]);
}
