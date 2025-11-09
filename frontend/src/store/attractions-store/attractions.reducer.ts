import { createReducer, on } from "@ngrx/store";
import { initialStateAttractionsSummary } from "../store.interfaces";
import { loadAttractions, loadAttractionsFailure, loadAttractionsSuccess } from "./attractions.actions";

export const attractionsReducer = createReducer(
    initialStateAttractionsSummary,

    on(loadAttractions, (state)=>({
        ...state,
        loading: true,
        error: null
    })),

    on(loadAttractionsSuccess, (state, {attractions})=>({
        ...state,
        attractions,
        loading:false,
        error: null
    })),

    on(loadAttractionsFailure, (state, {error})=>({
        ...state,
        attractions: [],
        loading: false,
        error
    }))
)