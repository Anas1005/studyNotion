import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { IconBtn } from "../../../common/IconBtn";
import { createOrder } from "../../../../services/operations/studentFeaturesAPI";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const CartSummary = ({ totalSum }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const { currentUser } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.cart);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  // Simulate loading effect for 2 seconds (adjust the time as needed)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup the timer to prevent memory leaks
    return () => clearTimeout(timer);
  }, []);

  const handleBuyAllCourses = async () => {
    const coursesToBuy = cart.map((cartCourse) => cartCourse._id);
    await createOrder(
      coursesToBuy,
      currentUser,
      token,
      navigate,
      dispatch,
      cart
    );
    console.log("Created the Order...");
  };

  return (
    <div className="bg-richblack-800 p-6 rounded-lg flex flex-col gap-3">
      <p className="text-xl font-semibold text-richblack-200">
        {isLoading ? <Skeleton width={120} height={24} /> : "Total:"}
      </p>
      <p className="text-yellow-25 text-2xl font-semibold">
        {isLoading ? <Skeleton width={80} height={32} /> : `Rs ${totalSum}`}
      </p>

      {isLoading ? (
        <Skeleton width={300} height={32} />
      ) : (
        <IconBtn
          text={"Check Out Now"}
          onClickHandler={() => handleBuyAllCourses()}
          customClasses={"w-full justify-center"}
          disabled={isLoading} // Disable the button while loading
        />
      )}
    </div>
  );
};
