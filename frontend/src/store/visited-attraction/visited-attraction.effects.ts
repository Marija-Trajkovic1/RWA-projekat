import { inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VisitedAttractonService } from "../../app/services/visited-attraction/visited-attracton.service";
import { loadAverageRating, loadAverageRatingFailure, loadAverageRatingSuccess, loadVisitedAttraction, loadVisitedAttractionFailure, loadVisitedAttractionSuccess, updateVisitedAttraction, updateVisitedAttractionFailure, updateVisitedAttractionSuccess } from "./visited-attraction.actions";
import { catchError, map, of, switchMap } from "rxjs";

export class VisitedAttractionEffect{
    private actions$ = inject(Actions);
    private visitedAttractionService = inject(VisitedAttractonService)

    constructor(){}

    loadVisitedAttractions$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loadVisitedAttraction),
            switchMap(({attractionId})=>
                this.visitedAttractionService.getIsVisitedAttraction(attractionId).pipe(
                    map((response)=>
                        loadVisitedAttractionSuccess({
                            attractionId,
                            isVisited: response.isVisited,
                        })
                    ),
                    catchError((error)=>
                        of(loadVisitedAttractionFailure({error}))
                    )
                )
            )
        )
    );

    updateVisitedAttraction$ = createEffect(()=>
        this.actions$.pipe(
            ofType(updateVisitedAttraction),
            switchMap(({attractionId, rating})=>
                this.visitedAttractionService.updateVisitedAttractionStatus(attractionId, rating).pipe(
                    map((response) =>
                        updateVisitedAttractionSuccess({
                            attractionId,
                            rating,
                            visitedAttraction: response.visitedAttraction,
                        })
                    ),
                    catchError((error)=>
                        of(updateVisitedAttractionFailure({error}))
                    )
                )   
            )
        )
    )
    
    loadAverageAfterUpdate$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateVisitedAttractionSuccess),
            map(action => loadAverageRating({ attractionId: action.attractionId }))
        )
    );

    loadAverageRatingForAttraction$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loadAverageRating),
            switchMap(({attractionId})=>
                this.visitedAttractionService.getAverageRatingForAttraction(attractionId).pipe(
                    map((response) =>
                        loadAverageRatingSuccess({
                            attractionId,
                            averageRating: response.averageRating,
                        })
                    ),
                    catchError((error)=>
                        of(loadAverageRatingFailure({error}))
                    )
                )
            )
        )
    )


    
}