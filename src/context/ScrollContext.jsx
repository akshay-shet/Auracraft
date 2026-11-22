import React, { createContext, useContext, useRef } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const scrollPositions = useRef({});

  const saveScrollPosition = (key = 'shop_scroll') => {
    scrollPositions.current[key] = window.scrollY;
  };

  const getScrollPosition = (key = 'shop_scroll') => {
    return scrollPositions.current[key] || 0;
  };

  const clearScrollPosition = (key = 'shop_scroll') => {
    delete scrollPositions.current[key];
  };

  return (
    <ScrollContext.Provider
      value={{
        saveScrollPosition,
        getScrollPosition,
        clearScrollPosition
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
