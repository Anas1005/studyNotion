import {combineReducers} from "@reduxjs/toolkit"
import authSlice from "../slices/authSlice"
import profileSlice from "../slices/profileSlice";
import cartSlice from "../slices/cartSlice";
import loadingSlice from "../slices/loadingSlice";
import courseSlice from "../slices/courseSlice";
import categorySlice from "../slices/categorySlice";
import viewCourseSlice from "../slices/viewCourseSlice"

const rootReducer=combineReducers({
    auth:authSlice,
    profile:profileSlice,
    course:courseSlice,
    cart:cartSlice,
    loader:loadingSlice,
    category:categorySlice,
    viewCourse:viewCourseSlice
})

export default rootReducer;