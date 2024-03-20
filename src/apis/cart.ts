// This file contains the API related functions for fetching the cart ...etc.

import { formatUrl } from '@/utils/string';
import { useCacheFetch, type UseCacheFetchReturnType } from '@/hooks/fetch';
import { type Product } from './product';
import { API_ENDPOINT } from '@/const';


//////////////////////// CONFIGS ////////////////////////

export const API_GET_CART = '/cart';
export const API_ADD_PRODUCT_TO_CART = '/cart/add_product/:product_id/:quantity';


//////////////////////// TYPE DEFINITIONS //////////////////////////

export type CartProduct = Product & {
  quantity: number;
};

export type Cart = {
  id: number;
  products: CartProduct[];
  total: number;
};

export type CartId = string;

type CartFetchResponseData = Cart;

type UseFetchCartReturnType = UseCacheFetchReturnType<CartFetchResponseData>;


//////////////////////// "HOOK" FUNCTIONS ////////////////////////

/**
 * Custom hook to fetch the cart from the API.
 * @returns An object containing loading state, response data, execute function, and wrongAssumption function.
 */
export const useFetchCart = (): UseFetchCartReturnType => {
  return useCacheFetch<CartFetchResponseData>(`${API_ENDPOINT}${API_GET_CART}`);
}

export const useAddProductToCart = (product: Product, quantity: number = 1): UseFetchCartReturnType => {
  return useCacheFetch<CartFetchResponseData>(`${API_ENDPOINT}${formatUrl(API_ADD_PRODUCT_TO_CART, {product_id: product.id, quantity})}`);
}
