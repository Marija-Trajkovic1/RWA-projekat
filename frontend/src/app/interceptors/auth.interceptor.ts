import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject, NgZone } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectAuthToken } from "../../store/auth-store/auth.selectors";
import { catchError, EMPTY, exhaustMap, filter, of, take, throwError } from "rxjs";
import { Router } from "@angular/router";
import { SnackBar } from "../components/notification/snack-bar";
import { DURATION, STYLE_ERROR } from "../constants/snack-bar.constants";
import { logout } from "../../store/auth-store/auth.actions";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const store = inject(Store);
    const router = inject(Router);
    const snackBar = inject(SnackBar);
    const zone = inject(NgZone);

   if( req.url.includes('/login') ||
        req.url.includes('/register') ||
        req.url.includes('/auth') ||
        req.url.includes('opencagedata.com')){
        return next(req);
        }

    return store.select(selectAuthToken).pipe(
        take(1),
        exhaustMap(token=> { 
            if(token && !isTokenExpired(token)){
                const cloned = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });

                return next(cloned).pipe(
                    catchError((error: HttpErrorResponse)=>{
                        if(error.status === 401){
                            snackBar.showSnackBar('Your session has expired. Please login again!', DURATION, STYLE_ERROR);
                            store.dispatch(logout());
                            zone.run(()=>router.navigate(['/login']));
                        }
                        return throwError(()=> error);
                    })
                );
            }

            snackBar.showSnackBar('Your session has expired. Please login again!', DURATION, STYLE_ERROR);
            zone.run(()=>router.navigate(['/login']));
            return EMPTY;
        })
    )
}

function isTokenExpired(token: string):boolean{
    try{
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expiry = payload.exp * 1000;
        console.log('Token exp:', new Date(expiry).toLocaleString(), 'Now:', new Date().toLocaleString());
        return Date.now()>=expiry;
    } catch (err){
        console.error('Token decode error:', err);
        return false;
    }
}