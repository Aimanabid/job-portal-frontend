"use client"
import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigation } from '../../hooks/useNavigation'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useCompany } from '../../context/CompanyContext'

const CompanyCreate = () => {
    const { navigate } = useNavigation();
    const [companyName, setCompanyName] = useState('');
    const [hasCompany, setHasCompany] = useState(false);
    const [loading, setLoading] = useState(true);
    const { setSingleCompany } = useCompany();

    // Check if user already has a company
    useEffect(() => {
        const checkUserCompany = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/check`, {
                    withCredentials: true
                });
                if (res?.data?.success) {
                    setHasCompany(res.data.hasCompany);
                    if (res.data.hasCompany) {
                        setSingleCompany(res.data.company);
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        checkUserCompany();
    }, [setSingleCompany]);

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res?.data?.success){
                setSingleCompany(res.data.company);
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('Failed to create company. Please try again.');
            }
        }
    }

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className='max-w-4xl mx-auto'>
                    <div className='my-10 text-center'>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (hasCompany) {
        return (
            <div>
                <Navbar />
                <div className='max-w-4xl mx-auto'>
                    <div className='my-10 text-center'>
                        <h1 className='font-bold text-2xl text-green-600 mb-4'>Company Already Exists</h1>
                        <p className='text-gray-500 mb-6'>You already have a company registered. You can only create one company per account.</p>
                        <Button onClick={() => navigate("/admin/companies")}>View Your Company</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? You can change this later.</p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    placeholder="JobHunt, Microsoft etc."
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button 
                        onClick={registerNewCompany}
                        disabled={!companyName.trim()}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate