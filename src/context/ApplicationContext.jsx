'use client'
import React, { createContext, useContext, useState } from 'react';

const ApplicationContext = createContext();

export const useApplication = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplication must be used within an ApplicationProvider');
  }
  return context;
};

export const ApplicationProvider = ({ children }) => {
  const [applicants, setApplicants] = useState(null);

  const value = {
    // State
    applicants,
    
    // Actions
    setApplicants
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};
