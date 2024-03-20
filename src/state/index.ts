import React, { useContext, createContext } from 'react';
import { type GlobalCartContextStateType, globalCartContextStateDefault } from './cart';


//////////////////////// TYPE DEFINITIONS ////////////////////////

export type GlobalContextStateType = GlobalCartContextStateType & {
  // add more global state here...
};

export type GlobalContextStateUpdate = React.Dispatch<React.SetStateAction<GlobalContextStateType>>;

type GlobalContextValue = [
  GlobalContextStateType | null,
  GlobalContextStateUpdate | null
];


//////////////////////// EXPORTED VARIABLES ////////////////////////

export const globalContextStateDefault: GlobalContextStateType = {
  ...globalCartContextStateDefault,
  // add more global state here...
};

export const GlobalContext = createContext<GlobalContextValue>([null, null]);


//////////////////////// "HOOK" FUNCTIONS ////////////////////////

export const useGlobalState = () => {
  return useContext(GlobalContext);
}
