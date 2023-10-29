import React from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { SideBar } from "../components/core/dashboard/SideBar";
import { Outlet } from "react-router-dom";
// import {MyProfile} from "../components/core/dashboard/MyProfile";

export const DashBoard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: profileLoading } = useSelector((state) => state.profile);

  if (profileLoading || authLoading) {
    return <div className="mt-12">Loading.......</div>;
  }

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] w-[100vw]">
      <SideBar/>
      <div className="h-[calc(100vh-3.5rem)] overflow-auto w-[100%]">
        <Outlet />
        {/* <MyProfile/> */}
        {/* Settings */}
      </div>
    </div>
  );
};
 