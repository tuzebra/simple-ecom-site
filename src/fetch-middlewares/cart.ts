import { type Cart, API_GET_CART, API_ADD_PRODUCT_TO_CART } from '@/apis/cart';
import { addFetchMiddleware, type FetchMiddlewareReturn, type CacheRequestInit } from '@/utils/fetch';
import { matchUrl } from '@/utils/string';
import { API_ENDPOINT } from '@/const';

const getCart = async (url: string, options: CacheRequestInit): Promise<FetchMiddlewareReturn<Cart>> => {

  if(url !== `${API_ENDPOINT}${API_GET_CART}`){
    return {
      override: false,
    }
  }

  return {
    override: true,
    response: {
      id: options.id ?? '',
      data: {
        id: 1, // cart id
        products: [{
          id: 1,
          title: 'Product 1',
          price: 100,
          quantity: 1,
        },
        {
          id: 2,
          title: 'Product 2',
          price: 200,
          quantity: 2,
        }],
        total: 0,
      },
    },
  };
}

const addProductToCart = async (url: string, options: CacheRequestInit): Promise<FetchMiddlewareReturn<Cart>> => {

  if(Object.keys(matchUrl(url, `${API_ENDPOINT}${API_ADD_PRODUCT_TO_CART}`)).length !== 2){
    return {
      override: false,
    }
  }

  return {
    override: true,
    response: {
      id: options.id ?? '',
      data: {
        id: 1, // cart id
        products: [{
          id: 1,
          title: 'Product 1',
          price: 100,
          quantity: 1,
        },
        {
          id: 2,
          title: 'Product 2',
          price: 200,
          quantity: 2,
        }],
        total: 0,
      },
    },
  };
}

export const setupCartFetchMiddlewares = () => {
  addFetchMiddleware(getCart);
  addFetchMiddleware(addProductToCart);
};
