import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function ProtectedRoutes({children}){
    
    const navigate = useNavigate()
    const user = localStorage.getItem("access")
    
    useEffect(()=>{
        if(!user){
            alert("You must be logged to access this page")
            navigate("/")
        }
    },[user])
    
    if (!user) return null;
    return children

}export default ProtectedRoutes