import {createSlice} from "@reduxjs/toolkit"
import { getAllCategories } from "../services/operations/courseAPI";

const categorySlice=createSlice({
    name:'category',
    initialState:{
        categories:[]
    },
    reducers:{
        getCategories:async(state,value)=>{
            console.log("In Disptacging Category")

            const {token}=value.payload;
            const {dispatch}=value.payload;
            console.log(token);
            try{
            const {allCategories}=await getAllCategories(token,dispatch)
            console.log("All Categries Fetched:");
            console.log(allCategories)
            state.categories=allCategories;
            }
            catch(e){
                console.log(e);
            }
        },

    }
})


    
export const{getCategories}=categorySlice.actions;
export default categorySlice.reducer;