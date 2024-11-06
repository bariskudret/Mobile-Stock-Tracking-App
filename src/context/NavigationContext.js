
import React, { createContext, useState, useContext } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  return (
    <NavigationContext.Provider value={{ isSettingsVisible, setIsSettingsVisible}}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);