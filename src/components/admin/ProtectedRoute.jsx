'use client'
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigation } from "../../hooks/useNavigation";

const ProtectedRoute = ({children}) => {
    const {user} = useAuth();

    const { navigate } = useNavigation();

    useEffect(()=>{
        if(user === null || user.role !== 'recruiter'){
            navigate("/");
        }
    },[]);

    return (
        <>
        {children}
        </>
    )
};
export default ProtectedRoute;