
import React from 'react'

export const IconBtn = ({ ...btnData }) => {

  const { children, text, onClickHandler, disabled, outline = false, customClasses, type } = btnData;

  return (
    <div className='text-white' >
      <button
        onClick={onClickHandler}
        disabled={disabled}
        type={type}
        className={` ${customClasses} rounded-md py-2 px-5 font-semibold text-richblack-900 
        ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${outline ? 'border border-yellow-50 bg-transparent' : 'bg-yellow-50'}
        `}
      >
        {
          children ?
            (
              <div className={`flex items-center gap-x-2 
              ${outline && 'text-yellow-50'}
              `} >
                {text}
                {children}
              </div>
            )
            :
            (<div>{text}</div>)
        }
      </button>
    </div>
  )
}





// import React from "react";

// export const IconBtn = ({ text, onClick, children,customClasses}) => {
//   console.log("Custom are:"+customClasses)
//   return (
//     <button
//       onClick={onClick}
//       className={`bg-yellow-25 flex items-center gap-2 text-black font-bold px-4 py-2 rounded-lg cursor-pointer ${customClasses!==""? customClasses:""}`}
//     >
//       {children ? (
//         <>
//           <span>{text}</span>
//           {children}
//         </>
//       ) : (
//         text
//       )}
//     </button>
//   );
// };
