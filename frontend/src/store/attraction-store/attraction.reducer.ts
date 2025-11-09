import { createReducer, on } from "@ngrx/store";
import { initialStateAttractionDetails } from "../store.interfaces";
import { loadAttractionDetails, loadAttractionDetailsFailure, loadAttractionDetailsSuccess } from "./attraction.actions";

export const attractionDetailsReducer = createReducer(
    initialStateAttractionDetails,

    on(loadAttractionDetails, (state)=>({
        ...state,
        loading: true,
        error: null
    })),

    on(loadAttractionDetailsSuccess, (state, {attraction})=>({
        ...state,
        attraction,
        loading:false,
        error: null
    })),

    on(loadAttractionDetailsFailure, (state, {error})=>({
        ...state,
        attraction: null,
        loading: false,
        error
    }))
)