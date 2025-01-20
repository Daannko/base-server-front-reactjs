import React, { createContext, useState, useContext } from 'react';
const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(true); 
  
  const toggleNavBarVisibility = (value) => {
    setIsVisible(() => value);
  };

  return (
    <NavbarContext.Provider value={{ isVisible, toggleNavBarVisibility }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);
