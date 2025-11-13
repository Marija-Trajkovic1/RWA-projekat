import { ActionReducer, MetaReducer } from "@ngrx/store";
import { logout } from "../auth-store/auth.actions";

export function clearStateMetaReduser(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action){
        if(action.type === logout.type) {
            state = undefined;
        }

        return reducer(state, action);
    };
}

export const metaReducers : MetaReducer<any>[] = [clearStateMetaReduser];