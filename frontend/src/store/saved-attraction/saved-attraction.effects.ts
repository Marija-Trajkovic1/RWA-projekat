import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { SavedAttractionService } from "../../app/services/saved-attraction/saved-attraction.service";
import { loadSavedAttraction, loadSavedAttractionFailure, loadSavedAttractionSuccess, updateSavedAttractionStatus, updateSavedAttractionStatusFailure, updateSavedAttractionStatusSuccess } from "./saved-attraction.actions";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";

@Injectable()
export class SavedAttractionEffects {
    private actions$ = inject(Actions);
    private savedAttractionService = inject(SavedAttractionService);

    constructor(){}

    loadSavedAttraction$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loadSavedAttraction),
            mergeMap(({ attractionId })=>
                this.savedAttractionService.getSavedAttraction(attractionId).pipe(
                    map((response)=>
                        loadSavedAttractionSuccess({
                            attractionId,
                            isSaved: response.isSaved,
                       })
                    ),
                    catchError((error)=>
                        of(loadSavedAttractionFailure({ error }))
                    )
                )
            )
        )
    );

    updateSavedAttractionStatus$ = createEffect(()=>
        this.actions$.pipe(
            ofType(updateSavedAttractionStatus),
            switchMap(({ attractionId}) =>
                this.savedAttractionService.updateSavedAttractionStatus(attractionId).pipe(
                    map((response)=>
                        updateSavedAttractionStatusSuccess({
                            attractionId,
                            isSaved: response.isSaved,     
                        })
                    ),
                    catchError((error)=>
                    of(updateSavedAttractionStatusFailure({error}))
                    )
                )
            )
        )
    )

}