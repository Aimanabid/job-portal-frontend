'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigation } from '../../hooks/useNavigation'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useCompany } from '../../context/CompanyContext'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const [hasCompany, setHasCompany] = useState(false);
    const [loading, setLoading] = useState(true);
    const { navigate } = useNavigation();
    const { setSearchCompanyByText } = useCompany();

    // Check if user already has a company
    useEffect(() => {
        const checkUserCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/check`, {
                    withCredentials: true
                });
                if (res?.data?.success) {
                    setHasCompany(res.data.hasCompany);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        checkUserCompany();
    }, []);

    useEffect(()=>{
        setSearchCompanyByText(input);
    },[input, setSearchCompanyByText]);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className='max-w-6xl mx-auto my-10'>
                    <div className='text-center'>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    {!hasCompany && (
                        <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                    )}
                    {hasCompany && (
                        <div className='text-sm text-gray-500'>
                            You already have a company registered
                        </div>
                    )}
                </div>
                <CompaniesTable/>
            </div>
        </div>
    )
}

export default Companies