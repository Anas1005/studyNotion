// import React from "react";

// export const IconBtn = ({
//   text,
//   onClick,
//   children,
// //   disabled,
// //   outline = false,
// //   customClasses,
// //   type,
// }) => {
//   return (
//     <button onClick={onClick} className="text-white">
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


import React from "react";

export const IconBtn = ({ text, onClick, children,customClasses}) => {
  console.log("Custom are:"+customClasses)
  return (
    <button
      onClick={onClick}
      className={`bg-yellow-25 flex items-center gap-2 text-black font-bold px-4 py-2 rounded-lg cursor-pointer ${customClasses!==""? customClasses:""}`}
    >
      {children ? (
        <>
          <span>{text}</span>
          {children}
        </>
      ) : (
        text
      )}
    </button>
  );
};
