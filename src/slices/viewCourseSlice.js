import { createSlice } from "@reduxjs/toolkit";

const initialState={
    courseSectionData:[],
    // entireCourseData:[],
    completedLectures:[],
    totalNoOfLectures:0
}

const viewCourseSlice=createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSectionData:(state,action)=>{
            state.courseSectionData=action.payload;
        },
        setEntireCourseData:(state,action)=>{
            state.entireCourseData=action.payload;
        },
        setCompletedLectures:(state,action)=>{
            state.completedLectures=action.payload;
        },
        setTotalNoOfLectures:(state,action)=>{
            state.totalNoOfLectures=action.payload;
        },
        updateCompletedLectures:(state,action)=>{
            state.completedLectures=[...state.completedLectures,action.payload]
        }

    }
})

export const{setCourseSectionData,setEntireCourseData,setCompletedLectures,setTotalNoOfLectures,updateCompletedLectures}=viewCourseSlice.actions;

export default viewCourseSlice.reducer;