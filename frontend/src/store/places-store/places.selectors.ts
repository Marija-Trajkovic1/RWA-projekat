import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlacesState } from "../store.interfaces";

export const selectPlacesState = createFeatureSelector<PlacesState>('places');

export const selectAllPlaces = createSelector(
    selectPlacesState,
    (state: PlacesState) => state.places
);

export const selectPlacesLoading = createSelector(
    selectPlacesState,
    (state: PlacesState) =>state.loading
)

export const selectPlacesError = createSelector(
    selectPlacesState,
    (state: PlacesState)=> state.error
)
