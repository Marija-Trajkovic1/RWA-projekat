import { createReducer, on } from "@ngrx/store";
import { initialStateAuth } from "../store.interfaces";
import { login, loginFailure, loginSuccess, logout } from "./auth.actions";

export const authReducer=createReducer(
    initialStateAuth,

    on(login, (state)=>({
        ...state,
        loading:true, 
        error: null
    })),

    on(loginSuccess, (state, { token }) => ({
        ...state,
        token,
        loading: false, 
        error: null
    })),

    on(loginFailure, (state, {error})=>({
        ...state,
        loading:false,
        error
    })),

   on(logout, (state)=>({
    ...state,
    user:null,
    token: null
   })) 
)