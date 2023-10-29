import {createSlice} from "@reduxjs/toolkit"

const initialState= 
localStorage.getItem('courseState')?JSON.parse(localStorage.getItem('courseState')): 
{
    courseStep:1,
    currentCourse:null,
    editCourse:false,
    paymentLoading:false
}

const courseSlice=createSlice({
    name:'course',
    initialState,
   
    reducers:{
        setCourseStep:(state,value)=>{
            state.courseStep=value.payload;
            localStorage.setItem('courseState',JSON.stringify(state));
        },
        setCourse:(state,value)=>{
            console.log("AAgya Course Slice me:"+value.payload)
            state.currentCourse=value.payload;
            localStorage.setItem('courseState',JSON.stringify(state));
        },
        setPaymentLoading:(state,value)=>{
            state.paymentLoading=value.payload;
            localStorage.setItem('courseState',JSON.stringify(state));
        },
        resetCourseState:(state)=>{
            state.courseStep=1;
            state.currentCourse=null;
            state.paymentLoading=false;
            localStorage.setItem('courseState',JSON.stringify(state));
        },
    }
})
     

export const{setCourseStep,setCourse,resetCourseState,setPaymentLoading}=courseSlice.actions;
export default courseSlice.reducer;