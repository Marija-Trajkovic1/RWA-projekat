import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SavedAttractionState } from "../store.interfaces";

export const selectSavedAttractionState = createFeatureSelector<SavedAttractionState>('savedattraction');

export const selectSavedAttraction = createSelector(
    selectSavedAttractionState,
    (state: SavedAttractionState)=>state.isSaved
);

export const selectSavedAttractionLoading = createSelector(
    selectSavedAttractionState,
    (state: SavedAttractionState)=>state.loading
);

export const selectSavedAttractionError  = createSelector(
    selectSavedAttractionState,
    (state: SavedAttractionState)=>state.error
);
