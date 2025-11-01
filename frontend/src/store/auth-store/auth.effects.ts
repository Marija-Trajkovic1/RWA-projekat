import { inject, Injectable } from "@angular/core";
import {createEffect, Actions, ofType} from '@ngrx/effects'
import { login, loginFailure, loginSuccess, logout } from "./auth.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "../../app/services/auth/auth.service";
import { Router } from "@angular/router";
import { SnackBar } from "../../components/notification/snack-bar";
 
@Injectable()
export class AuthEffects {
    private authService = inject(AuthService);
    private actions$ = inject(Actions);
    private router = inject(Router);
    private snackBar=inject(SnackBar);

    constructor() {
        console.log('AuthEffects init:', { actions: this.actions$, authService: this.authService });
    }
    
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

    loginSuccessRedirect$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginSuccess),
            tap(()=>{
                this.snackBar.showSnackBar("Successefully logged in!", 4000, "success");
                this.router.navigate(['wheretogo'])
            })
        ),
        { dispatch: false}
    )

    logout$ = createEffect(()=>
        this.actions$.pipe(
            ofType(logout),
            tap(()=>{
                this.snackBar.showSnackBar('Successfully logged out!' , 4000, 'info');
                this.router.navigate(['/home']);
            })
        ),
        {dispatch: false}
    )
}