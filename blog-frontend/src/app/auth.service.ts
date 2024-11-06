import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { RegisterDto } from './types/register.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)

  constructor() { }
  login(email:string, password:string){
    return this.http.post<{
      accessToken:string
    }>(
      `${environment.apiUrl}/api/login`,
      {email, password}
    );
  }
  get IsLoggedIn(){
    return !!localStorage.getItem("token");
  }
  register(registerDto: RegisterDto): Observable<any>{
    return this.http.post<any>(
      `${environment.apiUrl}/api/register`,
      registerDto
    )
  }
  logout() {
    localStorage.removeItem('token');
  }
}
