import React, { createContext, useState, useContext } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  // Mevcut ayarlar drawer'ına ek olarak, filtre drawer'ı için de state ekledik
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [applyFiltersFunction, setApplyFiltersFunction] = useState(null);
  return (
    <NavigationContext.Provider value={{ 
      isSettingsVisible, 
      setIsSettingsVisible,
      isFilterVisible, 
      setIsFilterVisible ,
      applyFiltersFunction,
      setApplyFiltersFunction 
    }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => useContext(NavigationContext);

