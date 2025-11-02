import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectAuthToken } from "../../store/auth-store/auth.selectors";
import { exhaustMap, take } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const store = inject(Store);

    return store.select(selectAuthToken).pipe(
        take(1),
        exhaustMap(token=>{

            if(req.url.includes('opencagedata.com')){
                return next(req);
            }
            if(token){
                const cloned = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return next(cloned);
            }
            return next(req);
        })
    )
}