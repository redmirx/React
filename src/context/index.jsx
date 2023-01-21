import React, { createContext } from 'react';

export const Root = createContext();

const RootContext = ({ children }) => {
  return <Root.Provider value="">{children}</Root.Provider>;
};

export default RootContext;
