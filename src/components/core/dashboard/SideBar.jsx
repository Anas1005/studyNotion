import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { sidebarLinks } from "../../../data/dashboard-links";
import { SideBarLink } from "./SideBarLink";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../../slices/authSlice";
import { removeCurrentUser } from "../../../slices/profileSlice";
import { ConfirmationModal } from "../../common/ConfirmationModal";
import { useDispatch } from "react-redux";

export const SideBar = () => {
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { currentUser, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 2 seconds (adjust the time as needed)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup the timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  if (profileLoading || authLoading) {
    return <div className="mt-12">Loading.......</div>;
  }

  return (
    <div>
      <div className="flex min-w-[222px] flex-col border-r-richblack-700 h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && currentUser?.accountType !== link.type)
              return null;

            return (
              <SideBarLink
                key={link.id}
                link={link}
                iconName={link.icon}
                isLoading={isLoading}
              />
            );
          })}
        </div>

        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

        <div className="flex flex-col">
          <SideBarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName={"VscSettingsGear"}
            isLoading={isLoading}
          />
          {
          isLoading?(
          <div className=" px-8 py-2 text-sm font-medium">
            <Skeleton height={20} width={80} />
          </div>
          ):(
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you Sure?",
                text2: "You will be logged out of your Account",
                btn1Text: "Log Out",
                btn2Text: "Cancel",
                btn1Handler: () => {
                  dispatch(removeToken());
                  dispatch(removeCurrentUser());
                  navigate("/login");
                }, // Handle the log out action here
                btn2Handler: () => setConfirmationModal(null), // Close the modal on cancel
              })
            }
            className="text-sm font-medium relative px-8 py-2 text-richblack-200"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Log Out</span>
            </div>
          </button>

          )
          }
        </div>
      </div>

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} isOpen={true} />
      )}
    </div>
  );
};
