'use client'
import React, { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const useJob = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJob must be used within a JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [allJobs, setAllJobs] = useState([]);
  const [allAdminJobs, setAllAdminJobs] = useState([]);
  const [singleJob, setSingleJob] = useState(null);
  const [searchJobByText, setSearchJobByText] = useState('');
  const [allAppliedJobs, setAllAppliedJobs] = useState([]);
  const [searchedQuery, setSearchedQuery] = useState('');

  const value = {
    // State
    allJobs,
    allAdminJobs,
    singleJob,
    searchJobByText,
    allAppliedJobs,
    searchedQuery,
    
    // Actions
    setAllJobs,
    setAllAdminJobs,
    setSingleJob,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};
