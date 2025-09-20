'use client'
import React from 'react';
import { AuthProvider } from './AuthContext';
import { JobProvider } from './JobContext';
import { CompanyProvider } from './CompanyContext';
import { ApplicationProvider } from './ApplicationContext';

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <JobProvider>
        <CompanyProvider>
          <ApplicationProvider>
            {children}
          </ApplicationProvider>
        </CompanyProvider>
      </JobProvider>
    </AuthProvider>
  );
};
