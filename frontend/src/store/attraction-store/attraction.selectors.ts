import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AttractionDetailsState } from "../store.interfaces";

export const selectAttractionDetailsState = createFeatureSelector<AttractionDetailsState>('attraction');

export const selectAttractionDetails = createSelector(
    selectAttractionDetailsState,
    (state: AttractionDetailsState)=>state.attraction
);

export const selectAttractionDetailsLoading = createSelector(
    selectAttractionDetailsState,
    (state: AttractionDetailsState)=>state.loading
);

export const selectAttractionDetailsError= createSelector(
    selectAttractionDetailsState,
    (state:AttractionDetailsState)=>state.error
)