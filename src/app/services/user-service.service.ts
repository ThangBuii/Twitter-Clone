import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface loginRequest{
  username: string,
  password: string
}

interface sendOtpRequest{
  email: string,
}

interface messageResponse{
  message: string,
}

interface checkEmailRequest{
  email: string
}

interface checkEmailResponse{
  emailExist: boolean
}

interface registerRequest{
  email: string,
  password: string,
  displayName: string,
  username: string
  dob : string
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private register = 'http://localhost:8080/api/v1/auth/register'
  private login = 'http://localhost:8080/api/v1/auth/login'
  private sendOTP = 'http://localhost:8080/api/v1/auth/user/otp'
  private checkUsername = 'http://localhost:8080/api/v1/auth/user/checkUsername'
  private checkUsernameAndEmailExists = 'http://localhost:8080/api/v1/auth/user/checkAccountExists'
  constructor( private http:HttpClient) {}

  registerUser(data: registerRequest): Observable<messageResponse>{
    return this.http.post<messageResponse>(this.register,data);
  }

  loginUser(info:loginRequest): Observable<messageResponse>{
    return this.http.post<messageResponse>(this.login,info)
  }

  sendOTPUser(info: sendOtpRequest) : Observable<number>{
    return this.http.post<number>(this.sendOTP,info)
  }

  checkUsernameUser(info:string): Observable<boolean>{
    const url = `${this.checkUsername}?value=${info}`
    return this.http.get<boolean>(url);
  }

  checkUsernameAndEmailUser(info:checkEmailRequest) : Observable<checkEmailResponse>{
    return this.http.post<checkEmailResponse>(this.checkUsernameAndEmailExists,info)
  }

}
