import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PlacesState } from "../store.interfaces";

export const selectPlacesState = createFeatureSelector<PlacesState>('places');

export const selectAllPlaces = createSelector(
    selectPlacesState,
    (state: PlacesState) => state.ids.map(id=>state.entities[id]).filter((place)=>!!place)
);

export const selectPlacesLoading = createSelector(
    selectPlacesState,
    (state: PlacesState) =>state.loading
)

export const selectPlacesError = createSelector(
    selectPlacesState,
    (state: PlacesState)=> state.error
)

export const selectSelectedPlace = createSelector(
    selectPlacesState,
    (state:PlacesState) => state.selectedPlace
)
