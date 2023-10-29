import React from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

export const ProtectorRoute = ({children}) => {
    const {token}=useSelector((state)=>state.auth);

    if(token){
     
        return children
    }
    else{
      toast.error("xxxxx");
  return <Navigate to="/login"/>
    }
}

