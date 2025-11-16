import { createReducer, on } from "@ngrx/store";
import { initialStateAttractionsSummary } from "../store.interfaces";
import { loadAttractions, loadAttractionsFailure, loadAttractionsSuccess } from "./attractions.actions";
import { attractionsAdapter } from "../store.adapters";

export const attractionsReducer = createReducer(
    initialStateAttractionsSummary,

    on(loadAttractions, (state)=>({
        ...state,
        loading: true,
        error: null
    })),

    on(loadAttractionsSuccess, (state, {attractions})=>(
        attractionsAdapter.setAll(attractions, 
        {
            ...state,
            loading:false,
            error: null
        })
    )),

    on(loadAttractionsFailure, (state, {error})=>({
        ...state,
        attractions: [],
        loading: false,
        error
    }))
)