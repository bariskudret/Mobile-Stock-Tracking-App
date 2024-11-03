import React, { createContext, useState, useContext } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  return (
    <SettingsContext.Provider value={{ isSettingsVisible, setIsSettingsVisible }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);