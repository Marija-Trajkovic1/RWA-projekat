import { createAction, props } from "@ngrx/store";
import { VisitedAttraction } from "../../app/models/visited.model";

export const loadVisitedAttraction = createAction('[Visited Attraction] Load Visited Attraction', props<{attractionId: number}>())
export const loadVisitedAttractionSuccess = createAction('[Visited Attraction] Load Visited Attraction Success', props<{attractionId: number, isVisited: boolean}>())
export const loadVisitedAttractionFailure = createAction('[Visited Attraction] Load Visited Attraction Failure', props<{error: any}>())

export const updateVisitedAttraction = createAction('[Visited Attraction] Update Visited Attraction', props<{attractionId: number, rating: number}>())
export const updateVisitedAttractionSuccess = createAction('[Visited Attraction] Update Visited Attraction Success', props<{attractionId: number, rating: number, visitedAttraction: VisitedAttraction}>())
export const updateVisitedAttractionFailure = createAction('[Visited Attraction] Update Visited Attraction Failure', props<{error: any}>())

export const loadAverageRating = createAction('[Visited Attraction] Load Average Rating', props<{attractionId: number}>())
export const loadAverageRatingSuccess = createAction('[Visited Attraction] Load Average Rating Success', props<{attractionId: number, averageRating: number}>())
export const loadAverageRatingFailure = createAction('[Visited Attraction] Load Average Rating Failure', props<{error: any}>())