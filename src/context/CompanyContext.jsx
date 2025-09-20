'use client'
import React, { createContext, useContext, useState } from 'react';

const CompanyContext = createContext();

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
};

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [singleCompany, setSingleCompany] = useState(null);
  const [searchCompanyByText, setSearchCompanyByText] = useState('');

  const value = {
    // State
    companies,
    singleCompany,
    searchCompanyByText,
    
    // Actions
    setCompanies,
    setSingleCompany,
    setSearchCompanyByText
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};
