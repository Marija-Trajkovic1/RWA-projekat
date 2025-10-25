import {createAction, props} from '@ngrx/store'
import { LoginDto } from '../../app/dtos/login.dto';

export const login = createAction('[Auth] Login', props<{loginData:LoginDto}>());
export const loginSuccess = createAction('[Auth] LoginSuccess', props<{token: string}>());
export const loginFailure = createAction('[Auth] Login Failure', props<{error: string}>());

export const logout = createAction('[Auth] Logout');
