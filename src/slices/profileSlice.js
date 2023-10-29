import {createSlice} from "@reduxjs/toolkit"

const profileSlice=createSlice({
    name:'profile',
    initialState:{
        currentUser:localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):null,
        loading:false,
    },
    reducers:{
        setCurrentUser:(state,value)=>{
            console.log("Value is:"+value?.payload?.image)
            state.currentUser=value.payload;
            localStorage.setItem('currentUser',JSON.stringify(value.payload));
        },
        removeCurrentUser:(state)=>{
            state.currentUser=null;
            localStorage.removeItem('currentUser');
        },
        setLoading:(state,action)=>{
            state.loading=action.payload;
        },

    }
})
     

export const{setCurrentUser,removeCurrentUser,setLoading}=profileSlice.actions;
export default profileSlice.reducer;