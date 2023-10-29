import React from 'react'
import { Link } from 'react-router-dom'

export const Button = ({children,active,linkTo}) => {
  return (
    <Link to={linkTo}>

        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold ${active? " bg-yellow-25 text-black":" text-white bg-richblack-800"} hover:scale-95 transition-all duration-200`}>
         {children}
        </div>
    </Link>
  )
}
