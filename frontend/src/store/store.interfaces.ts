import { AttractionDetails, AttractionSummary } from "../app/models/attraction.model";
import { Place } from "../app/models/place.model";
import { User } from "../app/models/user.model";
import { VisitedAttraction } from "../app/models/visited.model";
import { EntityState } from "@ngrx/entity"
import { attractionsAdapter, placesAdapter } from "./store.adapters";

export interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

export const initialStateAuth: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null
}

export interface PlacesState extends EntityState<Place>{
    selectedPlace: Place | null;
    loading: boolean;
    error: string | null;
}

export const initialStatePlaces : PlacesState = placesAdapter.getInitialState({
    selectedPlace: null,
    loading: false,
    error: null,
})

export interface AttractionsState extends EntityState<AttractionSummary>{
    loading: boolean;
    error: string | null;
}

export const initialStateAttractionsSummary : AttractionsState = attractionsAdapter.getInitialState({
    loading: false,
    error: null,
})

export interface AttractionDetailsState {
    attraction: AttractionDetails | null;
    loading: boolean;
    error: string | null;
}

export const initialStateAttractionDetails : AttractionDetailsState = {
    attraction: null,
    loading: false,
    error: null,
}

export interface SavedAttractionState {
    isSaved: boolean | null;
    loading: boolean;
    error: string | null;
}

export const initialStateSavedAttraction : SavedAttractionState = {
    isSaved: null,
    loading: false,
    error: null,
}

export interface VisitedAttractionState {
    isVisited: boolean | null;
    visitedAttraction: VisitedAttraction | null;
    averageRating: number |  null;
    loading: boolean;
    error: string | null;
}

export const initialStateVisitedAttraction: VisitedAttractionState = {
    isVisited: null,
    visitedAttraction: null,
    averageRating: null,
    loading: false,
    error: null
}