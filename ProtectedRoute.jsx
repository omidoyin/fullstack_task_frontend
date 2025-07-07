import React from 'react'
import { useNavigate ,Navigate } from 'react-router'

const ProtectedRoute = ({children}) => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    console.log(token);
    
    if(!token){
         return <Navigate to="/" replace />;
    }
  return (
    <div>
        {children}
        
      
    </div>
  )
}

export default ProtectedRoute
