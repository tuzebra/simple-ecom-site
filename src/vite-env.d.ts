/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_API_DELAY: number;
  readonly VITE_NUMBER_OF_PRODUCTS_PER_PAGE: number;

  readonly VITE_PATH_PAGE__HOME: string;
  readonly VITE_PATH_PAGE__SEARCH: string;
  readonly VITE_PATH_PAGE__CART: string;
}