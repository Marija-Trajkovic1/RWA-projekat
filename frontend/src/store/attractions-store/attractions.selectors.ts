import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AttractionsState } from "../store.interfaces";

export const selectAttractionsState = createFeatureSelector<AttractionsState>('attractions');

export const selectAttractions = createSelector(
    selectAttractionsState,
    (state: AttractionsState)=>state.attractions
);

export const selectAttractionsLoading = createSelector(
    selectAttractionsState,
    (state: AttractionsState)=>state.loading
);

export const selectAttractionsError= createSelector(
    selectAttractionsState,
    (state:AttractionsState)=>state.error
)