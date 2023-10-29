import {createSlice} from "@reduxjs/toolkit"

const authSlice=createSlice({
    name:'auth',
    // loading:false,
    initialState:{
        token:localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null,
    },
    reducers:{
        setToken:(state,value)=>{
            state.token=value.payload;
            localStorage.setItem('token',JSON.stringify(value.payload));
        },
        // setLoading:(state,action)=>{
        //     state.loading=action.payload;
        // },
        removeToken:(state)=>{
            state.token=null;
            localStorage.removeItem('token');

        }
    }
})
     

export const{setToken,removeToken}=authSlice.actions;
export default authSlice.reducer;