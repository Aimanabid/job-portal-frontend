import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useJob } from '../context/JobContext'


const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad"]

    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
    }
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const { setSearchedQuery } = useJob();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        setSearchedQuery(selectedValue);
    },[selectedValue, setSearchedQuery]);
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard