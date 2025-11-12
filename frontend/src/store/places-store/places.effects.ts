import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadPlaces, loadPlacesFailure, loadPlacesSuccess } from "./places.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { PlacesService } from "../../app/services/places/places.service";

@Injectable()
export class PlacesEffects{
    private actions$ = inject(Actions);
    private placesService = inject(PlacesService);

    constructor(){
        console.log('Test from effect places.')
    }

    loadingPlaces$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loadPlaces),
            mergeMap(()=>
                this.placesService.getAvailablePlaces().pipe(
                    map(places=>loadPlacesSuccess({places})),
                    catchError(error=> of(loadPlacesFailure({error: error.message})))
                )
            )
        )
    )
}