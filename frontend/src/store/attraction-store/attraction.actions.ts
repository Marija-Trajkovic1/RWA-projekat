import { createAction, props } from "@ngrx/store";
import { AttractionDetails } from "../../app/models/attraction.model";

export const loadAttractionDetails = createAction('[Attraction] Load Attraction Details', props<{id: number}>());
export const loadAttractionDetailsSuccess = createAction('[Attraction] Load Attraction Details Success', props<{attraction: AttractionDetails}>());
export const loadAttractionDetailsFailure = createAction('[Attraction] Load Attraction Details Failure', props<{error: string}>());

