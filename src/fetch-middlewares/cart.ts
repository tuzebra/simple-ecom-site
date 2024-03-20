import { type Cart, API_GET_CART, API_ADD_PRODUCT_TO_CART } from '@/apis/cart';
import { addFetchMiddleware, type FetchMiddlewareReturn, type CacheRequestInit } from '@/utils/fetch';
import { matchUrl } from '@/utils/string';
import { waitFor } from '@/utils/promise';
import { API_ENDPOINT } from '@/const';

const getCart = async (url: string, options: CacheRequestInit): Promise<FetchMiddlewareReturn<Cart>> => {

  if(url !== `${API_ENDPOINT}${API_GET_CART}`){
    return {
      override: false,
    }
  }

  // wait for 0-1 second to simulate the API call
  await waitFor(1000 * Math.random());

  return {
    override: true,
    response: {
      id: options.id ?? '',
      data: _getLocalStorageCart(),
    },
  };
}

const addProductToCart = async (url: string, options: CacheRequestInit): Promise<FetchMiddlewareReturn<Cart>> => {

  const { product_id, quantity } = matchUrl(url, `${API_ENDPOINT}${API_ADD_PRODUCT_TO_CART}`);
  if(!product_id || !quantity){
    return {
      override: false,
    }
  }

  // wait for 1 second to simulate the API call
  await waitFor(1000);

  // we random the success/failure of the API call
  // to simulate the real world scenario
  const canBeSuccess = Math.random() > 0.5;
  const localStorageCart: Cart =  _getLocalStorageCart();

  // if the API call can be success, then we need to update the local storage cart
  if(canBeSuccess){
    // is this product already in the cart?
    // @ts-ignore: ignore
    // const productIndex = localStorageCart.products.findIndex(product => product.id === options.product.id);
    // if(productIndex >= 0){
    //   localStorageCart.products[productIndex].quantity += parseInt(quantity);
    // }
    // else{
    //   // @ts-ignore: ignore
    //   localStorageCart.products.push({...options.product, quantity: parseInt(quantity)});
    // }
    // simple push
    // @todo: check if the product is already in the cart
    localStorageCart.products.push({...options.product, quantity: parseInt(quantity)});
    _saveLocalStorageCart(localStorageCart);
  }

  return {
    override: true,
    response: {
      id: options.id ?? '',
      data: localStorageCart,
    },
  };
}

export const setupCartFetchMiddlewares = () => {
  addFetchMiddleware(getCart);
  addFetchMiddleware(addProductToCart);
};


//////////////////////// PRIVATE FUNCTIONS ////////////////////////

const _getLocalStorageCart = (): Cart => {
  let localStorageCartString = localStorage.getItem('--cart');
  if(!localStorageCartString){
    localStorageCartString = JSON.stringify({
      id: 1, products: [], total: 0,
    });
    localStorage.setItem('--cart', localStorageCartString);
  }

  return JSON.parse(localStorageCartString) as Cart;
};

const _saveLocalStorageCart = (cart: Cart) => {
  localStorage.setItem('--cart', JSON.stringify(cart));
};
