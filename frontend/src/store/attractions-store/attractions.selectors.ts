import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AttractionsState } from "../store.interfaces";

export const selectAttractionsState = createFeatureSelector<AttractionsState>('attractions');

export const selectAttractions = createSelector(
    selectAttractionsState,
    (state: AttractionsState)=>state.ids.map(id=>state.entities[id]).filter((attraction)=>!!attraction)
);

export const selectAttractionsLoading = createSelector(
    selectAttractionsState,
    (state: AttractionsState)=>state.loading
);

export const selectAttractionsError= createSelector(
    selectAttractionsState,
    (state:AttractionsState)=>state.error
)