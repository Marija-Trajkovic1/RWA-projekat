import { AttractionDetails, AttractionSummary } from "../app/models/attraction.model";
import { Place } from "../app/models/place.model";
import { User } from "../app/models/user.model";

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

export interface PlacesState {
    places: Place[];
    selectedPlace: Place | null;
    loading: boolean;
    error: string | null;
}

export const initialStatePlaces : PlacesState = {
    places: [],
    selectedPlace: null,
    loading: false,
    error: null,
}

export interface AttractionsState {
    attractions: AttractionDetails[];
    loading: boolean;
    error: string | null;
}

export const initialStateAttractionsSummary : AttractionsState = {
    attractions: [],
    loading: false,
    error: null,
}

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