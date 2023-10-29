import React from 'react';
import { CartCourses } from './CartCourses';
import { CartSummary } from './CartSummary';
import { useSelector } from 'react-redux';

export const Cart = () => {
  const { cart, totalSum } = useSelector((state) => state.cart);

  return (
    <div className="container py-8 mx-auto">
      <h1 className="text-2xl font-semibold text-white mx-2">My Wishlist</h1>
      <p className="text-richblack-500 font-bold mx-2">{cart?.length} Courses in Cart</p>

      {totalSum > 0 ? (
        <div className="flex flex-wrap mt-4 mx-4">
          <div className="w-full lg:w-8/12 pr-4">
            <CartCourses cart={cart} />
          </div>
          <div className="w-full lg:w-4/12">
            <CartSummary totalSum={totalSum} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-60">
          <p className="text-richblack-500 text-2xl">Your Cart is Empty</p>
        </div>
      )}
    </div>
  );
};
