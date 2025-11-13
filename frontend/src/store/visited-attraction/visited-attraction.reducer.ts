import { createReducer, on } from "@ngrx/store";
import { initialStateVisitedAttraction } from "../store.interfaces";
import { loadAverageRating, loadAverageRatingFailure, loadAverageRatingSuccess, loadVisitedAttraction, loadVisitedAttractionFailure, loadVisitedAttractionSuccess, updateVisitedAttraction, updateVisitedAttractionFailure, updateVisitedAttractionSuccess } from "./visited-attraction.actions";

export const visitedAttractionReducer = createReducer(
    initialStateVisitedAttraction,

    on(loadVisitedAttraction, (state)=>({
        ...state,
        loading:true,
        error:null
    })),

    on(loadVisitedAttractionSuccess, (state, {isVisited})=>({
        ...state,
        loading:false,
        isVisited,
        error: null,
    })),

    on(loadVisitedAttractionFailure, (state, {error})=>({
        ...state,
        loading:false,
        error
    })),

    on(updateVisitedAttraction, (state)=>({
        ...state,
        loading:true,
        error: null
    })),

    on(updateVisitedAttractionSuccess, (state, {visitedAttraction})=>({
        ...state,
        visitedAttraction, 
        loading: false,
        error: null
    })),

    on(updateVisitedAttractionFailure, (state, {error})=>({
        ...state,
        loading: false,
        error,
    })),

    on(loadAverageRating, (state)=>({
        ...state,
        loading: true,
        error: null
    })),

    on(loadAverageRatingSuccess, (state, {averageRating})=>({
        ...state,
        averageRating: averageRating,
        loading: false,
        error: null
    })),

    on(loadAverageRatingFailure, (state, {error})=>({
        ...state,
        loading: false,
        error
    }))
)