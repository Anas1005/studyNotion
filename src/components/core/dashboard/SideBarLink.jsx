import React from 'react';
import * as Icons from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'; // Import the Skeleton component

export const SideBarLink = ({ link, iconName, isLoading }) => {
  const Icon = Icons[iconName];
  const location = useLocation();
  const matchRoute = (route) => {
    return location.pathname === route;
  };

  if (isLoading) {
    // Show a skeleton when isLoading is true
    return (
      <div className="relative px-8 py-2 text-sm font-medium">
        <div className="absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 opacity-0">
          {/* Skeleton for the left bar */}
          <Skeleton height={20} width={2} />
        </div>
        <div className="flex items-center gap-x-2 text-richblack-200">
          {/* Skeleton for the icon */}
          <div className="text-lg">
            <Skeleton width={20} height={20} />
          </div>
          {/* Skeleton for the link name */}
          <div>
            <Skeleton height={20} width={80} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <NavLink
      to={link.path}
      className={`relative px-8 m-[2%]  rounded-[4px] py-2 text-sm font-medium hover:bg-richblack-900  transition-all duration-300 ease-in ${
        matchRoute(link.path) ? 'bg-[#ffc30047]' : 'bg-opacity-0'
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${
          matchRoute(link.path) ? 'opacity-100' : 'opacity-0'
        }`}
      ></span>

      <div
        className={`flex items-center hover:text-white gap-x-2 ${
          matchRoute(link.path) ? ' text-yellow-25' : ' text-richblack-200'
        }`}
      >
        <Icon className="text-lg" />
        <span className=''>{link.name}</span>
      </div>
    </NavLink>
  );
};
