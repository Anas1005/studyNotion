import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: 'loader',
  initialState: {
    isLoading:false,
    name:""
  }, // Initial state is false (not loading)
  reducers: {
    setLoading: (state, action) => {
         const x=action.payload;
        state.isLoading=x.isLoading;
        state.name=x.name;
    }, // Set loading state to true or false
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
