import React, { createContext, useContext, useReducer } from 'react';
import {
  ThemeContextConfig,
  ThemeThemeStateConfigProvider
} from '../common/types';

const StateContext = createContext<ThemeContextConfig>(
  {} as ThemeContextConfig
);

export const StateProvider: React.FC<ThemeThemeStateConfigProvider> = ({
  reducer,
  initialState,
  children
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = (): ThemeContextConfig => useContext(StateContext);
