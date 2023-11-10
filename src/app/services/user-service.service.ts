import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interface/user';
import { Router } from '@angular/router';

interface loginRequest {
  username: string,
  password: string
}

interface sendOtpRequest {
  email: string,
}

interface messageResponse {
  message: string,
}

interface checkEmailRequest {
  email: string
}

interface checkEmailResponse {
  emailExist: boolean
}

interface registerRequest {
  email: string,
  password: string,
  displayName: string,
  username: string
  dob: string
}

interface generateUsernameRequest {
  name: string,
  dob: string
}

interface generateUsernameResponse {
  generatedUsernames: string[]
}

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  userProfile: BehaviorSubject<User> = new BehaviorSubject<User>({
    userID: 0,
    username: '',
    email: '',
    displayName: '',
    registrationDate: '',
    dob: '',
    profilePic: '',
    role: '',
  });
  private register = 'http://localhost:8080/api/v1/auth/register'
  private login = 'http://localhost:8080/api/v1/auth/login'
  private sendOTP = 'http://localhost:8080/api/v1/auth/user/otp'
  private checkUsername = 'http://localhost:8080/api/v1/auth/user/checkUsername'
  private checkUsernameAndEmailExists = 'http://localhost:8080/api/v1/auth/user/checkAccountExists'
  private generatedUsername = 'http://localhost:8080/api/v1/auth/user/generateUsername'
  private getUserProfile = 'http://localhost:8080/api/v1/auth/user/user-profile'
  private logOutURL = 'http://localhost:8080/api/v1/auth/logout'
  constructor(private http: HttpClient, private router: Router) { }

  registerUser(data: registerRequest): Observable<messageResponse> {
    return this.http.post<messageResponse>(this.register, data);
  }

  loginUser(info: loginRequest): Observable<messageResponse> {
    return this.http.post<messageResponse>(this.login, info, { withCredentials: true })
  }

  sendOTPUser(info: sendOtpRequest): Observable<number> {
    return this.http.post<number>(this.sendOTP, info)
  }

  checkUsernameUser(info: string): Observable<boolean> {
    const url = `${this.checkUsername}?value=${info}`
    return this.http.get<boolean>(url);
  }

  checkUsernameAndEmailUser(info: checkEmailRequest): Observable<checkEmailResponse> {
    return this.http.post<checkEmailResponse>(this.checkUsernameAndEmailExists, info)
  }

  generateUsernameUser(info: generateUsernameRequest): Observable<generateUsernameResponse> {
    return this.http.post<generateUsernameResponse>(this.generatedUsername, info)
  }

  profile(): Observable<User> {
    return this.http.get<User>(this.getUserProfile, {
      withCredentials: true,
    });
  }

  saveUserToLocalStorage(user: User) {
    this.userProfile.next(user);
    localStorage.setItem('user-profile', JSON.stringify(user));
  }

  loadUserFromLocalStorage() {
    if (this.userProfile.value.userID === 0) {
      let fromlocalStorage = localStorage.getItem("user-profile");
      if (fromlocalStorage) {
        let userInfo = JSON.parse(fromlocalStorage);
        this.userProfile.next(userInfo);
      }
    }

    return this.userProfile.value
  }

  logOut() {
    this.http.get<messageResponse>(this.logOutURL, { withCredentials: true }).subscribe({
      next: (response) => {
        // Handle successful logout response
        if (response.message === "Logout successful") {
          localStorage.removeItem('user-profile');
          this.router.navigate(['/login']);
        }

      },
      error: (error) => {
        // Handle error
        console.error('Logout failed', error);
        // Optionally navigate to login or show error message
      }
    });
  }

}
