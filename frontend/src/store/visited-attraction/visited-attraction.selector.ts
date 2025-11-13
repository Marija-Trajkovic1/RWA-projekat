import { createFeatureSelector, createSelector } from "@ngrx/store"
import { VisitedAttractionState } from "../store.interfaces"

export const selectVisitedAttractionState = createFeatureSelector<VisitedAttractionState>('visitedattraction');

export const selectIsVisited = createSelector(
    selectVisitedAttractionState,
    (state: VisitedAttractionState) => state.isVisited   
)

export const selectVisitedAttraction = createSelector(
    selectVisitedAttractionState,
    (state: VisitedAttractionState)=> state.visitedAttraction
)

export const selectVisitedAttractionLoading = createSelector(
    selectVisitedAttractionState,
    (state: VisitedAttractionState) => state.loading
)

export const selectVisitedAttractionError = createSelector(
    selectVisitedAttractionState,
    (state: VisitedAttractionState) => state.error
)

export const selectAverageRating = createSelector(
    selectVisitedAttractionState,
    (state: VisitedAttractionState) => state.averageRating
)