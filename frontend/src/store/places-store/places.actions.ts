import { createAction, props } from "@ngrx/store";
import { Place } from "../../app/models/place.model";

export const loadPlaces = createAction('[Places] Load Places');
export const loadPlacesSuccess = createAction('[Places] Load Places Success', props<{places: Place[] }>());
export const loadPlacesFailure = createAction('[Places] Load Places Failure', props<{error: string }>());

export const selectPlace = createAction('[Places] Select Place', props<{place: Place}>())