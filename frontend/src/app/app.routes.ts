import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { WhereToGo } from './pages/wheretogo/wheretogo';
import { PlaceMap } from './pages/place-map/place-map';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component:Home},
    {path: 'login', component:Login},
    {path: 'register', component:Register},
    {path: 'wheretogo', component: WhereToGo},
    {path: 'placemap', component: PlaceMap},

    
    {path: '**', redirectTo:''},
];
