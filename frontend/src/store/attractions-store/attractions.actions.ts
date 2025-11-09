import { createAction, props } from "@ngrx/store"
import { AttractionSummary } from "../../app/models/attraction.model";

export const loadAttractions = createAction('[Attractions] Load Attractions', props<{placeName: string}>());
export const loadAttractionsSuccess = createAction('[Attractions] Load Attractions Success', props<{attractions: AttractionSummary[]}>());
export const loadAttractionsFailure = createAction('[Attractions] Load Attractions Failure', props<{error: string}>());

