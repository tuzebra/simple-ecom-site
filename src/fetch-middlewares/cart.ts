import { type Cart } from '@/apis/cart';
import { addFetchMiddleware, type FetchMiddlewareReturn, type CacheRequestInit } from '@/utils/fetch';
import { API_ENDPOINT } from '@/const';

// because this function don't need to deal with the "options" parameter,
// we just ignore eslint warning about it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCart = async (url: string, options: CacheRequestInit): Promise<FetchMiddlewareReturn<Cart>> => {

  if(url !== `${API_ENDPOINT}/cart`){
    return {
      override: false,
    }
  }

  return {
    override: false,
    response: {
      id: 'cart',
      data: {
        id: 1,
        title: 'Cart',
        price: 0,
      },
    },
  };
}

export const setupCartFetchMiddlewares = () => {
  addFetchMiddleware(getCart);
};
