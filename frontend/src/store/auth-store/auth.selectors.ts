import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../store.interfaces";

export const selectAuthState= createFeatureSelector<AuthState>('auth');

export const selectAuthToken=createSelector(selectAuthState, (state)=>state.token);
export const selectAuthLoading = createSelector(selectAuthState, (state)=> state.loading);
export const selectAuthError = createSelector(selectAuthState, (state)=>state.error);