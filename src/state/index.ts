import React, { useState, useContext, createContext } from 'react';
import { ProductSortMethodEnum } from './product';

export type GlobalContextStateType = {
  productSortMethod: ProductSortMethodEnum;
};

export type GlobalContextStateUpdate = React.Dispatch<React.SetStateAction<GlobalContextStateType>>;

type GlobalContextValue = [
  GlobalContextStateType | null,
  GlobalContextStateUpdate | null
];

export const globalContextStateDefault: GlobalContextStateType = {
  productSortMethod: ProductSortMethodEnum.PRICE_ASC,
};

export const GlobalContext = createContext<GlobalContextValue>([null, null]);

export const useGlobalState = () => {
  return useContext(GlobalContext);
}
