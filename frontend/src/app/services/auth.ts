import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
  constructor(private http:HttpClient){} 
  
  register(data:any):Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/register`, data)
  }

  login(data:any): Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/login`, data);
  }
}
