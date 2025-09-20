import { useCompany } from '../context/CompanyContext'
import { COMPANY_API_END_POINT} from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'

const useGetAllCompanies = () => {
    const { setCompanies } = useCompany();
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                console.log('called');
                if(res.data.success){
                    // Since users can only have one company now, wrap it in an array for compatibility
                    setCompanies(res.data.company ? [res.data.company] : []);
                }
            } catch (error) {
                console.log(error);
                // If no company found, set empty array
                setCompanies([]);
            }
        }
        fetchCompanies();
    },[setCompanies])
}

export default useGetAllCompanies