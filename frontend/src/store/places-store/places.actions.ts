import { createAction, props } from "@ngrx/store";
import { Place } from "../../models/place.model";

export const loadPlaces = createAction('[Places] LoadPlaces');
export const loadPlacesSuccess = createAction('[Places] LoadPlacesSuccess', props<{places: Place[] }>());
export const loadPlacesFailure = createAction('[Places] LoadPlacesFailure', props<{error: string }>());