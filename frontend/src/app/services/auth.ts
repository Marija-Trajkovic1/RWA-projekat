import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  constructor(private http:HttpClient){} 
  
  register(userData:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/register`, userData)
  }

  login(data:any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }
}
