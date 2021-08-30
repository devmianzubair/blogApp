import {createSlice} from "@reduxjs/toolkit"

const userSlice=createSlice({
    name:"userslice",
    initialState:{
        imageUrl:"",
        name:"",
        email:"",
        phone:"",
    },
    reducers:{
        userDetails:(state, action)=>{
            state.imageUrl = action.payload.imageUrl;
            state.name =action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        }
    },
})

export const {userDetails}=userSlice.actions;

export default userSlice.reducer;
