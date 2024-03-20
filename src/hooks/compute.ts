// Collection of hooks that are used to compute values based on the other

import { useMemo } from 'react';
import { useUrl } from './router';
import { type PaginationResponseData } from '../apis/common';


//////////////////////// "HOOK" FUNCTIONS ////////////////////////

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
 * Custom hook to calculate the total number of pages based on the response data.
 * @param responseData - The pagination response data containing the total number of items and the limit per page.
 * @returns The total number of pages.
 */
export const useTotalPage = (responseData: PaginationResponseData | undefined): number => {
  return useMemo(() => {
    if(!responseData){
      return 0;
    }
    return Math.ceil(responseData.total / responseData.limit);
  }, [responseData]);
}
