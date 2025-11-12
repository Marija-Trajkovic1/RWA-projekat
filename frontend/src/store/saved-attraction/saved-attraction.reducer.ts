import { createReducer, on } from "@ngrx/store";
import { initialStateSavedAttraction } from "../store.interfaces";
import { loadSavedAttraction, loadSavedAttractionFailure, loadSavedAttractionSuccess, updateSavedAttractionStatus, updateSavedAttractionStatusFailure, updateSavedAttractionStatusSuccess } from "./saved-attraction.actions";

export const savedAttractionsReducer = createReducer(
    initialStateSavedAttraction,

    on(loadSavedAttraction, (state)=>({
        ...state,
        loading: true,
        error: null,
    })),

    on(loadSavedAttractionSuccess, (state, {isSaved})=>({
        ...state,
        isSaved,
        loading: false,
    })),

    on(loadSavedAttractionFailure, (state, {error})=>({
        ...state,
        loading: false,
        error
    })),

    on(updateSavedAttractionStatus, (state)=>({
        ...state,
        loading: true,
        error: null,
    })),

    on(updateSavedAttractionStatusSuccess, (state, {isSaved})=>({
        ...state,
        isSaved,
        loading: false,
    })),

    on(updateSavedAttractionStatusFailure, (state, {error})=>({
        ...state,
        loading: false,
        error,
    }))
);