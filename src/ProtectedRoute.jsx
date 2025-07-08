import React from 'react'
import { useNavigate ,Navigate } from 'react-router'
import useAuth from './hooks/useAuth';

const ProtectedRoute = ({children}) => {
    const {token} = useAuth()
    
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
