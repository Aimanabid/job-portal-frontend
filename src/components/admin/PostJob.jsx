"use client"
import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { useCompany } from '../../context/CompanyContext'
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigation } from '../../hooks/useNavigation'
import { Loader2 } from 'lucide-react'

const companyArray = [];

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading]= useState(false);
    const { navigate } = useNavigation();

    const { companies } = useCompany();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company)=> company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input,{
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
            toast.error(errorMessage);
        } finally{
            setLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit = {submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <InputLabel shrink>Title</InputLabel>
                            <TextField
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                size="small"
                            />
                        </div>
                        <div>
                            <InputLabel shrink>Description</InputLabel>
                            <TextField
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                size="small"
                            />
                        </div>
                        <div>
                            <InputLabel shrink>Requirements</InputLabel>
                            <TextField
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                size="small"
                            />
                        </div>
                        <div>
                            <InputLabel shrink>Salary</InputLabel>
                            <TextField
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                size="small"
                            />
                        </div>
                        <div>
                            <InputLabel shrink>Location</InputLabel>
                            <TextField
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                size="small"
                            />
                        </div>
                        <div>
                            <InputLabel shrink>Job Type</InputLabel>
                            <TextField
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                size="small"
                            />
                        </div>
                        <div>
                            <InputLabel shrink>Experience Level</InputLabel>
                            <TextField
                                type="text"
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                size="small"
                            />
                        </div>
                        <div>
                            <InputLabel shrink>No of Postion</InputLabel>
                            <TextField
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                size="small"
                            />
                        </div>
                        {companies.length > 0 && (
                          <FormControl size="small" className="w-[180px]">
                            <InputLabel id="company-label">Select a Company</InputLabel>
                            <Select labelId="company-label" value="" label="Select a Company"
                              onChange={(e)=> selectChangeHandler(e.target.value)}>
                              {companies.map((company) => (
                                <MenuItem key={company._id} value={company?.name?.toLowerCase()}>{company.name}</MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        )}
                    </div> 
                    {loading ? (
                      <Button className="w-full my-4" variant="contained"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button>
                    ) : (
                      <Button type="submit" className="w-full my-4" variant="contained">Post New Job</Button>
                    )}
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first, before posting a jobs</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob