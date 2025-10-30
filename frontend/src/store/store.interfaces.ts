import { Place } from "../models/place.model";
import { User } from "../models/user.model";

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
    loading: boolean;
    error: string | null;
}

export const initialStatePlaces : PlacesState = {
    places: [],
    loading: false,
    error: null,
}