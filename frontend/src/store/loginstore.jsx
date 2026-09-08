import {createSlice} from "@reduxjs/toolkit";


const storedUser=JSON.parse(localStorage.getItem("user"));
export const userSlice = createSlice({
    name:"user",
    initialState:{
        userId:storedUser?.userId||null,
        role:storedUser?.role||"",
        name:storedUser?.name || "",
        token:storedUser?.token||""
    },
    reducers:{
       setUser : (state,action) => {
        state.userId=action.payload.userId;
        state.role=action.payload.role;
        state.name=action.payload.name;
        state.token=action.payload.token
        localStorage.setItem("user",JSON.stringify({
            userId:action.payload.userId,
            role:action.payload.role,
            name:action.payload.name,
            token:action.payload.token
        }));
       },
       clearUser :(state) =>{
        state.userId=null;
        state.role="";
        state.name="";
        state.token="";
        localStorage.removeItem("user");
       }
    }
})

export const{setUser,clearUser} = userSlice.actions;
  

export default userSlice.reducer;