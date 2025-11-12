import { createAction, props } from "@ngrx/store";

export const loadSavedAttraction = createAction('[Saved Attraction] Load Saved Attraction', props<{attractionId: number}>());
export const loadSavedAttractionSuccess = createAction('[Saved Attraction] Load Saved  Attraction Success', props<{attractionId: number; isSaved: boolean}>());
export const loadSavedAttractionFailure = createAction('[Saved Attraction] Load Saved Attraction Failure', props<{error: any}>());

export const updateSavedAttractionStatus = createAction('[Saved Attraction] Update Status Saved Attraction', props<{attractionId: number}>());
export const updateSavedAttractionStatusSuccess = createAction('[Saved Attraction] Update Status Saved Attraction Success', props<{ attractionId: number, isSaved: boolean}>());
export const updateSavedAttractionStatusFailure = createAction('[Saved Attraction] Update Status Saved Attraction Failure', props<{error: any}>());
