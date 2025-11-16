import { createReducer, on } from "@ngrx/store";
import { initialStatePlaces } from "../store.interfaces";
import { loadPlaces, loadPlacesFailure, loadPlacesSuccess, selectPlace } from "./places.actions";
import { placesAdapter } from "../store.adapters";

export const placesReducer = createReducer(
    initialStatePlaces,

    on(loadPlaces, (state)=>({
        ...state,
        loading: true,
        error: null,
    })),

    on(loadPlacesSuccess, (state, {places})=>(
        placesAdapter.setAll(places, {
            ...state,
            loading: false,
            error: null
        })
    )),

    on(loadPlacesFailure, (state, {error})=>({
        ...state,
        places: [],
        loading: false,
        error,
    })),

    on(selectPlace, (state, {place}) =>({
        ...state, 
        selectedPlace: place
    }))
    
)