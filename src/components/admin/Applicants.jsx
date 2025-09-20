'use client'
import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useApplication } from '../../context/ApplicationContext';

const Applicants = ({ id }) => {
    const { setApplicants, applicants } = useApplication();

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${id}/applicants`, { withCredentials: true });
                setApplicants(res.data.job);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, [id, setApplicants]);
    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants {applicants?.applications?.length}</h1>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants