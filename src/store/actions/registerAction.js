import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk('register/register', async ({email,photo,password},{rejectWithValue})=>{
    try {
        let newUser = {email,password,photo}
        const response = await axios.post('http://localhost:8080/api/auth/register', newUser)
        return response.data;
        
    } catch (error) {
    if(error.response){
       
        
            return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue('register failed');
    }

})

export const resetRegister = createAction('register/reset')