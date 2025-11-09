import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadAttractionDetails, loadAttractionDetailsFailure, loadAttractionDetailsSuccess } from "./attraction.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { AttractionDetailsService } from "../../app/services/attraction-details/attraction-details.service";

export class AttarctionDetailsEffects{
    private actions$ = inject(Actions);
    private attractionDetailsService = inject(AttractionDetailsService);

    constructor(){}

    loadingAttractions$ = createEffect(()=>
    this.actions$.pipe(
        ofType(loadAttractionDetails),
        mergeMap(({id})=>
        this.attractionDetailsService.getDetailsForAttraction(id).pipe(
            map(attraction=>loadAttractionDetailsSuccess({attraction})),
            catchError(error=>of(loadAttractionDetailsFailure({error})))
        ))
    ))
}