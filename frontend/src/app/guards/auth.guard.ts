import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectAuthToken } from "../../store/auth-store/auth.selectors";
import { map, take } from "rxjs";
import { SnackBar } from "../../components/notification/snack-bar";

export const authGuard: CanActivateFn = () => {
    const store = inject(Store);
    const router = inject(Router);
    const snackBar = inject(SnackBar);

    return store.select(selectAuthToken).pipe(
        take(1),
        map(token=>{
            if(token){
                return true;
            } else {
                snackBar.showSnackBar('You have to be logged in to see this page', 4000, 'error');
                router.navigate(['/home'])
                return false;
            }
        })
    )
}