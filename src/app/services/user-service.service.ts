import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface loginRequest{
  username: string,
  password: string
}

interface sendOtpRequest{
  username: string,
  email: string,
}

interface messageResponse{
  message: string,
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private register = 'http://localhost:8080/api/v1/auth/register'
  private login = 'http://localhost:8080/api/v1/auth/login'
  private sendOTP = 'http://localhost:8080/api/v1/auth/user/otp'
  private checkUsername = 'http://localhost:8080/api/v1/auth/user/checkUsername'
  constructor( private http:HttpClient) {}

  registerUser(): Observable<messageResponse>{
    return this.http.get<messageResponse>(this.register);
  }

  loginUser(info:loginRequest): Observable<messageResponse>{
    return this.http.post<messageResponse>(this.login,info)
  }

  sendOTPUser(info: sendOtpRequest) : Observable<string>{
    return this.http.post<string>(this.sendOTP,info)
  }

  checkUsernameUser(info:string): Observable<boolean>{
    const url = `${this.checkUsername}?value=${info}`
    return this.http.get<boolean>(url);
  }
}
