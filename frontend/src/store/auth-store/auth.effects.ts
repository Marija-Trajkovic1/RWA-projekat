import { Injectable } from "@angular/core";
import {createEffect, Actions, ofType} from '@ngrx/effects'
import { login, loginFailure, loginSuccess } from "./auth.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { AuthService } from "../../app/services/auth/auth.service";
 
@Injectable()
export class AuthEffects {
    constructor(private actions$: Actions, private authService: AuthService) {}
    
    login$ = createEffect(()=>
        this.actions$.pipe(
            ofType(login),
            mergeMap(({loginData})=>
            this.authService.login(loginData).pipe(
                map(response=>loginSuccess({token: response.access_token})),
                catchError(error=>of(loginFailure({error:error.message})))
            ))
        )

    )

   
}