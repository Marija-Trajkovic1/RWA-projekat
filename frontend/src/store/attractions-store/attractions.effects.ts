import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AttractionsService } from "../../app/services/attractions/attractions.service";
import { loadAttractions, loadAttractionsFailure, loadAttractionsSuccess } from "./attractions.actions";
import { catchError, map, mergeMap, of } from "rxjs";

export class AttarctionsEffects{
    private actions$ = inject(Actions);
    private attractionsService = inject(AttractionsService);

    constructor(){}

    loadingAttractions$ = createEffect(()=>
    this.actions$.pipe(
        ofType(loadAttractions),
        mergeMap(({placeName})=>
        this.attractionsService.getAttractionsForPlace(placeName).pipe(
            map(attractions=>loadAttractionsSuccess({attractions})),
            catchError(error=>of(loadAttractionsFailure({error})))
        ))
    ))
}