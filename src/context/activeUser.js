import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const promoterId = localStorage.getItem('promoterId');
  const token = localStorage.getItem('token');

  const isLoggedIn = !!promoterId && !!token;

  
  return (
    <AuthContext.Provider value={{ promoterId, token, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
