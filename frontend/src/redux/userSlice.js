import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null
    },
    reducers:{
        setUserdata:(state, acion)=>{
            state.userData = acion.payload
        } 
    }
})

export const {setUserdata} = userSlice.actions
export default userSlice.reducer