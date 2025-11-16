import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginDto } from '../../dtos/login.dto';
import { RegisterDto } from '../../dtos/register.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient){} 
  
  register(registerData:RegisterDto): Observable<any> {
    return this.http.post(`${environment.authApiUrl}/register`, registerData)
  }

  login(loginData:LoginDto): Observable<{access_token: string}> {
    return this.http.post<{access_token:string}>(`${environment.authApiUrl}/login`, loginData);
  }

}
