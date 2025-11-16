import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { Place } from "../app/models/place.model";
import { AttractionSummary } from "../app/models/attraction.model";

export const placesAdapter: EntityAdapter<Place> = createEntityAdapter<Place>();
export const attractionsAdapter: EntityAdapter<AttractionSummary> = createEntityAdapter<AttractionSummary>();